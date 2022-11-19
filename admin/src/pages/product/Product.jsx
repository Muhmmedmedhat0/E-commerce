import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { updateProduct, fetchProduct } from "../../app/slices/products";
import { Publish } from "@material-ui/icons";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Watch } from "@material-ui/icons";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase.js";
import "./product.css";

export default function Product() {
  const dispatch = useDispatch();
  const location = useLocation();
  const _id = location.pathname.split("/")[2];
  useEffect(() => {
    dispatch(fetchProduct(_id));
  }, [_id, dispatch]);

  const { prodInfo } = useSelector((state) => state.products);
  const singlleProduct = [];
  singlleProduct.push(prodInfo.product);

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSize] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  function handleInputs(e) {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  function handleCategorie(e) {
    setCategorie(e.target.value.split(","));
  }
  function handleColors(e) {
    setColors(e.target.value.split(","));
  }
  function handleSize(e) {
    setSize(e.target.value.split(","));
  }
  function hanleSubmit(event) {
    event.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        setError(true)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const data = {
            ...inputs,
            img: downloadURL,
            categories: categorie,
            color: colors,
            size: sizes,
            id: _id,
          };
          // dispach action
          dispatch(updateProduct(data));
          setLoading(false);
        });
      },
    );
  }

  return (
    <div className="container-fluid">
      <Sidebar />
        {singlleProduct && singlleProduct.map((product, i)=>(
          <div className="product" key={i}>
          <div className="product-item-container">
          <h1 className="product-title">{product?.title}</h1>
          <Link to="/newproduct">
            <button className="product-add-button">Create</button>
          </Link>
        </div>
        <div className="product-top">
          <div className="product-top-left">
            <Chart data={productData} dataKey="Sales" title="Sales Performance" />
          </div>
          <div className="product-top-right">
            <div className="product-info-top">
              <img src={product?.img} alt={product?.title} className="product-info-img" />
              <span className="product-name">{product?.title}</span>
            </div>
            <div className="product-info-bottom">
              <div className="product-info-item">
                <span className="product-info-key">id:</span>
                <span className="product-info-value">&nbsp;{product?._id}</span>
              </div>
              <div className="product-info-item">
                <span className="product-info-key">sales:</span>
                <span className="product-info-value">5123</span>
              </div>
              <div className="product-info-item">
                <span className="product-info-key">in stock:</span>
                <span className="product-info-value">
                  {product?.inStock}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-bottom">
          <form className="product-form" onSubmit={hanleSubmit}>
            <div className="product-form-left">
              <label>Product Name</label>
              <input name="title" type="text" placeholder={product?.title} onChange={handleInputs} />
              <label>Product Description</label>
              <input name="description" type="text" placeholder={product?.description} onChange={handleInputs} />
              <label>Categories</label>
              <input name="categories" type="text" placeholder="women, coat, jeans" onChange={handleCategorie} />
              <label>Size</label>
              <input name="size" type="text" placeholder="m, l, xl, xxl" onChange={handleSize} />
              <label>Color</label>
              <input name="color" type="text" placeholder="white, black, gray" onChange={handleColors} />
              <label>Price</label>
              <input name="price" type="text" placeholder={product?.price} onChange={handleInputs} />
              <label>In Stock</label>
              <select name="inStock" id="idStock" onChange={handleInputs}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="product-form-right">
              <div className="product-upload">
                <img src={product?.img} alt={product?.title} className="product-upload-img" />
                <label htmlFor="file"> <Publish /> </label>
                <input required={true} name="img" type="file" id="file" style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])} />
              </div>
              {error ? 'Something went Wrong' : null}
              <button disabled={loading === 'true'} type="submit" className="product-button">  {loading ? <Watch /> : 'Update'} </button>
            </div>
          </form>
        </div>
          </div>
        ))}
      </div>
  );
}

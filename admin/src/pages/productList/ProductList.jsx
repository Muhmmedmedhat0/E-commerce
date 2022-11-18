import "./productList.css";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts, deleteProduct } from "../../app/slices/products";

export default function ProductList() {
  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="my-tabl">
      <Sidebar />
      <div className="product-list">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Img</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            { loading ? 'Loading......' : products &&
              products.map((product, i) => (
                <tr key={product._id}>
                  <th scope="row">{i}</th>
                  <td>{product._id}</td>
                  <td>
                    <div className="product-list-item">
                      <img
                        className="product-list-img"
                        src={product.img}
                        alt={product.title}
                        loading="lazy"
                        width={32}
                        height={32}
                      />
                    </div>
                  </td>
                  <td>{product.title}</td>
                  <td>
                    <>
                      <Link to={`/product/${product._id}`}>
                        <button className="product-list-edit">Edit</button>
                      </Link>
                      <DeleteOutline
                        className="product-list-delete"
                        onClick={() => handleDelete(product._id)}
                      />
                    </>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* <DataGrid
          rows={products && products}
          getRowId={(row) => row._id}
          disableSelectionOnClick
          columns={columns}
          checkboxSelection
          loading={loading}
        /> */}
    </div>
  );
}

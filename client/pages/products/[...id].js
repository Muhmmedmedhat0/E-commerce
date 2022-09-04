import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Annoucement from '../../components/Home/Annoucement';
import Footer from '../../components/Home/Footer';
import Navbar from '../../components/Home/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import NewsLetter from '../../components/Home/NewsLetter';
import style from '../../styles/Products/Product.module.css';
import { fetchProduct } from '../../app/slices/products';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../app/slices/cart';

function Product() {
  // get the pathname from the router
  const router = useRouter();
  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const id = router.asPath.split('/')[3];
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const handleCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...products, quantity, color, size }));
  };
  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id]);
  return (
    <section>
      <Annoucement />
      <Navbar />
      {loading ? ('Loading ....') : (
        <div className={style.wrapper}>
          <div className={style.imgContainer}>
            <img className={style.Image} src={products?.img} alt={products?.title}/>
          </div>
          <div className={style.infoContainer}>
            <h1 className={style.infoTitle}>{products?.title}</h1>
            <div className={style.infoDescription}>{products?.description}</div>
            <span className={style.infoPrice}>{products?.price} $</span>
            <div className={style.filterContainer}>
              <div className={style.filter}>
                <span className={style.filterTitle}>color</span>
                {products?.color?.map((c) => <div onClick={() => setColor(c)} key={c} className={style.filterColor} style={{ backgroundColor: `${c}` }} ></div> )}
              </div>
              <div className={style.filter}>
                <span className={style.filterTitle}>size</span>
                <select
                  onChange={(e) => setSize(e.target.value)} className={style.filterSize} name="sizes" id="sizes" defaultValue={'DEFAULT'} >
                  <option disabled value="DEFAULT">choase</option>
                  {products?.size?.map((s) => <option key={s} value={`${s}`}> {s} </option>)}</select>
              </div>
            </div>
            <div className={style.addToCart}>
              <div className={style.amountContainer}>
                <FontAwesomeIcon icon={faMinus} className={style.icon} onClick={() => handleQuantity('dec')} />
                <span className={style.amount}>{quantity}</span>
                <FontAwesomeIcon icon={faPlus} className={style.icon} onClick={() => handleQuantity('inc')} />
              </div>
              <button className={style.addToCartButton} onClick={handleCart}>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      )}
      <NewsLetter />
      <Footer />
    </section>
  );
}

export default Product;

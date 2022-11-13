import React, { useEffect, useState } from 'react';
import Product from './Product';
import style from '../../styles/Home/Products.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../app/slices/products';

function Products({ category, filters, sort }) {
  const [filterProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  // fetch products by category
  useEffect(() => {
    dispatch(fetchProducts(category));
  }, [dispatch, category]);

  // change products when filters apply
  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((product) =>
          Object.entries(filters).every(([key, value]) =>
            product[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);

  // sort products
  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === 'ascending') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  return (
    <section className={style.container}>
      {loading
        ? 'Loading....'
        : category
        ? filterProducts.map((product) => (
            <Product
              category={category}
              key={product._id}
              product={product}
              loading={loading}
              error={error}
            />
          ))
        : Array.from(products)
            .slice(0, 8)
            .map((product) => (
              <Product
                key={product._id}
                product={product}
                loading={loading}
                error={error}
              />
            ))}
    </section>
  );
}

export default Products;

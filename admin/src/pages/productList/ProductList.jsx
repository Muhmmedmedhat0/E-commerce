import './productList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../../app/slices/products';

export default function ProductList() {

  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  const columns = [
    { field: '_id', headerName: 'ID', width: 240 },
    {
      field: 'product',
      headerName: 'Product',
      width: 280,
      renderCell: (params) => (
        <div className="productListItem">
          <img className="productListImg" src={params.row.img} alt={params.row.title} />
          {params.row.title}
        </div>
      ),
    },
    { field: 'inStock', headerName: 'Stock', width: 260 },
    { field: 'price', headerName: 'Price', width: 260},
    { field: 'action', headerName: 'Action', width: 280,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/product/' + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="container">
      <Sidebar />
      <div className="productList">
        <DataGrid
          rows={products && products}
          getRowId={(row) => row._id}
          disableSelectionOnClick
          columns={columns}
          pageSize={11}
          checkboxSelection
        />
      </div>
    </div>
  );
}

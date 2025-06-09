import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  deleteProduct,
  addProduct,
  updateProduct,
} from '../redux/productSlice';
import { Link } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (title && price) {
      dispatch(addProduct({ title, price: Number(price) }));
      setTitle('');
      setPrice('');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setEditTitle(product.title);
    setEditPrice(product.price);
  };

  const handleUpdate = () => {
    dispatch(updateProduct({ id: editId, updates: { title: editTitle, price: Number(editPrice) } }));
    setEditId(null);
    setEditTitle('');
    setEditPrice('');
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className="products-container"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
        padding: '20px',
        boxSizing: 'border-box',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2 style={{ marginBottom: '10px' }}>Product Management</h2>

      <Link to="/dashboard">
        <button style={{ marginBottom: '20px', padding: '10px 16px', background: '#1a1a1a', color: 'white', border: 'none', borderRadius: '6px' }}>← Back to Dashboard</button>
      </Link>

      <form onSubmit={handleAdd} className="product-form" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '8px', borderRadius: '5px', border: 'none' }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ padding: '8px', borderRadius: '5px', border: 'none' }}
        />
        <button type="submit" style={{ padding: '8px 16px', borderRadius: '5px', background: '#333', color: 'white', border: 'none' }}>Add</button>
      </form>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px', width: '50%', borderRadius: '5px', border: 'none' }}
      />

      {paginatedProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="products-table" style={{ width: '90%', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', color: 'white', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#1a1a1a' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Title</th>
              <th style={{ padding: '12px' }}>Price ($)</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((prod) => (
              <tr key={prod.id}>
                <td style={{ padding: '10px' }}>{prod.id}</td>
                <td style={{ padding: '10px' }}>
                  {editId === prod.id ? (
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      style={{ padding: '5px', borderRadius: '4px', border: 'none' }}
                    />
                  ) : (
                    prod.title
                  )}
                </td>
                <td style={{ padding: '10px' }}>
                  {editId === prod.id ? (
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      style={{ padding: '5px', borderRadius: '4px', border: 'none' }}
                    />
                  ) : (
                    prod.price
                  )}
                </td>
                <td style={{ padding: '10px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {editId === prod.id ? (
                      <button onClick={handleUpdate} style={{ padding: '6px 10px', border: 'none', background: '#444', color: 'white', borderRadius: '5px' }}>Save</button>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(prod)} style={{ padding: '6px 10px', border: 'none', background: '#444', color: 'white', borderRadius: '5px' }}>Edit</button>
                        <button onClick={() => handleDelete(prod.id)} style={{ padding: '6px 10px', border: 'none', background: '#444', color: 'white', borderRadius: '5px' }}>Delete</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            style={{
              padding: '6px 12px',
              backgroundColor: currentPage === num ? '#555' : '#222',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;

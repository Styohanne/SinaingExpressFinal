import React, { useState } from "react";
import "./admin.css";

const initialForm = {
  productID: "",
  productName: "",
  productType: "",
  price: "",
  stock: "",
  imageURL: "",
  description: ""
};

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editIndex, setEditIndex] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.productID ||
      !form.productName ||
      !form.productType ||
      !form.price ||
      !form.stock ||
      !form.imageURL
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    if (editIndex === null) {
      setProducts([...products, form]);
    } else {
      const updated = [...products];
      updated[editIndex] = form;
      setProducts(updated);
      setEditIndex(null);
    }
    setForm(initialForm);
  };

  // Edit product
  const handleEdit = (idx) => {
    setForm(products[idx]);
    setEditIndex(idx);
  };

  // Delete product
  const handleDelete = (idx) => {
    if (window.confirm("Delete this product?")) {
      const updated = [...products];
      updated.splice(idx, 1);
      setProducts(updated);
      if (editIndex === idx) {
        setForm(initialForm);
        setEditIndex(null);
      }
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Product Management</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-fields">
          <input
            name="productID"
            placeholder="Product ID"
            value={form.productID}
            onChange={handleChange}
            required
          />
          <input
            name="productName"
            placeholder="Product Name"
            value={form.productName}
            onChange={handleChange}
            required
          />
          <input
            name="productType"
            placeholder="Product Type"
            value={form.productType}
            onChange={handleChange}
            required
          />
          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            type="number"
            min="0"
          />
          <input
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
            type="number"
            min="0"
          />
          <input
            name="imageURL"
            placeholder="Image URL"
            value={form.imageURL}
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">
          {editIndex === null ? "Add Product" : "Update Product"}
        </button>
        {editIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setForm(initialForm);
              setEditIndex(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>No products yet.</td>
            </tr>
          ) : (
            products.map((prod, idx) => (
              <tr key={prod.productID}>
                <td>{prod.productID}</td>
                <td>{prod.productName}</td>
                <td>{prod.productType}</td>
                <td>{prod.price}</td>
                <td>{prod.stock}</td>
                <td>
                  <img src={prod.imageURL} alt={prod.productName} />
                </td>
                <td>{prod.description}</td>
                <td>
                  <button onClick={() => handleEdit(idx)}>Edit</button>
                  <button onClick={() => handleDelete(idx)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./common.css";
const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setTodate] = useState("");
  const [availableStatus, setAvailableStatus] = useState("");
  //   ?productId=${productId}&productName=${productName}&quantity=${quantity}&fromDate=${fromDate}&toDate=${toDate}&status=${status}&availableStatus=${availableStatus}
  useEffect(() => {
    const fetchProducts = async () => {
      await axios
        .get(
          `http://localhost:3001?searchData=${searchData}&fromDate=${fromDate}&toDate=${toDate}&status=${status}&availableStatus=${availableStatus}`
        )
        .then((result) => {
          setProducts(result.data);
        })
        .catch((error) => console.error(error));
    };
    fetchProducts();
  }, [searchData, fromDate, toDate, status, availableStatus]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then((respponse) => {
        setProducts(products.filter((x) => x._id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>Create Stock</h2>
      <div className="filter-section">
        <div className="search-filter">
          <input
            type="search"
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
        <div className="status-filter">
          <select onChange={(e) => setStatus(e.target.value)}>
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="fromdate">
          <input type="date" onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div className="todate">
          <input type="date" onChange={(e) => setTodate(e.target.value)} />
        </div>
        <div className="status-filter">
          <select onChange={(e) => setAvailableStatus(e.target.value)}>
            <option value="">Status</option>
            <option value="Available">Available</option>
            <option value="Out of stock">Out of stock</option>
          </select>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quandity</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
          {products.map((data) => (
            <>
              <tr key={data._id}>
                <td>{data.productId}</td>
                <td>{data.productName}</td>
                <td>{data.quantity}</td>
                <td>{data.status}</td>
                <td>{new Date(data.date).toLocaleDateString()}</td>
              </tr>
              <Link key={data.productId * data._id} to={`/update/${data._id}`}>
                Edit
              </Link>
              <button onClick={() => handleDelete(data._id)}>Delete</button>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

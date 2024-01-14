import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddProducts = () => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const Navigate = useNavigate();
  const [errorText, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const getData = async () => {
      await axios
        .post("http://localhost:3001/submit", {
          productId: parseInt(productId),
          productName,
          quantity: parseInt(quantity),
          status,
          date,
        })

        .then((result) => {
          console.log(result);
          Navigate("/productTable");
        })
        .catch((error) => {
          if (error.response.status === 400) {
            return setError(error.response.data.message);
          }
        });
    };
    getData();
  };

  return (
    <div>
      <p>{errorText}</p>
      <form action="" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="">Product Id</label>
          <input type="number" onChange={(e) => setProductId(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="">Product Name</label>
          <input type="text" onChange={(e) => setProductName(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="">Quantity</label>
          <input type="number" onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="">Status</label>
          <select onChange={(e) => setStatus(e.target.value)}>
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="mercedes">Inactive</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="">Stock Date</label>
          <input type="date" onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="field">
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;

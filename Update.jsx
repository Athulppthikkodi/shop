import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const Update = () => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const { id } = useParams();
  const [validationText, setValidationText] = useState("");
  const Navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`http://localhost:3001/getProduct/${id}`)
        .then((result) => {
          setProductId(result.data.productId);
          setProductName(result.data.productName);
          setQuantity(result.data.quantity);
          setStatus(result.data.status);
          setDate(result.data.date);
        })
        .catch((error) => console.log(error));
    };
    getData();
  }, [id]);

  let date1 = [];
  if (date) {
    date1 = new Date().toLocaleDateString().split("/");
    console.log(date1);
    if (date1[0].length === 1) date1[0] = "0" + date1[0];
    console.log(date1.join("/"));
    console.log(date1[1]);
  }
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/update/${id}`, {
        productId: parseInt(productId),
        productName,
        quantity: parseInt(quantity),
        status,
        date,
      })
      .then((response) => {
        console.log(response);
        Navigate("/productTable");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setValidationText(error.response.data.message);
        }
      });
  };
  return (
    <div>
      <p>{validationText}</p>
      <form action="" onSubmit={handleUpdate}>
        <div className="field">
          <label htmlFor="">Product Id</label>
          <input
            type="number"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="mercedes">Inactive</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="">Stock Date</label>
          <input
            type="date"
            value={date1}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="field">
          <button>submit</button>
        </div>
      </form>
    </div>
  );
};

export default Update;

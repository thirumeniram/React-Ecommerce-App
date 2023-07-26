import React from "react";
import { useState } from "react";
import { addproducts } from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProductAddition() {
  // Accessing 'products' state from the Redux store
  const products = useSelector((state) => state.products);
  // Accessing the dispatch function from Redux
  const dispatch = useDispatch();
  // Accessing the 'navigate' function from React Router DOM to redirect after adding a product
  const navigate = useNavigate();

  // State variables to store form input values
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [thumbnail, setthumbmail] = useState("");
  const [rating, setrating] = useState("");

  // API  URL for posting new products
  let url =
    "https://my-json-server.typicode.com/thirumeniram/my-json-server/products";

  // Function to fetch data from the API
  const Fetch = async (url, { body, ...rest }) => {
    const config = {
      ...rest,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    if (body) {
      config.body = JSON.stringify(body);
    }
    try {
      let response = await fetch(url, config);
      let data = await response.json();
      if (data) {
        return data;
      } else {
        throw new Error("data not fetched");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle form submission when adding a new product
  function handleSubmit(e) {
    e.preventDefault();
    let result = Fetch(url, {
      body: {
        id: Date.now(), // Generating a unique ID for the new product
        title: name,
        price,
        thumbnail,
        rating,
        description,
        edit: true,
      },
      method: "POST",
    });
    result.then((data) => {
      // Dispatching the 'addproducts' action to update the Redux store with the new product
      dispatch(addproducts([...products, data]));
      // Redirecting to the homepage after adding the product
      navigate("/");
    });

    // Showing an alert for successful product addition
    window.alert("Product Added Successfully");
  }

  return (
    
    <div
      className="bg-light border border-1 border-dark mt-4 p-3 "
      id="AddContainer"
    >
      {/* ProductAddition form */}
      <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
        {/* Input fields for product details */}
        <input
          type="text"
          className="p-2"
          placeholder="Title"
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="text"
          className="p-2"
          placeholder="Description"
          onChange={(e) => setdescription(e.target.value)}
        />
        <input
          type="text"
          className="p-2"
          placeholder="Price"
          onChange={(e) => setprice(e.target.value)}
        />
        <input
          type="text"
          className="p-2"
          placeholder="Thumbnail image Url"
          onChange={(e) => setthumbmail(e.target.value)}
        />
        <input
          type="text"
          className="p-2"
          placeholder="ratings"
          onChange={(e) => setrating(e.target.value)}
        />
        {/* Submit button to add the product */}
        <button
          type="submit"
          className="btn btn-primary align-self-end mt-4"
          style={{
            width: "9rem",
            backgroundColor: "#008080",
          }}
        >
          Add to Cart
        </button>
      </form>
    </div>
  );
}

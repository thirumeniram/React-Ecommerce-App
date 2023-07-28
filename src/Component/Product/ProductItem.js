
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import ProductRating from "../ProductAddition/ProductRating";
import { ProductToview, addproducts } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import { addCart, CartItems } from "../../Redux/actions";
import axios from "axios";

// The 'ProductItem' component takes an 'item' prop which represents the product details.
export default function ProductItem({ item }) {
  // State variables to manage edit mode and product details

  const [addedItem, setaddedItem] = useState(true);
  const [title, settitle] = useState(item.title);
  const [price, setprice] = useState(item.price);
  const [rating, setrating] = useState(item.rating);
  const [description, setdescription] = useState(item.description);

  // Accessing Redux store to get products and dispatch actions
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();
  const dispatchProduct = useDispatch();

  // Function to handle click event to view product details
  function handleClick(item) {
    dispatch(ProductToview(item)); // Dispatch the 'ProductToview' action to set the product details for viewing
    navigate(`/productInfo/${item.id}`); // Navigate to the product details page
  }

  // Function to handle click event for adding the product to the cart
  function handleCart(item) {
    if (addedItem) {
      item.qty = 1;
      dispatchCart(addCart(item)); // Dispatch the 'addCart' action to add the item to the cart in the Redux store
      dispatchTotal(CartItems()); // Dispatch the 'CartItems' action to update the cart items after adding the product
      setaddedItem(false); // Update the state to indicate that the item is added to the cart

      window.alert("Item added to cart successfully");
    } else {
      navigate("/cart"); // Navigate to the cart page if the item is already added to the cart
    }
  }

  // Function to handle click event for editing the product details
  function handleEdit(item) {
    const updatedItem = {
      ...item,
      edit: false,
    };
    dispatchProduct(
      addproducts([
        ...products.map((p) => (p.id === item.id ? updatedItem : p)), // Update the 'edit' property of the item in the products array
      ])
    );
  }

  // Function to handle click event for deleting the product
  function handleDelelteProduct(item) {
    const updatedProducts = [...products]; // Create a new copy of the products array
    const index = updatedProducts.indexOf(item);
    updatedProducts.splice(index, 1); // Remove the item from the updatedProducts array
    dispatchProduct(addproducts(updatedProducts)); // Dispatch the 'addproducts' action to update the products array in the Redux store

    window.alert("Item deleted from the list");
  }

  // Function to handle click event for canceling the edit mode
  function handleCancel(item) {
    const updatedItem = {
      ...item,
      edit: true,
    };
    dispatchProduct(
      addproducts([
        ...products.map((p) => (p.id === item.id ? updatedItem : p)), // Update the 'edit' property of the item in the products array
      ])
    );
  }

  // Function to handle click event for saving the edited product details
  function handleSave(item) {
    let url = `https://my-json-server.typicode.com/thirumeniram/my-json-server/products/${item.id}`;
    axios
      .put(url, {
        ...item,
        title,
        price,
        rating,
        description,
        edit: true,
      })
      .then((response) => {
        let updatedProducts = [...products];
        const index = updatedProducts.findIndex(
          (product) => product.id === item.id
        );
        updatedProducts[index] = response.data;

        dispatchProduct(addproducts(updatedProducts)); // Dispatch the 'addproducts' action to update the products array in the Redux store

        window.alert("Edited successfully!!");
      })
      .catch((error) => {
        console.error("Error updating product:", error);

        window.alert("Failed to Save!!");
      });
  }

  return (
    // Main container for the product item
    <div
      className="d-flex container-sm bg-white px-2 py-3 mt-5 flex-wrap "
      id="MainContianer"
    >
      {/* Left part - Display product thumbnail */}
      <div>
        <img
          src={item.thumbnail}
          alt=""
          id="MainImg"
         
          height={"310rem"}
          onClick={() => handleClick(item)}
        />
      </div>

      <div className="d-flex flex-column " style={{ marginTop: "-150px" }}>
        <div className="d-flex container-sm gap-5">
          <div
            className="d-flex flex-column gap-2"
            style={{ fontWeight: "bold", marginTop: "95px" }}
          >
            {item.edit ? (
              <span style={{ fontSize: "1.2rem",marginTop:"35px" }}>{item.title}</span>
            ) : (
              <input
                type="text"
                value={title}
                style={{ marginTop: "15px" }}
                className="w-50"
                onChange={(e) => settitle(e.target.value)}
              ></input>
            )}
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                height: "50px",
              }}
            >
              {item.edit ? (
                <span id="itemEdit">{item.description}</span>
              ) : (
                <div>
                  <textarea
                    // className="form-control"
                    value={description}
                    id="floatingTextarea"
                    onChange={(e) => setdescription(e.target.value)}
                  ></textarea>
                </div>
              )}
            </div>
            {item.edit ? (
              <div>
                <span>Price:</span>
                <span>{item.price} Rs</span>
              </div>
            ) : (
              <input
                type="text"
                value={price}
                className="w-50"
                onChange={(e) => setprice(e.target.value)}
              ></input>
            )}
            {item.edit ? (
              <div>
                <span className="rating">Rating:</span>
                <ProductRating value={item.rating} />
              </div>
            ) : (
              <div>
                <h5>Ratings:</h5>
                <input
                  type="number"
                  max={"5"}
                  min={"0"}
                  value={rating}
                  step={"0.5"}
                  onChange={(e) => setrating(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* footer section */}
        <div
          className="d-flex align-items-center justify-content-space-between gap-5 flex-lg-grow-1 p-1 "
          style={{ width: "26.75rem", marginTop: "0px" }}
        >
          {item.edit ? (
            <button
              type="button"
              className="btn btn-primary"
              style={{
                width: "10rem",
                backgroundColor: "#008080",
              }}
              onClick={() => handleCart(item)}
            >
              {addedItem ? "Add to Cart" : "Added to cart "}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleCancel(item)}
            >
              Cancel
            </button>
          )}

          {item.edit ? (
            <>
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3196/3196909.png"
                  alt="error"
                  width={"30rem"}
                  style={{ cursor: "pointer", margin: "0px 2.55rem" }}
                  onClick={() => handleEdit(item)}
                />
              </span>
              <span className="button">
                <i
                  className="fas fa-trash-alt remove-icon"
                  onClick={() => handleDelelteProduct(item)}
                  alt="error"
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    right: "0rem",
                  }}
                ></i>
              </span>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => handleSave(item)}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

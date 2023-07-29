import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addproducts } from "../../Redux/actions";
import image from "../../Assets/close.png";

// The ProductSort function that sorts the products by price
export default function ProductSort() {
  // State variable to track if the products are sorted or not
  const [flag, setflag] = useState(false);

  // Accessing 'products' state from the Redux store
  const products = useSelector((state) => state.products);

  // Accessing the dispatch function from Redux to dispatch the 'addproducts' action
  const dispatchSort = useDispatch();
  const dispatchCancel = useDispatch();

  // Function to handle sorting the products by price
  function Sort() {
    // Sorting the 'products' array based on price (ascending order)
    let sortedData = products.sort((a, b) => a.price - b.price);

    // Dispatching the 'addproducts' action to update the Redux store with the sorted products
    dispatchSort(addproducts([...sortedData]));

    // Setting 'flag' to true to indicate that the products are sorted
    setflag(true);
  }

  // Function to cancel the sorting and revert back to the original order
  function cancelSort() {
    // Retrieving the original products from localStorage (before sorting)
    let products = JSON.parse(window.localStorage.getItem("products"));

    // Dispatching the 'addproducts' action to update the Redux store with the original products
    dispatchCancel(addproducts([...products]));

    // Setting 'flag' to false to indicate that the sorting is canceled
    setflag(false);
  }

  return (
    <div className="align-self-end">
      <div
        className="bg-white p-2 rounded-5  d-flex justify-content-around"
        id="sortElement"
      >
        {/* Sort by Price button */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            className="fw-bold"
            onClick={() => Sort()}
            style={{ marginRight: "10px", cursor: "pointer" }}
          >
            Sort by Price
          </span>

          {/* Cancel sort button (visible only when sorting is active) */}
          {flag && (
            <span style={{ cursor: "pointer" }}>
              <img
                src={image}
                alt="error"
                width={"20rem"}
                onClick={() => cancelSort()}
              />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

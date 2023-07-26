import React from "react";
import { useDispatch } from "react-redux";
import { CartItems, DeleteCart } from "../../Redux/actions";

// The 'Cart' component takes an 'item' prop which represents the product added to the cart.
export default function Cart({ item }) {
  const dispatch = useDispatch();

  // Function to handle the cancel (delete) action of a product from the cart
  function Delete(item) {
    dispatch(DeleteCart(item)); // Dispatch the 'DeleteCart' action to remove the item from the cart in Redux store
    dispatch(CartItems()); // Dispatch the 'CartItems' action to update the cart items after deletion
  }

  return (
    <>
      {/* Container for the cart item */}
      <div className="d-flex container-sm p-1 bg-white gap-3" id="cart-item">
        {/* Left part - Display product thumbnail */}
        <img src={item.thumbnail} alt="error" id="card-image" />

        {/* Right part - Display product details */}
        <div
          className="d-flex flex-column gap-2 justify-content-start"
          style={{ width: "50%", padding: "15px" }}
        >
          {/* Product title */}
          <h2>{item.title}</h2>

          {/* Product price */}
          <span className="text-success">
            <span className="text-danger" style={{ fontSize: "25px" }}>
              Price:
            </span>{" "}
            <span style={{ fontSize: "20px" }}>Rs{item.price}</span>
          </span>

          {/* Cancel button to remove the product from the cart */}
          <div className="align-self-end mt-5">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => Delete(item)}
              id="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

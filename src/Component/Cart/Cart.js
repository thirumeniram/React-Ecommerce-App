import React from "react";

import { useDispatch } from "react-redux";
import {
  CartItems,
  DeleteCart,
  decrementQty,
  addCart,
} from "../../Redux/actions";

export default function Cart({ item }) {
  const dispatch = useDispatch();
  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();

  function Delete(item) {
    dispatch(DeleteCart(item));
    dispatch(CartItems());
  }

  function handleCart(item) {
    dispatchCart(addCart(item)); // Dispatch the 'addCart' action to add the item to the cart in the Redux store
    dispatchTotal(CartItems()); // Dispatch the 'CartItems' action to update the cart items after adding the product
    // Update the state to indicate that the item is added to the cart

    window.alert("Item added to cart successfully");
  }

  function decrementItemQty(item) {
    if (item.qty === 1) {
      Delete(item);
    } else {
      dispatchCart(decrementQty(item)); // Dispatch action to decrement item quantity
      dispatchTotal(CartItems());
      window.alert("Item removed from cart successfully");
    }
  }

  return (
    <>
      <div className="d-flex container-sm p-1 bg-white gap-3" id="cart-item">
        <img src={item.thumbnail} alt="error" id="card-image" />
        <div
          className="d-flex flex-column gap-2 justify-content-start"
          style={{ width: "50%", padding: "15px" }}
        >
          <h2>{item.title}</h2>
          <span className="text-success">
            <span className="text-danger" style={{ fontSize: "25px" }}>
              Price:
            </span>{" "}
            <span style={{ fontSize: "20px" }}>Rs{item.price}</span>
          </span>

          <div className="align-self-end mt-5">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => decrementItemQty(item)}
              id="decrement-button"
            >
              -
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              id="qty-button"
            >
              {item.qty}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleCart(item)}
              id="increment-button"
            >
              +
            </button>
          </div>

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

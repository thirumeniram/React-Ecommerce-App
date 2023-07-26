import React from "react";
import Cart from "./Cart";
import { useSelector } from "react-redux";

// The 'CartSummary' component that displays the cart items and the price details
export default function CartSummary({ item }) {
  // Accessing the 'cart' and 'totalCart' state from the Redux store
  let CartItem = useSelector((state) => state.cart);
  let totalItem = useSelector((state) => state.totalCart);

  // Calculating the total price and total discount for the items in the cart
  let totalPrice = CartItem.reduce((total, item) => {
    return (total += item.price && item.qty ? item.price * item.qty : 0);
  }, 0);

  let totalDiscount = CartItem.reduce((total, item) => {
    return (total +=
      item.price && item.qty && item.discountPercentage
        ? (item.price * item.qty * item.discountPercentage) / 100
        : 0);
  }, 0);

  // If the cart is empty, display a message
  if (CartItem.length === 0)
    return (
      <h1 className="text-center mt-5">There are no products in the cart.</h1>
    );

  return (
    // Container for the cart items and price details
    <div
      className="  d-flex flex-column flex-lg-row mt-4 gap-3 "
      style={{ position: "relative", top: "20px" }}
    >
      {/* Container for displaying the cart items */}
      <div className="d-flex flex-column gap-3">
        {/* Loop through the 'CartItem' array and render the 'Cart' component for each item */}
        {CartItem.map((item) => (
          <Cart item={item} key={item.id} />
        ))}
      </div>

      {/* Price summary section */}
      <div className="bg-white p-5 d-flex flex-column gap-4 " id="PriceDetail">
        <span className="fs-5  pb-2 fw-bold">Price Details</span>

        {/* Displaying the total price of all items */}
        <div className="d-flex justify-content-between">
          <span>Price({totalItem} item)</span>
          <span>{totalPrice}</span>
        </div>

        {/* Displaying the total discount on the items */}
        <div className="d-flex justify-content-between">
          <span>Discount</span>
          <span>{Math.floor(totalDiscount)}</span>
        </div>

        {/* Displaying the total amount to be paid */}
        <div className="d-flex justify-content-between mt-3">
          <h5>Total Amount</h5>
          <span>{totalPrice - Math.floor(totalDiscount)}</span>
        </div>
      </div>
    </div>
  );
}

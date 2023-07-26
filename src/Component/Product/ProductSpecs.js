
import React from "react";
import ProductRating from "../ProductAddition/ProductRating";
import { addCart, CartItems } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

// The 'ProductSpecs' component takes an 'item' prop which represents the product details.
export default function ProductSpecs() {
  // Accessing the dispatch function from Redux to dispatch actions
  const item = useSelector((state) => state.itemToDisplay);

  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();

  // Function to handle the click event when adding the product to the cart
  function handleClick(item) {
    // Check if the product quantity is not set (not added to the cart before)
    if (!item.qty) {
      item.qty = 1; // Set the quantity to 1
      dispatchCart(addCart(item)); // Dispatch the 'addCart' action to add the item to the cart in the Redux store
      dispatchTotal(CartItems()); // Dispatch the 'CartItems' action to update the cart items after adding the product

      window.alert("Item added to cart Successfully");
    } else {
      // If the product is already in the cart, simply increase the quantity by 1
      dispatchCart(addCart(item)); // Dispatch the 'addCart' action to update the item quantity in the cart in the Redux store
      dispatchTotal(CartItems()); // Dispatch the 'CartItems' action to update the cart items after increasing the quantity

      window.alert("Item added to cart Successfully");
    }
  }
  return (
    //   container
    <div id="mobile-details">
      <div className=" d-flex flex-lg-row  flex-column mt-4 gap-5">
       

        {item.images ? (
          <div className=" border border-1 " id="itemImage">
            <div
              id="carouselExampleDark"
              className="carousel carousel-dark slide"
              style={{ height: "80%" }}
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {item.images[0] && (
                  <div
                    className="carousel-item active"
                    data-bs-interval="10000"
                  >
                    <img
                      src={item.images[0]}
                      className="d-block w-100 "
                      alt="error"
                      style={{ height: "35rem" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // This part of the code displays the product thumbnail using an image tag
          <img src={item.thumbnail} alt="error" id="detailAddedImage" />
        )}
        

        <div className="d-flex flex-column gap-3" id="product-details">
          <div className="d-flex flex-column gap-2">
            <h2>{item.title}</h2>
            <span>{item.description}</span>
            <div className="d-flex gap-3 ">
              <span>
                <span>Price: Rs {item.price}</span>
              </span>
            </div>
            <span>
              Discount:
              <span>
                {item.discountPercentage ? item.discountPercentage : ""}%
                {/* Display the discount percentage if available */}
              </span>
            </span>
          </div>
          <div className="d-flex flex-column gap-3">
            <span>
              {" "}
              Stocks:
              <span>{item.stock ? item.stock : ""}</span>
              {/* Display the stock information if available */}
            </span>
          </div>
          <span>
            <span id="rating">Rating:</span> {/* Display "Rating:" label */}
            <ProductRating value={item.rating} />
            {/* Display the product rating using the 'ProductRating' component */}
          </span>

          {/* Button to add the product to the cart */}
          <div className="align-self-end">
            <button
              type="button"
              className="btn btn-primary"
              style={{
                width: "9rem",
                backgroundColor: "#008080",
              }}
              onClick={() => handleClick(item)} // Call the 'handleClick' function when the button is clicked
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

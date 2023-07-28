import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
  // Accessing the 'totalCart' state from the Redux store
  let total = useSelector((state) => state.totalCart);

  // Accessing the 'navigate' function from React Router DOM to handle navigation
  const navigate = useNavigate();

  return (
    // Navigation bar container
    <nav
      className="navbar navbar-expand-lg p-4 align-items-center"
      style={{
        backgroundColor: "#008080",
        marginBottom: "-1.2rem",
      }}
    >
      <div className="container-fluid">
        {/* Brand logo (with a link to the home page) */}
        <Link
          to="/"
          id="main-font"
          className="navbar-brand fs-3"
          href="#"
          style={{
            color: "#131a21",
            position: "absolute",
            right: "45%",
          }}
        >
          <span id="Header-text"> E-shop </span>
        </Link>

        {/* Navigation menu */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Link to "Add a product" page */}
            <li className="nav-item">
              <Link
                to="/productAddition"
                className="nav-link active text-light"
                  style={{fontSize: "1.17rem",
                  position: "relative",
                  right: "15px"
                }}
              >
                Add a product
              </Link>
            </li>
          </ul>

          {/* Cart and User icons */}
          <div className="d-flex gap-5 position-relative">
            {/* Cart icon (with a link to the "Cart" page) */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/4290/4290854.png"
              alt="error"
              width={"40rem"}
              onClick={() => navigate("/cart")}
              style={{ cursor: "pointer", position: "absolute", right: "157px", width:"90%"}}
            />
            <p className="cart">Cart</p>

            {/* Showing the total items in the cart as a badge if 'total' is greater than 0 */}
            {total ? (
              <p
                className="bg-white rounded-circle position-absolute d-flex align-items-center justify-content-center"
                style={{
                  width: "1rem",
                  height: "1rem",
                  right: "150px",
                }}
              >
                {total}
              </p>
            ) : (
              ""
            )}

            {/* User icon */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/236/236832.png"
              alt="error"
              width={"40rem"}
              style={{ cursor: "pointer", position: "relative", right: "26px" , height: "33px"}}
            />
            <p className="user">User</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

// #9375b7

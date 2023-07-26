import Navbar from "./Component/Navbar/Navbar";
import ProductSpecs from "./Component/Product/ProductSpecs";
import ProductAddition from "./Component/ProductAddition/ProductAddition";
import CartSummary from "./Component/Cart/CartSummary";
import ProductCollection from "./Component/Product/ProductCollection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addproducts } from "./Redux/actions/index";

import { useEffect } from "react";

// The main App component
function App() {
  // API endpoint URL
  const url =
    "https://my-json-server.typicode.com/thirumeniram/my-json-server/db";

  // Accessing the dispatch function from Redux
  const dispatch = useDispatch();

  // Function to fetch data from the API and update the Redux store
  const Fetch = async (url, { body, ...rest }) => {
    // Configuring the fetch request with headers if a body is provided
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

  // useEffect hook to fetch data from the API and update the Redux store on component mount
  useEffect(() => {
    let response = Fetch(url, {
      method: "GET",
    });
    response.then((data) => {
      // Modifying the data received from the API
      let modifiedData = data.products.map((item) => {
        item.edit = true; // Adding a new property 'edit' to each item
        return item;
      });

      // Saving the modified data to localStorage for persistence
      window.localStorage.setItem("products", JSON.stringify(modifiedData));

      // Retrieving the products from localStorage
      let products = JSON.parse(window.localStorage.getItem("products"));

      // Dispatching the 'addproducts' action to update the Redux store with the fetched products
      dispatch(addproducts(products));
    });
  }, []);
  // Accessing the 'itemToDisplay' state from the Redux store
  let productInfo = useSelector((state) => state.itemToDisplay);
  // Rendering the main App component
  return (
    <div className="App">
      {/* React Router setup */}
      <BrowserRouter>
        {/* Navigation Bar */}
        <Navbar />
        {/* React Router routes */}
        <Routes>
          <Route path="/" element={<ProductCollection />} />
          <Route path="/productAddition" element={<ProductAddition />} />
          {/* Dynamic route to display product details based on the 'productInfo' */}
          <Route
            path={`/productInfo/${productInfo.id}`}
            element={<ProductSpecs />}
          />
          <Route path="/cart" element={<CartSummary />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

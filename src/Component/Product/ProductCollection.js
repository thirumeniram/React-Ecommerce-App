import React from "react";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";
import Sort from "./ProductSort";

// The ProductCollection component that displays a list of products
export default function ProductCollection() {
  // Retrieving the product data from the Redux store using the 'useSelector' hook
  const data = useSelector((state) => state.products);

  return (
    
    <div
      className=" d-flex flex-row container-sm mt-6 flex-wrap "
      style={{ gap: "0px" }}
    >
      {/* Component for sorting the products */}
      <Sort />

     {/* If 'data' exists (i.e., is not null or undefined), map through each item in 'data' */}
      {data &&
        data.map(
          (item) => item && <ProductItem item={item} key={item.title} />
        )}
    </div>
  );
  // }
}


//
import React, { useState } from "react";
import Rating from "@mui/material/Rating";


export default function ProductRating({ value }) {

  // Setting the initial value of 'ratingValue' to the 'value' prop if it exists, otherwise set it to 0
  const [ratingValue, setRatingValue] = useState(value ? value : 0);

  // this function is for handling changes to the Rating component
  
  
  const handleRatingChange = (event, newValue) => {
    // Update the 'ratingValue' state with the new rating value selected by the user
    setRatingValue(newValue);
  };

 
  return (
    <Rating
      name="simple-controlled"
      value={ratingValue}
      onChange={handleRatingChange}
    />
  );
}


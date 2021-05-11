import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {

  const imageUrl = product
    ? `${API}product/photo/${product._id}`
    : "https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=426&amp;w=640";
  return <img src={imageUrl} alt="photo" />;
};

export default ImageHelper;

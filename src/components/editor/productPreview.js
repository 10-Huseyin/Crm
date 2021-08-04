import React from "react";

const ProductPreview = ({ image, onClick, id, name, price }) => {
  const style = {
    "--product-image": `url(${image})`,
  };

  return (
    <div className="product-preview" style={style}>
      <button
        className="product-preview__add"
        onClick={() => onClick(id)}
        title="Add to the offer"
      >
        <span>+</span>
      </button>
      <span className="product-preview__name">{name}</span>
      <span className="product-preview__price">from {price}</span>
    </div>
  );
};

export default ProductPreview;
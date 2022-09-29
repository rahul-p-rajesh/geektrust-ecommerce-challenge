import React from "react";
import { toast } from 'react-toastify';
import "./ProductCard.css";

function ProductCard(props) {
  const { id, imgUrl, name, price, quantity } = props;

  //cart eg  cart: [{id:"", Quantity:1}, ...]
  function addToCart(){
    const productId = id;
    // check if the product already exist in cart 
    //   if it does throw a toaster error that product already exist in cart
      if(isProductInCart(productId)){
        toast.error("product already exist in cart")
        return;
      }
      setProductInCart(productId);
      toast.success("product added to cart")
  }

  function isProductInCart(productId){
    //fetch the cart
    const cart = fetchCart();
    let ProductExist = false;
    cart.forEach(product => {
      if(product.id === productId){
        ProductExist = true;
        return;
      }
    });
    return ProductExist;
  }

  function setProductInCart(productId){
    const cart = fetchCart();
    cart.push({
      "id":productId,
      "name":name,
      "imgUrl":imgUrl,
      "quantity":1,
      "price":price,
      "maxQuantity":quantity
    })
    localStorage.setItem("cart",JSON.stringify([...cart]))
  }

  function fetchCart(){
    const cart = JSON.parse(localStorage.getItem("cart"));
    if(!cart){
      localStorage.setItem("cart",JSON.stringify([]))
      return []
    }
    return cart;
  }

  return (
    <div
      className="product-card shadow-md"
    >
      <div className="p-8">
        <img className="product-image" src={imgUrl} alt={name} />
      </div>
      <div className="px-5 pb-4">
        <h5 className="pb-1 text-xl font-semibold tracking-tight text-gray-900 ">
        {name}
        </h5>
        <div className=" card-bottom-container mt-3">
          <span className=" text-xl font-bold text-gray-900 ">
            Rs {price}
          </span>
          <button type="button" 
          onClick={addToCart}
          className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
          >Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    cartTotal: 0.0,
    deliveryCharge: 10.0,
    noOfItems: 0,
  });

  useEffect(() => {
    const cart = getCartItems();
    setCartItems(cart);
    setCartTotal(cart);
  }, []);

  useEffect(() => {
    //update cart total whenever there is update in cart items
    setCartTotal(cartItems);
  }, [cartItems]);

  function setCartTotal(cart) {
    let cartTotal = 0.0;
    cart.forEach((product) => {
      cartTotal += product.price * product.quantity;
    });

    setCartSummary((prevVal) => {
      return { ...prevVal, cartTotal: cartTotal, noOfItems: cart.length };
    });
  }

  function getCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      return [];
    }
    return cart;
  }

  function updateProductQuantity(productId, quantity) {
    let items = getCartItems();
    if (quantity === 0) {
      items = items.filter((item) => item.id !== productId);
    } else {
      items = items.map((item) => {
        if (item.id === productId) {
          const newItem = { ...item };
          newItem.quantity = quantity;
          return newItem;
        }
        return item;
      });
    }
    //update product quantity in localStorage
    localStorage.setItem("cart", JSON.stringify(items));
    //update quantity in state
    setCartItems(items);
  }

  let cardContainers = cartItems.map((item) => {
    return (
      <div key={item.id} className="Cart-items">
        <div className="item-container">
          <img src={item.imgUrl} alt={item.name} />
        </div>
        <h1 className="title">{item.name}</h1>
        <div className="counter">
          <div
            className="btn"
            onClick={() => updateProductQuantity(item.id, item.quantity + 1)}
          >
            +
          </div>
          <div className="count">{item.quantity}</div>
          <div
            className="btn"
            onClick={() => updateProductQuantity(item.id, item.quantity - 1)}
          >
            -
          </div>
        </div>
        <div className="prices">
          <div className="amount">{item.price}</div>
          <div
            className="remove"
            onClick={() => updateProductQuantity(item.id, 0)}
          >
            <u>Remove</u>
          </div>
        </div>
      </div>
    );
  });

  if (cartItems.length === 0) {
    cardContainers = (
      <div className="Header">
        <div className="Subtotal">No Product in Cart...</div>
      </div>
    );
  }

  return (
    <div>
      <Nav currentPage="cart" />
      <div className="cart-parent-container">
        <div className="cart-container">
          <div className="Header">
            <h3 className="Heading">Shopping Cart</h3>
          </div>
          {cardContainers}
        </div>

        <div className="checkout">
          <div className="total">
            <div>
              <div className="Subtotal">Sub-Total</div>
              <div className="items">{cartSummary.noOfItems} items</div>
            </div>
            <div className="total-amount">Rs {cartSummary.cartTotal}</div>
          </div>
          {/* <button className="button">Checkout</button> */}
        </div>
      </div>
    </div>
  );
}

export default Cart;

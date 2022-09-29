import React from "react";
import { GiAstronautHelmet } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

function Nav(props) {
  const {currentPage} = props;

  const unSelectedClassName = "self-center text-3xl text-white hover:text-blue-600";
  const selectedClassName = "self-center text-3xl text-blue-400 hover:text-blue-600";

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className={currentPage === "product" ? selectedClassName : unSelectedClassName}>
          <Link to="/">
            <GiAstronautHelmet />
          </Link>
        </div>
        <div className={currentPage === "cart" ? selectedClassName : unSelectedClassName}>
          <Link to="/cart">
            <AiOutlineShoppingCart />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

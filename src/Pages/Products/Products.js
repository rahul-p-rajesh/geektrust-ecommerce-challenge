import React, { useState, useReducer, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../../components/Nav/Nav";
import ProductCard from "../../components/ProductCard/ProductCard";
import Filter from "../../components/Filter/Filter";
import SearchBar from "../../components/SearchBar/SearchBar";

import "./Product.css";

function updateFilterArray(key, inpArr, action) {
  const arrayCopy = [...inpArr];
  if (action === "add") {
    //check key does not exist
    console.log(arrayCopy.indexOf(key));
    if (arrayCopy.indexOf(key) > -1) {
      return arrayCopy;
    }
    //if it does not then add it to array and push it
    arrayCopy.push(key);
  } else if (action === "remove") {
    //fetch its first index
    const index = arrayCopy.indexOf(key);
    //and splice
    if (index > -1) arrayCopy.splice(index, 1);
  }
  //return the array
  return arrayCopy;
}

function filterReducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "updateGender":
      let gendersArray = state.genders;
      const gender = action.value;

      if (action.checked) {
        gendersArray = updateFilterArray(gender, gendersArray, "add");
      } else if (!action.checked) {
        gendersArray = updateFilterArray(gender, gendersArray, "remove");
      }
      return { ...state, genders: gendersArray };

    case "updateColor":
      let colorsArray = state.colors;
      const color = action.value;

      if (action.checked) {
        colorsArray = updateFilterArray(color, colorsArray, "add");
      } else if (!action.checked) {
        colorsArray = updateFilterArray(color, colorsArray, "remove");
      }
      return { ...state, colors: colorsArray };

    case "updatePrice":
      let priceArray = state.prices;
      const price = action.value;

      if (action.checked) {
        priceArray = updateFilterArray(price, priceArray, "add");
      } else if (!action.checked) {
        priceArray = updateFilterArray(price, priceArray, "remove");
      }
      return { ...state, prices: priceArray };

    case "updateType":
      let updateArray = state.types;
      const type = action.value;

      if (action.checked) {
        updateArray = updateFilterArray(type, updateArray, "add");
      } else if (!action.checked) {
        updateArray = updateFilterArray(type, updateArray, "remove");
      }
      return { ...state, types: updateArray };

    default:
      throw new Error("wrong action provided: " + action.type);
  }
}

function Products() {
  const [defaultProducts, setDefaultProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, dispatchFilters] = useReducer(filterReducer, {
    genders: [],
    colors: [],
    types: [],
    prices: [],
  });
  const ProductKeysToSearchFrom = ["name", "type", "price", "color", "gender"];

  //when component is mounted for the first time
  useEffect(() => {
    (async () => {
      setLoader(true);
      const data = await getAllProducts();
      setProducts(data);
      if (defaultProducts.length === 0) {
        setDefaultProducts(data);
      }
      setLoader(false);
    })();
  }, []);

  //to update product based on change in filters
  useEffect(() => {
    setLoader(true);
    updateProductBasedfilter();
    setLoader(false);
  }, [filters]);

  //when search value gets changed
  useEffect(() => {
    setLoader(true);
    if (search.length === 0) {
      updateProductBasedfilter();
    } else {
      updateProductBasedOnSearch();
    }
    setLoader(false);
  }, [search]);

  /**
   * Fetches a list of Product
   * if product could not be fetched returns an empty array
   *
   * @returns Product[]
   *
   * @typedef {Object} Product
   * @property {number} Product.id
   * @property {string} Product.imageURL
   * @property {string} Product.name
   * @property {number} Product.price
   *
   */
  async function getAllProducts() {
    try {
      const responce = await fetch(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      );
      if (responce.status !== 200) {
        throw new Error("unknow reponse " + responce.status);
      }
      const data = await responce.json();
      return data;
    } catch (err) {
      console.log(err.message);
      return [];
    }
  }

  function updateProductBasedOnSearch() {
    const text = search.toLowerCase();
    let newProducts = defaultProducts.filter((product) => {
      //check if products any key's value matches with text
      //product[key] + "" to convert price field to string
      return ProductKeysToSearchFrom.some((key) =>
        (product[key] + "").toLowerCase().includes(text)
      );
    });

    setProducts(newProducts);
  }

  /**
   * updates products based on provided filters
   * @returns
   */
  function updateProductBasedfilter() {
    const genderArr = filters.genders;
    const colorsArr = filters.colors;
    const typesArr = filters.types;
    const priceArr = filters.prices;
    let updatedProducts = [];

    if (priceArr.length !== 0) {
      //if price filter is applied
      priceArr.forEach((price) => {
        const priceArr = price.split("-");
        let lowerMargin = priceArr[0];
        let higherMargin;

        if (priceArr.length === 1) {
          higherMargin = Number.MAX_SAFE_INTEGER;
        } else {
          higherMargin = priceArr[1];
        }
        defaultProducts.forEach((product) => {
          if (product.price >= lowerMargin && product.price <= higherMargin) {
            updatedProducts.push(product);
          }
        });
      });
    } else {
      updatedProducts = defaultProducts;
    }

    if (
      genderArr.length !== 0 ||
      colorsArr.length !== 0 ||
      typesArr.length !== 0
    ) {
      updatedProducts = updatedProducts.filter((product) => {
        if (genderArr.length !== 0 && !genderArr.includes(product.gender)) {
          return false;
        }

        if (colorsArr.length !== 0 && !colorsArr.includes(product.color)) {
          return false;
        }

        if (typesArr.length !== 0 && !typesArr.includes(product.type)) {
          return false;
        }
        return true;
      });
    }

    setProducts(updatedProducts);
  }

  /**
   * call the dispatch function to update product filter
   * and updates the products based on filters provided
   * @param {{type: string,value:string, checked: boolean}} action
   */
  function updateFiltersAndProducts(action) {
    try {
      dispatchFilters(action);
    } catch (error) {
      console.log(error.message);
    }
  }

  let productContainerJsx = (
    <div
      className={
        search.length > 0
          ? "product-search-container"
          : "product-filter-container"
      }
    >
      {search.length === 0 && (
        <div>
          <Filter
            filters={filters}
            updateProductFilter={updateFiltersAndProducts}
          />
        </div>
      )}
      {loader && <p className="loader">Loading ...</p>}
      {!loader && (
        <div className="product-container">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imgUrl={product.imageURL}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      )}
      {products.length === 0 && search.length > 0 && (
        <h3 className="no-product-found">No Products Found...</h3>
      )}
    </div>
  );

  return (
    <div>
      <Nav currentPage="product"/>
      <ToastContainer />
      <div className="parent-container ">
        <SearchBar search={search} setSearch={setSearch} />
        {productContainerJsx}
      </div>
    </div>
  );
}

export default Products;

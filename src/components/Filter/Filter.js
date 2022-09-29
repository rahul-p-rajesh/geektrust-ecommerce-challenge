import React from "react";
import "./Filter.css";

function Filter(props) {
  const {filters, updateProductFilter} = props;
  
  const genders = ["Men", "Women"];

  const colors = [
    "Black","Pink","Red",
    "Purple","Yellow","Blue",
    "Green","White","Grey"
  ];

  const types = ["Hoodie","Polo","Basic"];

  const gendersJsx = genders.map((gender) => {
    return (
      <div className="sub-filter" key={`${gender}-radio-btn`}>
        <input
          id={`${gender}-radio-btn`}
          type="checkbox"
          onChange={(event) => updateProductFilter({type:"updateGender",value:gender, checked: event.target.checked})}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={`${gender}-radio-btn`}
          className="ml-2 text-sm font-medium text-gray-900"
        >
          {gender}
        </label>
      </div>
    );
  });

  const colorsJsx = colors.map((color) => (
    <div className="sub-filter" key={`${color}-radio-btn`}>
      <input
        id={`${color}-black-radio-btn`}
        type="checkbox"
        value=""
        onChange={(event) => updateProductFilter({type:"updateColor",value:color, checked: event.target.checked})}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={`${color}-black-radio-btn`}
        className="ml-2 text-sm font-medium text-gray-900"
      >
        {/* <div className="colored-dot" style={{background: "red"}}> </div> */}
        {color}
      </label>
    </div>
  ));

  const typesJsx = types.map((type) =>
    <div className="sub-filter" key={`${type}-radio-btn`}>
    <input
      id={`${type}-radio-btn`}
      type="checkbox"
      value=""
      onChange={(event) => updateProductFilter({type:"updateType",value:type, checked: event.target.checked})}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
    />
    <label
      htmlFor={`${type}-radio-btn`}
      className="ml-2 text-sm font-medium text-gray-900"
    >
      {type}
    </label>
  </div>
  )


  return (
    <div className="filter-container">
      {/* Gender */}
      <div className="filter">
        <p className="text-base font-medium mb-2 text-left mt-6">Gender</p>
        {gendersJsx}
      </div>
      {/* color */}
      <div className="filter">
        <p className="text-base font-medium mb-2 text-left">Color</p>
        {colorsJsx}
      </div>

      {/* Type */}
      <div className="filter">
        <p className="text-base font-medium mb-2 text-left">Type</p>
        {typesJsx}
      </div>

      {/* Price */}
      <div className="filter">
        <p className="text-base font-medium mb-2 text-left">Price</p>

        <div className="flex">
          <input
          
            id="hundred-radio-btn"
            type="checkbox"
            value=""
            onChange={(event) => updateProductFilter({type:"updatePrice",value:"100-199", checked: event.target.checked})}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="hundred-radio-btn"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Rs 100 to Rs 199
          </label>
        </div>

        <div className="sub-filter">
          <input
            id="twoHun-radio-btn"
            type="checkbox"
            value=""
            onChange={(event) => updateProductFilter({type:"updatePrice",value:"200-299", checked: event.target.checked})}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="twoHun-radio-btn"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Rs 200 to Rs 299
          </label>
        </div>

        <div className="sub-filter">
          <input
            id="threeHun-radio-btn"
            type="checkbox"
            value=""
            onChange={(event) => updateProductFilter({type:"updatePrice",value:"300-499", checked: event.target.checked})}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="threeHun-radio-btn"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Rs 300 to Rs 499
          </label>
        </div>

        <div className="sub-filter">
          <input
            id="fiveHun-radio-btn"
            type="checkbox"
            value=""
            onChange={(event) => updateProductFilter({type:"updatePrice",value:"500", checked: event.target.checked})}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="fiveHun-radio-btn"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Rs 500 and above
          </label>
        </div>
      </div>
    </div>
  );
}

export default Filter;

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const APIcontext = createContext();

function MealsContextProvider({ children }) {
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let url = "http://localhost:3029/dishes";
  function fetchData() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(setIsLoading(false));
  }

  function getproductbyId(id) {
    return Data?.find((item) => item?.id === id);
  }
  const getCategories = () => {
    let categories = [];
    Data?.forEach((item) => {
      categories.push(item.category);
    });
    categories = [...new Set(categories)];
    return categories;
  };

  const updatemealinfo = (meal) => {
    axios({
      method: "put",
      url: `${url}/${meal.id}/`,
      data: {
        id: meal.id,
        image: meal.image,
        category: meal.category,
        price: meal.price,
        ingredients: meal.ingredients,
        description: meal.description,
        rates: meal.rates,
        name: meal.name,
        comments: meal.comments,
      },
    }).then((data) => {
      setIsLoading(true);
      fetchData();
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <APIcontext.Provider
      value={{ Data, isLoading, getproductbyId, updatemealinfo ,getCategories}}
    >
      {children}
    </APIcontext.Provider>
  );
}
export default MealsContextProvider;
export function useAPI() {
  const context = useContext(APIcontext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}

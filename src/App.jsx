import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Inputs from "./components/Inputs";
import Simpsons from "./components/Simpsons";
import "./App.css";

const App = () => {
  const [simpsons, setSimpsons] = useState();
  const [search, setSearch] = useState("Homer");
  const [sort, setSort] = useState();

  const getData = useCallback(async () => {
    console.log("getData ran");
    try {
      const { data } = await axios.get(
        `https://thesimpsonsquoteapi.glitch.me/quotes?count=15&character=${search}`
      );

      data.forEach((element, index) => {
        element.id = index + Math.random();
      });

      setSimpsons(data);
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onDelete = (id) => {
    const indexOf = simpsons.findIndex((char) => {
      return char.id === id;
    });
    const _simpsons = [...simpsons];
    _simpsons.splice(indexOf, 1);
    setSimpsons(_simpsons);
  };

  const toggleLiked = (id) => {
    const _simpsons = [...simpsons];
    const indexOf = _simpsons.findIndex((item) => {
      return item.id === id;
    });

    _simpsons[indexOf].liked = !_simpsons[indexOf].liked;
    setSimpsons(_simpsons);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSort = (e) => {
    setSort(e.target.value);
  };

  const getFilteredList = (props) => {
    let filteredList = [...simpsons];

    if (sort) {
      filteredList = filteredList.sort((itemOne, itemTwo) => {
        if (sort === "asc") {
          if (itemOne.character < itemTwo.character) {
            return -1;
          }
          if (itemOne.character > itemTwo.character) {
            return 1;
          }
        } else if (sort === "desc") {
          if (itemOne.character < itemTwo.character) {
            return 1;
          }
          if (itemOne.character > itemTwo.character) {
            return -1;
          }
        } else {
          return;
        }
      });
    }

    return filteredList;
  };

  if (!simpsons) {
    return <h1>Loading...</h1>;
  }

  let total = 0;
  simpsons.forEach((char) => {
    if (char.liked) total++;
  });

  return (
    <>
      <h1>Total no of liked chars #{total}</h1>
      <Inputs
        simpsons={simpsons}
        search={search}
        onSearch={onSearch}
        onSort={onSort}
      />

      <Simpsons
        simpsons={getFilteredList()}
        onDelete={onDelete}
        toggleLiked={toggleLiked}
      />
    </>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Inputs from "./components/Inputs";
import Simpsons from "./components/Simpsons";
import "./App.css";

const App = () => {
  const [simpsons, setSimpsons] = useState();
  const [search, setSearch] = useState();
  const [sort, setSort] = useState();

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://thesimpsonsquoteapi.glitch.me/quotes?count=50`
      );

      data.forEach((element, index) => {
        element.id = index + Math.random();
      });

      setSimpsons(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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

  setSearch = (e) => {
    setSearch({ search: e.target.value });
  };

  setSort = (e) => {
    setSort({ sort: e.target.value });
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
      <Inputs simpsons={simpsons} onSearch={setSearch} onSort={setSort} />

      <Simpsons
        simpsons={simpsons}
        onDelete={onDelete}
        toggleLiked={toggleLiked}
      />
    </>
  );
};

export default App;

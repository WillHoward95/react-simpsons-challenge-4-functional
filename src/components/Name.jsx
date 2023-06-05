import { useState } from "react";

const Name = (props) => {
  const { character, toggleLiked, id, liked } = props;

  //   let [liked, setLiked] = useState(false);

  return (
    <>
      <div>
        <h1>{character}</h1>
        <button onClick={() => toggleLiked(id)}>
          {liked ? "Unlike" : "Like"}
        </button>
      </div>
    </>
  );
};

export default Name;

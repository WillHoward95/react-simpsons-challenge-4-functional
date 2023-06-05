import Character from "./Character";

const Simpsons = (props) => {
  const { simpsons, onDelete, toggleLiked } = props;

  return (
    <>
      {simpsons.map((item, index) => {
        return (
          <Character
            item={item}
            key={item.id}
            onDelete={onDelete}
            toggleLiked={toggleLiked}
          />
        );
      })}
    </>
  );
};

export default Simpsons;

const Search = (props) => {
  const { search } = props;

  return (
    <>
      <input
        value={search}
        type="text"
        name="search"
        id="search"
        onInput={props.onSearch}
      />
    </>
  );
};

export default Search;

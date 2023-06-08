import Search from "./Search";

const Inputs = (props) => {
  const { onSort, onSearch, search } = props;
  return (
    <>
      <p>
        Search by character: <Search onSearch={onSearch} search={search} />
      </p>
      <p>
        Sort characters alphabetically by name:
        <select name="sort" id="sort" onChange={onSort}>
          <option value="empty"></option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </p>
    </>
  );
};

export default Inputs;

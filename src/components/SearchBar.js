function SearchBar({ filter, stock, changeFilter, changeStock }) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={changeFilter}
      />
      <p>
        <input
          type="checkbox"
          checked={stock}
          onChange={changeStock}
        />
        {" "}Only show products in stock
      </p>
    </form>
  );
}
export default SearchBar;

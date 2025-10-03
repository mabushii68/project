function ProductRow({ data }) {
  const name = data.stocked
    ? data.name
    : <span style={{ color: "red" }}>{data.name}</span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{data.price}</td>
    </tr>
  );
}
export default ProductRow;

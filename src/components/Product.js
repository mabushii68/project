import Category from "./Category";
import ProductRow from "./ProductRow";

function Product({ datas, filter, stock }) {
  // 1) 검색어 필터
  const filtered = datas.filter(d => {
    const matchesFilter = d.name.toLowerCase().includes(filter.toLowerCase());
    const matchesStock  = !stock || d.stocked; // stock 체크 시 재고 있는 것만
    return matchesFilter && matchesStock;
  });

  return (
    <table>
      <thead>
        <tr><th>Name</th><th>Price</th></tr>
      </thead>
      <tbody>
        {filtered.map((data, idx) => (
          // Fragment에 key 필수
          <tr key={`row-${idx}-sentinel`} style={{ display: "contents" }}>
            {/* 첫 항목이거나, 이전 항목과 카테고리가 다르면 카테고리 줄 출력 */}
            {(idx === 0 || filtered[idx - 1].category !== data.category) && (
              <Category category={data.category} />
            )}
            <ProductRow data={data} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Product;

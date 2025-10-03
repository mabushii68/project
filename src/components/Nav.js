function Nav({ datas, onChangeMode }) {
  return (
    <nav>
      <ol>
        {datas.map((data) => (
          <li key={data.id}>
            <a
              href={"/read/" + data.id}
              onClick={(e) => {
                e.preventDefault();
                onChangeMode();
              }}
            >
              {data.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
export default Nav;

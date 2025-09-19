import Book from './Book';
import Datas from './Datas';
import "./App.css";

function App(){
  return (
    <section className="booklist">
      {Datas.map((data) => {
         return <Book key={data.id} data = {data} /> 
        }
      ) }
    </section>
  )
}
export default App;
function Book(props) {
    const {title, author, description } = props.data ;

    return (
      <article className="book">
        <h1>{title}</h1>
        <span>{author}</span>
        <p>{description}</p>
      </article>
    )
  }
      
  export default Book ;

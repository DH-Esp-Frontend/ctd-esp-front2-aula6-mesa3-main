import "./index.css";
import React, { useState, useEffect } from "react";

interface DataProps {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  actualData: Array<string>;
}

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://my-json-server.typicode.com/DH-Esp-Frontend/ctd-esp-front2-aula6-mesa3-main/posts`
        );
        if (!response.ok) {
          throw new Error(
            `Este es un error HTTP, el estado es: ${response.status}`
          );
        }
        const actualData: string[] = await response.json();
        setData(actualData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Noticias de Rick and Morty</h1>
      {loading && <p>Un momento por favor...</p>}
      {error && (
        <p>{`Hubo un problema al obtener los datos de la publicación: ${error}`}</p>
      )}
      <article>
        {data &&
          data.map(({ id, title, description, image }: DataProps) => (
            <span key={id}>
              <img src={image} alt={title} />
              <h2>{title}</h2>
              <p>{description}</p>
            </span>
          ))}
      </article>
    </div>
  );
};

export default App;

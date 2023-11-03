import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import Layout from "@/components/Layout";
import Drawer from "@/components/Drawer";
import { InputButton } from "@/components/InputButton";
import { Input } from "@/components/Input";
import { Card } from "@/components/Card";
import { getFilmesFavoritos, addMovie, deleteMovieById } from "@/services/movies";


function Favoritos() {
  const [movies, setMovies] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    fetchFilmes();
  }, []);

  const fetchFilmes = async () => {
    try {
      const filmes = await getFilmesFavoritos();
      setMovies(filmes);
    } catch (error) {
      console.error("Erro ao buscar filmes favoritos:", error);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovieById(id);
      // After successful deletion, remove the movie from the state.
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Erro ao deletar o filme", error);
    }
  };

  return (
    <Layout>
      <div className="h-full min-h-screen flex flex-col">
        <div className="flex flex-1">
          <Drawer
            className="md:flex-col"
            isOpen={isDrawerOpen}
            onClose={handleMenuToggle}
          ></Drawer>
          <div className="flex w-full flex-col mx-5 my-10">
            <h1 className="flex font-semibold text-3xl m-10">
              Acompanhe seu filme favorito
            </h1>
            <ul className="flex gap-8 mt-2 flex-col lg:flex-row">
              {movies
                .sort(
                  (a, b) =>
                    new Date(b.dataLancamento) - new Date(a.dataLancamento)
                )
                .slice(0, 5)
                .map((movie) => (
                  <li key={movie.id}>
                    <Card
                      key={movie.id}
                      titulo={movie.titulo}
                      dataLancamento={movie.dataLancamento}
                      srcImage={movie.imagem}
                      id={movie.id}
                      onDelete={() => handleDeleteMovie(movie.id)}
                                        />
                    
                  </li>
                ))}
            </ul>
            <h2 className="flex flex-col font-semibold text-2xl gap-2 w-72 mt-10">Adicione um novo filme</h2>
            <form
              className="flex flex-col gap-2 w-72 mt-6 border rounded p-4"
              onSubmit={(e) => {
                const newMovieData = {
                  title: e.target.title.value,
                 overview: e.target.overview.value,
                 poster_path: e.target.poster_path.value,
                 release_date: e.target.release_date.value,
                };
                addMovie(newMovieData);
                e.target.title.value = "";
                e.target.overview.value = "";
                e.target.poster_path.value="";
                e.target.release_date.value="";
              }}
            >
              <label htmlFor="title" className="block">
                Título do Filme:
              </label>
              <input className="w-full h-8 bg-zinc-700 rounded" name="title" />
              <label  htmlFor="overview" className="block ">
                Sinopse:
              </label>
              <input className="w-full h-8 bg-zinc-700 rounded"  name="overview" />
              <label htmlFor="release_date" className="block">
                Data de Lançamento
              </label>
              <input 
              type="date"
               id="release_date"
               name="release_date"
              className="w-full h-8 bg-zinc-700 rounded" />

              <label htmlFor="poster_path" className="w-full block">
                Link do Poster:
              </label>
              <input
                type="text"
                id="poster_path"
                name="poster_path"
                className="w-full h-8 bg-zinc-700 rounded"
                 ></input>
              <InputButton className="mt-9" type="submit">Enviar</InputButton>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Favoritos;

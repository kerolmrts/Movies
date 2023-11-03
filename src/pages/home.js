"use client";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import Layout from "@/components/Layout";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { getFilmes } from "@/services/movies";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Banner from "@/components/Banner";
import "tailwindcss/tailwind.css";
import Drawer from "@/components/Drawer";
import Bottom from "@/components/Bottom";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState();

  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const fetchFilmes = async () => {
      const dataMovies = await getFilmes();
      setMovies(dataMovies);
    };
    fetchFilmes();
  }, []);

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      if (status === "loading") return;

      if (!session) {
        router.push("/");
      } else {
        setShouldRender(true);
      }
    };

    checkSessionAndRedirect();
  }, [session, status, router]);

  if (!shouldRender) {
    return null;
  }
  return (
    <Layout>
      <div className="h-full flex flex-col">
        <div className="flex flex-1">
          <Drawer
            className="md:flex-col"
            isOpen={isDrawerOpen}
            onClose={handleMenuToggle}
          ></Drawer>

          <main className="flex-1">
            <Banner>
              <h1 className="text-white text-shadow-lg border-4 border-gray-800 p-4 transition-transform hover:scale-105 cursor-pointer">
                Comunidade de cinéfilos
              </h1>
            </Banner>
            <div className="p-6 m-5">
              <h2 className="text-2xl mt-10"> Últimos lançamentos</h2>
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
                      />
                    </li>
                  ))}
              </ul>

              <h2 className="font-semibold text-3xl mt-20">Categorias</h2>
              <h2 className="text-2xl mt-10" id="acao">Ação</h2>
              <div className="relative mt-2">
              <ul className="flex flex-wrap gap-8 mt-2 lg:flex-row border-b border-zinc-600">
              {movies
                    .filter((movie) => movie.categoria.includes(28)) // Ação
                    .map((movie) => (
                      <li key={movie.id} className="flex flex-wrap p-5 -mx-4">
                        <Card
                          key={movie.id}
                          titulo={movie.titulo}
                          dataLancamento={movie.dataLancamento}
                          srcImage={movie.imagem}
                          id={movie.id}
                        />
                      </li>
                    ))}
              </ul>
              </div>
              <h2 className="text-2xl mt-10" id="comedia">Comédia</h2>
              <ul className="flex flex-wrap gap-8 mt-2 lg:flex-row border-b border-zinc-600">
              {movies
                    .filter((movie) => movie.categoria.includes(35)) // Comédia
                    .map((movie) => (
                      <li key={movie.id} className="flex flex-wrap p-5 -mx-4">
                        <Card
                          key={movie.id}
                          titulo={movie.titulo}
                          dataLancamento={movie.dataLancamento}
                          srcImage={movie.imagem}
                          id={movie.id}
                        />
                      </li>
                    ))}
              </ul>
               <h2 className="text-2xl mt-10" id="drama">  Drama </h2>
              <ul className="flex flex-wrap gap-8 mt-2 lg:flex-row border-b  border-zinc-600">
              {movies
                    .filter((movie) => movie.categoria.includes(18)) // Drama
                    .map((movie) => (
                      <li key={movie.id} className="flex flex-wrap p-5 -mx-4">
                        <Card
                          key={movie.id}
                          titulo={movie.titulo}
                          dataLancamento={movie.dataLancamento}
                          srcImage={movie.imagem}
                          id={movie.id}
                        />
                      </li>
                    ))}
              </ul>
             <h2 className="text-2xl mt-10" id="ficcao"> Ficção Científica </h2>
              <ul className="flex flex-wrap gap-8 mt-2 lg:flex-row border-b  border-zinc-600">
                {movies
                  .filter((movie) => movie.categoria.includes(878)) // Ficção científica
                  .map((movie) => (
                    <div key={movie.id} className="flex flex-wrap p-5 -mx-4">
                      <Card
                        key={movie.id}
                        titulo={movie.titulo}
                        dataLancamento={movie.dataLancamento}
                        srcImage={movie.imagem}
                        id={movie.id}
                      />
                    </div>
                  ))}
              </ul>
             
              <h2 className="text-2xl mt-10" id="terror">Terror</h2>
              <ul className="flex flex-wrap gap-8 mt-2 lg:flex-row">
              {movies
                    .filter((movie) => movie.categoria.includes(27)) // Terror
                    .map((movie) => (
                      <li key={movie.id} className="flex flex-wrap p-5 -mx-4">
                        <Card
                          key={movie.id}
                          titulo={movie.titulo}
                          dataLancamento={movie.dataLancamento}
                          srcImage={movie.imagem}
                          id={movie.id}
                        />
                      </li>
                    ))}
              </ul>
            
            </div>
          </main>
        </div>
      </div>
      <Bottom />
      <footer className="flex items-center justify-center w-full h-10 bg-zinc-700">
        <div className=" text-zinc-100/25">
          {" "}
          © 2023 Todos os direitos reservados | Brasil
        </div>
      </footer>
    </Layout>
  );
}

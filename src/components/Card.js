import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";



export function Card({ titulo, srcImage, dataLancamento, id, onDelete }) {
  const router = useRouter();
  return (
    <section>
      <div>
        <Link href={`/details/${id}`} passHref>
          <div className="bg-white bg-opacity-10 rounded items-center gap-3">
            <picture className="w-[350px] h-[450px]">
              <img
                src={srcImage}
                className="w-[350px] h-[450px] object-cover transition-transform hover:scale-105"
                alt="cartaz"
              />
            </picture>
          </div>
        </Link>
        <div>
          {dataLancamento ? (
            <div>
              <span className="items-center font-semibold text-lg">
                {titulo}
              </span>
              <p className="items-center text-zinc-400">
                Lançamento: {dataLancamento}
              </p>
            </div>
          ) : (
            <p className="items-center text-zinc-400">
              Data de Lançamento não disponível
            </p>
          )}
          {router.pathname == "/favoritos" && (
            <button onClick={onDelete}>Delete</button>
          
        )}
        </div>
      </div>
    </section>
  );
}

"use client";
import Layout from "@/components/Layout";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import "tailwindcss/tailwind.css";
import Appbar from "@/components/Appbar";



const LoginPage = () => {
   const { data: session, status } = useSession();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      if (status === "loading") return;

      if (session) {
        router.push("/home");
      } else {
        setShouldRender(true);
      }
    };

    checkSessionAndRedirect();

  }, [session, status, router]);


  if (!shouldRender) {
    return null;
  }

  if (session) {
    return (
      <Layout>
        <Appbar />
        <div className="h-full min-h-screen grid">
          <div className="flex flex-1">
            <div className="flex w-full flex-col mx-5 my-10">
              <h2 className="flex w-full flex-col mx-5 my-10">
                Logado como: {session.user.name}, e-mail: {session.user.email}
              </h2>
              <div className="flex flex-col items-center gap-5">
                <Avatar
                  srcImage={session.user.image}
                  width={200}
                  height={200}
                  alt="User's image"
                />
                <div className="flex gap-2">
                  <Button onClick={() => router.push("/home")}>
                    Completar Cadastro
                  </Button>
                  <Button
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Sign out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
    <Appbar />
    <div className="relative">
      <video
        autoPlay
        loop
        muted
        src="/video_login.mp4"
        type="video/mp4"
        className="w-full h-screen object-cover z-0"
      />

      <div className="absolute inset-0 bg-zinc-700/40 flex flex-col items-center justify-center text-center z-10 text-white">
        <h1 className="text-6xl font-extrabold m-10">
          Junte-se a nós e participe da comunidade de cinéfilos e desvende as maravilhas do mundo do cinema!
        </h1>
        <h2 className="font-extrabold text-2xl mb-8">
          Faça login para acessar o conteúdo:
        </h2>
        <div className="flex gap-5">
        <button className="text-2xl rounded bg-zinc-100/40 p-1 " onClick={() => signIn("google")}>Login</button>
        <button className="text-2xl rounded bg-zinc-100/40 p-1 " onClick={() => signIn("google")}>Criar Conta</button> 
      </div>
      </div>
    </div>
    <Footer />
  </Layout>
);
};
export default LoginPage;

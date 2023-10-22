import React from "react";
import "tailwindcss/tailwind.css"
import Layout from "@/components/Layout";
import Drawer from "@/components/Drawer";
import { useState } from "react";
import { useSession } from 'next-auth/react';
import { Footer } from "@/components/Footer";
import CompleteProfileForm from "@/components/CompleteProfileForm";


function Perfil() {

  const [isDrawerOpen, setIsDrawerOpen] = useState();
  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }
  const {data: session} = useSession();

  return (
    <Layout>
      <div className="h-full min-h-screen flex flex-col">
        <div className="flex flex-1">
        <Drawer className= "md:flex-col" isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
        {session? (
              <div className="flex w-full flex-col  mx-5 my-10">
                   <h2 className="flex w-full flex-col mx-5 my-10">
                 {session.user.name}
              
                </h2>
              <h1 className="flex font-semibold text-3xl m-10">Complete seu cadastro </h1>
                     <div className="flex w-full my-10 items-center justify-center">  
              <CompleteProfileForm user={session.user}/>
                                            
          </div>
          </div>
        ) : (
          
          <h1>Não logado</h1>
        )}
      </div>
    </div>
    <Footer />
  </Layout>
);
}

      
export default Perfil;

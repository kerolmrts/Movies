import React,{useContext, useEffect} from "react";
import { ThemeContext } from '@/contexts/ThemeContext';
import Link from "next/link";
import { FaSearch, FaUserCircle, FaHome} from 'react-icons/fa'



function Bottom({...rest}) {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
         }, [theme])

    return (
        <div
        {...rest}
            className={`fixed bottom-0 left-0 z-50 w-full h-16
            ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}
            border-t border-zinc-200 md:hidden lg:hidden xl:hidden`}
        >
        
        <div className="grid h-full max-w-lg grid-cols-4 mt-2 mx-auto font-medium">
        <Link href="/home">
            <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-50 dark:hover:bg-zinc-800 group">
               <FaSearch/>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-500">Home</span>
            </button>
            </Link>
            <Link href="/buscador">
            <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-50 dark:hover:bg-zinc-800 group">
               <FaSearch/>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-500">Buscador</span>
            </button>
            </Link>
            <Link href="/perfil">
            <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-50 dark:hover:bg-zinc-800 group">
              <FaUserCircle/>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-500">Cadastro</span>
            </button>
            </Link>
        </div>
        </div>
    )
}
export default Bottom;
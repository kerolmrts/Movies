import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from '@/contexts/ThemeContext';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
      <ThemeProvider>
         <SessionProvider session={session}>
       <Component {...pageProps} />
       
       </SessionProvider>
      </ThemeProvider>
  );
}
export default App;
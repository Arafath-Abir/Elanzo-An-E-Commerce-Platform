import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import ScrollToTop from "../common/ScrollToTop";
import { useContext } from "react";
import myContext from "../../context/myContext";

const Layout = ({children}) => {
  const { darkMode } = useContext(myContext);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
        <Navbar />
        <main className="main-content min-h-screen dark:bg-gray-900 dark:text-white transition-colors duration-300">
            {children}
        </main>
        <ScrollToTop />
        <Footer />
    </div>
  )
}

export default Layout;

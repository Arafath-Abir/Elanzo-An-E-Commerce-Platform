import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import ScrollToTop from "../common/ScrollToTop";

const Layout = ({children}) => {
  return (
    <div>
        <Navbar />
        <main className="main-content min-h-screen">
            {children}
        </main>
        <ScrollToTop />
        <Footer />
    </div>
  )
}

export default Layout;

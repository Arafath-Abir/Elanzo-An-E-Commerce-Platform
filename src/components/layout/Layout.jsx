import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Layout = ({children}) => {
  return (
    <div>
        <Navbar />
        <main className="main-content min-h-screen">
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout;

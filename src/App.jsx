import BannerAnuncio from "./components/BannerAnuncio"
import Header from "./components/Header"
import BgCartao from "./components/BgCartao"
import "./input.css"
import Footer from "./components/Footer"
import BtnFuncionalidade from "./components/BtnFuncionalidade"

function App() {



  return (
    <div className="bg-white">
      <Header />
      <BannerAnuncio />
      <BgCartao />
      <BtnFuncionalidade />
      <Footer />
    </div >
  )
}

export default App
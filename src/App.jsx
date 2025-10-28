import "./input.css"

import Header from "./components/Header"
import BannerAnuncio from "./components/BannerAnuncio"
import BgCartao from "./components/BgCartao"
import BtnFuncionalidade from "./components/BtnFuncionalidade"
import Footer from "./components/Footer"

function App() {

  return (
    <div className="bg-white relative">
      <Header />
      <BannerAnuncio />
      <BgCartao />
      <BtnFuncionalidade />
      <Footer />
    </div >
  )
}

export default App
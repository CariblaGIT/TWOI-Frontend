import './App.css'
import { Footer } from './common/Footer/Footer'
import { Header } from './common/Header/Header'
import ScrollToTop from './common/ScrollToTop/ScrollToTop'
import { Body } from './pages/Body/Body'

function App() {

  return (
    <>
      <ScrollToTop/>
      <Header />
      <Body />
      <Footer />
    </>
  )
}

export default App

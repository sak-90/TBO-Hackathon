import "./App.css";
import "./App.scss";
import Header from "./Components/header/header";
import Home from "./Components/Home/Home";
import Middle from "./Components/Middle/Middle";
import Portfolio from "./Components/Portfolio/Portfolio";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Middle />
      <Portfolio />
      <Footer />
    </div>
  );
}

export default App;

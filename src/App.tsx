import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Header } from "./components/Header/";
import { Footer } from "./components/Footer/";

function App() {
  return (
    <div className="EventApp">
      <Header />

      <Footer />
    </div>
  );
}

export default App;

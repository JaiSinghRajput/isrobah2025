import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Visualisedata from "./pages/Visualisedata";

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="data" element={<Visualisedata />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

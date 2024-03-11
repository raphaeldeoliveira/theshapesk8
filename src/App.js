// Import do router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import das páginas
import Home from "./pages/Home";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Error from "./pages/Error";
import Layout from "./components/global/Layout";

function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

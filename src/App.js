// Import do router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import das páginas
import Home from "./pages/Home";
import RegisterAndLogin from "./pages/RegisterAndLogin"
import Product from "./pages/Product";
import Error from "./pages/Error";
import Layout from "./components/global/Layout";
import Search from "./pages/Search"
import User from "./pages/User";

import store from "./redux/store"
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<RegisterAndLogin />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="search/:productname" element={<Search />} />
            <Route path="user" element={<User />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

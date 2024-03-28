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
import Payment from "./pages/Payment";
import Admin from "./pages/Admin"
// rotas aninhadas de user
import Pedidos from "./pages/User/Pedidos";
import UserData from "./pages/User/UserData";
import DeliveryAddress from "./pages/User/DeliveryAddress";
import PaymentMethods from "./pages/User/PaymentMethods";
// rotas aninhadas de admin
import AddProduct from "./pages/Admin/AddProduct";
import AddUser from "./pages/Admin/AddUser";
import ListProducts from "./pages/Admin/ListProducts";
import ListUsers from "./pages/Admin/ListUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<RegisterAndLogin />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="search/:productname?" element={<Search />} />
          <Route path="admin" element={<Admin />} >
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="listProduct" element={<ListProducts />} />
            <Route path="addUser" element={<AddUser />} />
            <Route path="listUser" element={<ListUsers />} />
          </Route>
          <Route path="user" element={<User />}>
            <Route path="pedidos" element={<Pedidos />} />
            <Route path="dados" element={<UserData />} />
            <Route path="enderecos" element={<DeliveryAddress />} />
            <Route path="paymentMethods" element={<PaymentMethods />} />
          </Route>
          <Route path="payment" element={<Payment />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

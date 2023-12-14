import { Routes, Route, Navigate } from "react-router-dom";
import "./scss/App.scss";
import Main from "./pages/Main/Main.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import Favorites from "./pages/Favorites/Favorites.tsx";
import Layout from "./components/Layout/Layout.tsx";
import Special from "./pages/Special/Special.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="cart" element={<Cart />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="special" element={<Special />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;

import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../views/LoginForm";
import BaseLayout from "../views/BaseLayout";
import HomeAdmin from "../views/HomeAdmin";
import PageCategory from "../views/PageCategory";
import PageProduct from "../views/PageProduct";
import Toastify from "toastify-js";
import AddProduct from "../views/AddProduct";
import EditProduct from "../views/EditProduct";
import Register from "../component/FormRegister";
const url = "https://h8-phase2-gc.vercel.app";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "You already logged in",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please Log in first",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomeAdmin url={url} />,
      },
      {
        path: "/add",
        element: <AddProduct url={url} />,
      },
      {
        path: "/edit/:id",
        element: <EditProduct url={url} />,
      },
      {
        path: "/product",
        element: <PageProduct url={url} />,
      },
      {
        path: "/category",
        element: <PageCategory url={url} />,
      },
      {
        path: "/register",
        element: <Register url={url} />,
      },
    ],
  },
]);

export default router;

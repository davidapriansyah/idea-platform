import FormRegister from "../component/FormRegister";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register({ url }) {
  const navigate = useNavigate();

  async function handleSubmit(
    e,
    username,
    email,
    password,
    phoneNumber,
    address
  ) {
    e.preventDefault();
    try {
      const body = { username, email, password, phoneNumber, address };

      const { data } = await axios.post(`${url}/apis/add-user`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigate("/");
      Toastify({
        text: `Success! User ${data.data.email} added.`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: {
          background: "#008000",
        },
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response.data.error || "An error occurred.",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: {
          background: "#FF0000",
        },
      }).showToast();
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <FormRegister handleSubmit={handleSubmit} nameProp="Add User" />
    </div>
  );
}

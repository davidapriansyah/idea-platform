import axios from "axios";
import { useEffect, useState } from "react";
import logoLoading from "../assets/Infinity@1x-1.0s-200px-200px.svg";
import { FaEdit, FaUpload, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Toastify from "toastify-js";

export default function PageProduct({ url }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/apis/branded-things/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setProducts(data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error.response || error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(productId) {
    try {
      const { data } = await axios.delete(
        `${url}/apis/branded-things/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      fetchProducts();
      Toastify({
        text: `Successfully deleted product`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#008000",
        },
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response?.data?.error || "Delete failed",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#FF0000",
        },
      }).showToast();
    }
  }

  async function handleUpload(productId) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.patch(
        `${url}/apis/branded-things/products/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchProducts();
      Toastify({
        text: data.message || "Upload successful",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#008000",
        },
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response?.data?.error || "Upload failed",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#FF0000",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-5">
      {loading ? (
        <div className="flex justify-center items-center">
          <img src={logoLoading} alt="Loading..." className="w-20 h-20" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300 bg-gray-50">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Id</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Image</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Stock</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4 border-b">{product.id}</td>
                  <td className="py-3 px-4 border-b">{product.name}</td>
                  <td className="py-3 px-4 border-b">
                    <img
                      src={product.imgUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md border border-gray-200"
                    />
                  </td>
                  <td className="py-3 px-4 border-b">Rp.{product.price}</td>
                  <td className="py-3 px-4 border-b">{product.stock}</td>
                  <td className="py-3 px-4 border-b flex space-x-2">
                    <Link
                      to={`/edit/${product.id}`}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>
                    <label
                      className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 cursor-pointer"
                      title="Upload"
                    >
                      <input
                        type="file"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                          handleUpload(product.id);
                        }}
                        className="hidden"
                      />
                      <FaUpload />
                    </label>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

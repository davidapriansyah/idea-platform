import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";

export default function FormProduct({ url, product, handleSubmit, nameProp }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `${url}/apis/branded-things/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setCategories(data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setImgUrl(product.imgUrl);
      setPrice(product.price);
      setStock(product.stock);
      setCategoryId(product.categoryId);
    }
  }, [product]);

  return (
    <form
      className="mt-10 p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md space-y-4 border border-gray-200"
      onSubmit={(e) =>
        handleSubmit(e, name, description, price, imgUrl, stock, categoryId)
      }
    >
      <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
        Product Details
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-gray-600">Name</label>
          <input
            type="text"
            placeholder="Product Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium text-gray-600">Description</label>
          <textarea
            placeholder="Product Description"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-gray-600">Price</label>
          <input
            type="number"
            placeholder="Product Price"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block font-medium text-gray-600">Stock</label>
          <input
            type="number"
            placeholder="Available Stock"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </div>
      </div>
      <div>
        <label className="block font-medium text-gray-600">Image URL</label>
        <input
          type="text"
          placeholder="Product Image URL"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-medium text-gray-600">Category</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="text-center mt-4">
        <Button nameProp={nameProp} />
      </div>
    </form>
  );
}

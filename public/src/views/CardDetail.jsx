import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function CardDetail({ url }) {
  const [product, setProduct] = useState("");
  const { id } = useParams();

  async function fetchProduct() {
    try {
      const { data } = await axios.get(
        `${url}/apis/pub/branded-things/products/${id}`
      );
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div
        className="card grid lg:grid-cols-2 	
bg-yellow-200 shadow-xl rounded-lg m-5 hover:shadow-2xl"
      >
        <figure className="flex justify-center items-center p-5">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="object-cover w-500 max-w-sm h-auto rounded-lg"
          />
        </figure>
        <div className="card-body p-6 lg:p-8 flex flex-col justify-between">
          {/* Product Name */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {product.name}
            <span className="text-gray-800 text-lg ml-2">
              | Category: {product.Category?.name}
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-800 mb-4">
            <span className="font-semibold">Description:</span>{" "}
            {product.description}
          </p>

          {/* Price and Stock */}
          <div className="flex flex-wrap justify-between items-center">
            <p className="text-lg font-semibold text-yellow-600">
              Price: Rp.{product.price}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Stock: {product.stock}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

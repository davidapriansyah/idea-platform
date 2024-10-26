import { useNavigate } from "react-router-dom";

export default function Card({ product }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/detail/${id}`);
  }
  return (
    <>
      <div className="card bg-white p-6 border border-gray-200 shadow-lg rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative">
        {/* Image with a hover effect */}
        <figure className="relative overflow-hidden rounded-t-xl">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="w-full h-52 object-cover transition-transform duration-300 hover:scale-110"
          />
        </figure>

        {/* Card Content */}
        <div className="card-body p-5">
          {/* Product Name */}
          <h2 className="card-title text-xl font-bold text-gray-800 mb-2">
            {product.name}
          </h2>

          {/* Product Description */}
          <p className="text-gray-600 text-sm mt-2 mb-4 leading-relaxed line-clamp-3">
            {product.description}
          </p>

          {/* Price and Stock */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-800 font-semibold">
              Price: <span className="text-yellow-500">Rp.{product.price}</span>
            </p>
            <p className="text-gray-500">Stock: {product.stock}</p>
          </div>

          {/* Detail Button */}
          <div className="absolute bottom-5 right-5">
            <button
              className="btn bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => handleClick(product.id)}
            >
              Detail
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

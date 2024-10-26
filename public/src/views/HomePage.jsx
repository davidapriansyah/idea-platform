import { useEffect, useState } from "react";
import Card from "../component/Card";
import axios from "axios";
import LoadingLogo from "../assets/Infinity@1x-1.0s-200px-200px.svg";

export default function HomePage({ url }) {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  async function fetchProducts() {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${url}/apis/pub/branded-things/products?q=${search}&i=${selectedCategory}&limit=10&page=${currentPage}&sort=${sort}`
      );

      setProduct(data.data.query);
      setTotalPage(data.data.pagination.totalPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `https://h8-phase2-gc.vercel.app/apis/pub/branded-things/categories`
      );

      setCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function nextPage() {
    try {
      setLoading(true);
      if (currentPage < totalPage) {
        const nexPage = currentPage + 1;
        setCurrentPage(nexPage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Move to the previous page
  async function previousPage() {
    try {
      setLoading(true);
      if (currentPage > 1) {
        const backPage = currentPage - 1;
        setCurrentPage(backPage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search, selectedCategory, sort, currentPage]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 mb-10">
        <button
          className="btn btn-primary mr-2"
          disabled={currentPage == 1}
          onClick={previousPage}
        >
          Prev
        </button>

        {/* Display current page */}
        <span className="mx-4">
          Page {currentPage} of {totalPage}
        </span>

        <button
          className="btn btn-primary ml-2"
          disabled={currentPage == totalPage}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
      {/* Search, Sort, and Filter Section */}
      <div className="w-full flex justify-center mt-8">
        <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-lg">
          {/* Sort by Order */}
          <select
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            name="order"
            id="order"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Order By</option>
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>

          {/* Search Input */}
          <form action="" className="flex items-center space-x-2">
            <input
              type="text"
              name="search"
              id="search"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
          </form>

          {/* Category Filter */}
          <select
            name="categoryId"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <img src={LoadingLogo} alt="Loading..." className="w-20 h-20" />
        </div>
      ) : (
        <div id="PAGE-HOME" className="mt-10">
          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {/* Product cards */}
            {product.map((product) => {
              return <Card product={product} key={product.id} />;
            })}
          </main>
        </div>
      )}
    </>
  );
}

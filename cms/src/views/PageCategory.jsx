import axios from "axios";
import { useEffect, useState } from "react";
export default function PageCategory({ url }) {
  const [categories, setCategory] = useState([]);
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
      // console.log(data);
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="p-5">
        <div className="overflow-x-auto rounded-2xl">
          <table className="min-w-full bg-white border border-gray-300 shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 text-left">
                  ID
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td
                    colSpan="2"
                    className="py-2 px-4 text-center text-gray-500"
                  >
                    No categories available.
                  </td>
                </tr>
              ) : (
                categories.map((el, index) => (
                  <tr
                    key={el.id}
                    className={`hover:bg-gray-100 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } transition duration-150`}
                  >
                    <td className="py-2 px-4 border-b border-gray-300 text-left">
                      {el.id}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-left">
                      {el.name}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

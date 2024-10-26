export default function Button({ nameProp }) {
  return (
    <button className="w-full mt-5 py-2 px-4 border-2 border-transparent rounded-lg text-sm font-medium text-white bg-blue-500 hover:bg-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
      {nameProp}
    </button>
  );
}

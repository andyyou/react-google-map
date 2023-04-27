const MapButton = ({ children, onClick }) => {
  return (
    <button
      type="button"
      className="px-2 py-1 rounded-full bg-white border-2 border-black font-bold text-sm hover:bg-gray-200 transition duration-300 ease-in-out"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MapButton;

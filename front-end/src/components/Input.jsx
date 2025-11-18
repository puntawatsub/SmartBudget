const Input = ({ className = "", ...props }) => {
  return (
    <input
      {...props}
      className={`w-full focus:outline-none focus:ring-2 focus:ring-blue-500 py-2.5 px-3 border border-gray-300 rounded-[5px] shadow-inner ${className}`}
    />
  );
};

export default Input;

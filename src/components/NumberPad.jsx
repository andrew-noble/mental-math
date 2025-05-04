export default function NumberPad({ handleButtonClick }) {
  return (
    <div className="bg-gray-100 p-2 rounded-lg flex flex-col items-center">
      <div className="p-2 grid grid-cols-3 gap-4 w-max">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."].map((num) => (
          <button
            key={num}
            className="bg-blue-500 text-white font-bold py-3 px-5 text-lg rounded hover:bg-blue-600"
            value={num}
            onClick={(event) => handleButtonClick(event)}
          >
            {num}
          </button>
        ))}
      </div>
      <button
        className="bg-yellow-500 text-white font-bold py-2 px-4 my-1 text-xl rounded hover:bg-yellow-600 "
        value="Backspace"
        onClick={(event) => handleButtonClick(event)}
      >
        Backspace
      </button>
    </div>
  );
}

export default function NumberPad({
  handleButtonClick,
  handleBackspace,
  handleSubmit,
}) {
  return (
    <>
      <div className="p-3 grid grid-cols-3 gap-4 w-max my-3">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <button
            key={num}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => handleButtonClick(i)}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="flex">
        <button
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 m-3"
          onClick={handleBackspace}
        >
          Backspace
        </button>
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 m-3"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
}

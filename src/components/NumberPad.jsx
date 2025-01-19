export default function NumberPad({
  handleButtonClick,
  handleBackspace,
  handleSubmit,
}) {
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <button key={i} onClick={() => handleButtonClick(i)}>
          {i}
        </button>
      ))}
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleBackspace}
      >
        Backspace
      </button>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [array, setArray] = useState([5, 3, 8, 4, 2, 10, 7, 1, 6, 9]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSorted, setIsSorted] = useState(false);
  const [compareIndex, setCompareIndex] = useState(null);
  const [sortedIndex, setSortedIndex] = useState([]);
  const [swapped, setSwapped] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (isSorted) return;

    const timer = setTimeout(() => {
      let newArray = [...array];

      if (compareIndex === null) {
        setCompareIndex(0);
        setSwapped(false);
      } else if (compareIndex < newArray.length - 1 - currentIndex) {
        if (newArray[compareIndex] > newArray[compareIndex + 1]) {
          [newArray[compareIndex], newArray[compareIndex + 1]] = [newArray[compareIndex + 1], newArray[compareIndex]];
          setSwapped(true);
        }
        setCompareIndex(compareIndex + 1);
      } else {
        if (!swapped) {
          setIsSorted(true);
        } else {
          setSortedIndex((prev) => [...prev, newArray.length - 1 - currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setCompareIndex(null);
        }
      }

      setArray(newArray);
    }, 500);

    return () => clearTimeout(timer);
  }, [array, compareIndex, currentIndex, isSorted, swapped]);

  useEffect(() => {
    // new a randomize array
    const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10) + 1);
    setArray(randomArray);
    setCurrentIndex(0);
    setIsSorted(false);
    setCompareIndex(null);
    setSortedIndex([]);
    setSwapped(false);
  }, [reset]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold my-4">Bubble Sort</h1>
        <div className="flex justify-center items-end h-64 mt-4">
          {array.map((value, index) => (
            <div
              key={index}
              className={`w-5 mx-1 transition-all duration-500 relative ${
                sortedIndex.includes(index)
                  ? 'bg-green-500'
                  : index === compareIndex || index === compareIndex + 1
                  ? 'bg-yellow-500'
                  : 'bg-blue-500'
              }`}
              style={{ height: `${value * 20}px` }}
            >
              <span className="absolute bottom-0 left-0 right-0 w-full text-center text-white">{value}</span>
            </div>
          ))}
        </div>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => setReset((prev) => !prev)}
        >Reset</button>
      </div>
    </div>
  );
}

export default App;
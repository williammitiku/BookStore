import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const usernameLocal = localStorage.getItem('user'); 
  console.log(usernameLocal, 'hollaa');

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    navigate('/');
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://bookstoreback-omf3.onrender.com/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-center items-center gap-x-4 mb-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out"
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out"
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-700">Books List</h1>
        <div className="flex gap-x-4 items-center">
          <Link to="/books/create" className="text-sky-800">
            <MdOutlineAddBox className="text-4xl" />
          </Link>
          <span>Welcome, {usernameLocal}!</span>
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;

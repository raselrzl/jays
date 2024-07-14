"use client";

import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/loading-spinner';  // Import the LoadingSpinner component

export default function PopularBurgers() {
  const [burgers, setBurgers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Filter the data to get only the "Popular Burgers" category
        const popularBurgersCategory = data.find(category => category.category === 'Popular Burgers');
        const popularBurgersData = popularBurgersCategory ? popularBurgersCategory.items : [];
        setBurgers(popularBurgersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBurgers();
  }, []);

  if (loading) {
    return <LoadingSpinner />;  // Show the spinner while loading
  }

  if (error) {
    return <div className='text-red-500 text-center'>Error: {error}</div>;  // Show the error message
  }

  return (
    <>
      {burgers.map((burger, index) => (
        <div
          key={index}  // Use index as the key since there's no unique ID
          className='relative bg-gray-200 p-4 text-center rounded-lg hover:bg-white transition-all hover:shadow-2xl hover:shadow-black/25'
        >
          {/* Price Button */}
          <button className='absolute top-2 right-2 md:top-4 md:right-4 bg-primary text-white font-semibold py-1 px-2 md:py-1 md:px-3 shadow-md hover:bg-amber-600'>
            {burger.price}
          </button>

          {/* Burger Image */}
          <img src={burger.src} alt={burger.title} className='mx-auto mb-4' />

          {/* Burger Title */}
          <h4 className='font-semibold text-lg mb-2'>{burger.title}</h4>

          {/* Description */}
          <p className='text-sm text-gray-500 mb-2'>{burger.description}</p>
        </div>
      ))}
    </>
  );
}

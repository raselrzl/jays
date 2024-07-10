import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/loading-spinner';  // Import the LoadingSpinner component
import { menuItems } from '../menuItems/MenuItem.js'; 

export default function Extras() {
  const [extras, setExtras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Filter extras data from menuItems
    const extrasData = menuItems.find(category => category.category === 'Extras')?.items || [];
    setExtras(extrasData);

    // Simulate a loading state
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);  // Short delay for demo purposes
  }, []);

  if (loading) {
    return <LoadingSpinner />;  // Show the spinner while loading
  }

  if (error) {
    return <div className='text-red-500 text-center'>Error: {error}</div>;  // Show the error message
  }

  return (
    <>
      {extras.map((extra, index) => (
        <div
          key={index}  // Use index as the key since there's no unique ID
          className='relative bg-gray-200 p-4 text-center rounded-lg hover:bg-white transition-all hover:shadow-2xl hover:shadow-black/25'
        >
          {/* Price Button */}
          <button className='absolute top-2 right-2 md:top-4 md:right-4 bg-primary text-white font-semibold py-1 px-2 md:py-1 md:px-3 shadow-md hover:bg-amber-600'>
            {extra.price}
          </button>

          {/* Image */}
          <img src={extra.src} alt={extra.title} className='mx-auto mb-4' />

          {/* Title */}
          <h4 className='font-semibold my-2'>{extra.title}</h4>

          {/* Description */}
          <p className='text-sm text-gray-500'>{extra.description}</p>
        </div>
      ))}
    </>
  );
}

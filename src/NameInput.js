import React, { useState, useEffect } from 'react';
import { UserCircleIcon, SendIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NameInputForm = () => {
    const navigate = useNavigate();

  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');

    useEffect(() => {
      let name = localStorage.getItem("name");
  
      setName(name || "")
    },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setGreeting(`Welcome, ${name}!`);
      localStorage.setItem("name", name)
      // Optional: Clear input after showing greeting
      setTimeout(() => {
        navigate("/GamePage")
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-24 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white tracking-wide flex items-center">
            <UserCircleIcon className="mr-3 w-10 h-10" />
            Personal Intro
          </h1>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input 
                type="text" 
                id="nameInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-300 peer"
                placeholder=" "
              />
              <label 
                htmlFor="nameInput" 
                className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all duration-300 
                  peer-placeholder-shown:top-4 
                  peer-placeholder-shown:text-base 
                  peer-focus:-top-2.5 
                  peer-focus:text-sm 
                  peer-focus:text-purple-500"
              >
                Enter Your Name
              </label>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg 
                hover:from-purple-600 hover:to-blue-600 
                transition duration-300 
                transform hover:scale-[1.02] 
                active:scale-[0.98] 
                shadow-lg 
                hover:shadow-xl 
                flex items-center justify-center"
            >
              <SendIcon className="mr-2 w-5 h-5" />
              Continue
            </button>
          </form>
          
          {greeting && (
            <div className="mt-6 text-center">
              <p className="text-xl font-semibold text-gray-700 animate-fade-in">
                {greeting}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NameInputForm;
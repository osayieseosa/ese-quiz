import React from 'react';
import { MoonStar } from 'lucide-react';
import { Link } from "react-router-dom";

const SleepQuizPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-300 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-black rounded-3xl w-full max-w-4xl overflow-hidden relative shadow-2xl">
        {/* Top navigation */}
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center gap-1 text-purple-300">
            <MoonStar size={20} />
            <span className="font-semibold">MRESEOSA</span>
          </div>
          <Link to="/nameInput" className="w-max">
          <button className="bg-purple-400 text-black px-4 py-2 rounded-full text-sm font-medium">
            Take the Quiz
          </button></Link>
        </div>
        
        {/* Main content */}
        <div className="flex flex-col items-center justify-center text-center py-12 px-8 relative">
          {/* Left animal illustration */}
          <div className="absolute left-12 top-0 opacity-20">
            <svg width="150" height="150" viewBox="0 0 100 100" className="text-gray-500">
              <path d="M30,30 Q50,10 70,30 T90,50 T70,70 T30,70 T10,50 T30,30" 
                    fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          
          <p className="text-purple-400 uppercase tracking-wider text-sm mb-4">Computer Science Quiz</p>
          
          <h1 className="text-purple-300 text-5xl md:text-6xl font-light mb-2">
            Unleash Your
          </h1>
          
          <div className="relative">
            <div className="bg-purple-400 px-8 py-3 rounded-full inline-block mb-2">
              <span className="text-black text-3xl md:text-6xl font-medium">Inner Genius!</span>
            </div>
            
            {/* Animal icons */}
            <div className="absolute -right-4 -top-2">
              <div className="flex flex-col gap-1">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs animate-bounce animation" style={{ animationDuration: '3s' }}>
                  🦁
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs animate-bounce animation" style={{ animationDuration: '3s' }}>
                  🐻
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-purple-300 text-5xl md:text-6xl font-light mt-2 mb-6">
            Today!
          </h1>
          
          <p className="text-gray-400 text-sm mb-8">
            Answer some general knowledge computer science questions
          </p>
          
          <Link to="/nameInput" className="w-max"><button className="bg-purple-400 text-black px-8 py-3 rounded-full font-medium" onclick>
            Take the Quiz
          </button></Link>
          
          {/* Right animal illustration */}
          <div className="absolute right-12 bottom-0 opacity-20">
            <svg width="150" height="150" viewBox="0 0 100 100" className="text-gray-500">
              <path d="M30,30 Q50,10 70,30 T90,50 T70,70 T30,70 T10,50 T30,30" 
                    fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(180 50 50)"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepQuizPage;
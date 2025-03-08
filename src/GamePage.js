import React, { useState, useEffect } from 'react'
import spinner from "./wheel.png"
import { Heart } from 'lucide-react'
import { UserCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const questions = [
    {
      question: "How many Bits make one Byte?",
      options: ["16 bits", "32 bits", "64 bits", "8 bits"],
      answer: "8 bits",
      explanation: "4 bits equal to 1 nibble and 8 bits equal to 1 byte.",
    },
    {
      question: "Google is a Browser or a Search Engine?",
      options: ["Browser", "Search Engine", "Both", "Neither"],
      answer: "Search Engine",
      explanation: "Google is primarily a search engine, though it also offers a browser (Chrome).",
    },
    {
      question: "Which is not an Input Device?",
      options: ["BIO Metric Device", "Touch Pad", "Speaker", "Mouse"],
      answer: "Speaker",
      explanation: "A speaker is an output device; it produces sound from electronic signals.",
    },
    {
      question: "EPROM stands for __________.",
      options: ["Electrically Programmable Read Only Memory", "Electrically Programmable Random Only Memory", "Erasable Programmable Random Only Memory", "Erasable Programmable Read Only Memory"],
      answer: "Erasable Programmable Read Only Memory",
      explanation: "EPROM is a type of memory that can be electrically erased and reprogrammed.",
    },
    {
      question: "What was the name of the first computer designed by Charles Babbage?",
      options: ["Analytical Engine", "Difference Engine", "Colossus", "ENIAC"],
      answer: "Difference Engine",
      explanation: "Charles Babbage designed the Difference Engine, an early mechanical computer.",
    },
    {
      question: "Which was the first electronic digital programmable computing device?",
      options: ["Analytical Engine", "Difference Engine", "Colossus", "ENIAC"],
      answer: "Colossus",
      explanation: "Colossus was the first programmable digital electronic computer, used during World War II.",
    },
    {
      question: "EDSAC stands for __________.",
      options: ["Electronic Delay Storage Automatic Calculator", "Electronic Digital Storage Automatic Calculator", "Electronic Data Storage Automatic Calculator", "Electronic Digital Storage Arithmetic Calculator"],
      answer: "Electronic Delay Storage Automatic Calculator",
      explanation: "EDSAC was one of the earliest stored-program computers.",
    },
    {
      question: "What is a computer?",
      options: ["Device that transforms data into information", "Input processor", "Electronic devices", "All of these"],
      answer: "All of these",
      explanation: "A computer is an electronic device that processes data to transform it into information.",
    },
    {
      question: "On the basis of data handling capabilities, which of these are valid types of computers?",
      options: ["Analog Computers", "Digital Computers", "Hybrid Computers", "All of these"],
      answer: "All of these",
      explanation: "Computers can be categorized based on how they handle data: analog, digital, and hybrid.",
    },
    {
      question: "When you purchase a product over a Mobile Phone, the transaction is called?",
      options: ["E-Commerce", "G-Commerce", "M-Commerce", "F-Commerce", ],
      answer: "M-Commerce",
      explanation: "When you purchase a product over a Mobile Phone, the transaction is called M-Commerce. M-commerce, also called 'mobile commerce,' is the getting and selling of things and services using mobile devices like smartphones and tablets.",
    },
    {
      question: "Which is not an operating system?",
      options: ["Windows", "Linux", "Android", "Oracle"],
      answer: "Oracle",
      explanation: "Oracle is a database management system; Windows, Linux, and Android are operating systems.",
    },
    {
      question: "Which of these is a programming language?",
      options: ["Python", "Java", "C++", "All of these"],
      answer: "All of these",
      explanation: "Python, Java, and C++ are all high-level programming languages used for various applications.",
    },
    {
      question: "What does HTTP stand for?",
      options: ["HyperText Transfer Protocol", "HyperText Transport Protocol", "Hyper Transfer Text Protocol", "None of these"],
      answer: "HyperText Transfer Protocol",
      explanation: "HTTP is the protocol used for transferring hypertext requests and information on the internet.",
    },
    {
      question: "Which of the following is used to create web pages?",
      options: ["HTML", "CSS", "JavaScript", "All of these"],
      answer: "All of these",
      explanation: "HTML structures web content, CSS styles it, and JavaScript adds interactivity.",
    },
    {
      question: "What does 'URL' stand for?",
      options: ["Uniform Resource Locator", "Uniform Resource Link", "Universal Resource Locator", "Universal Resource Link"],
      answer: "Uniform Resource Locator",
      explanation: "A URL is the address used to access resources on the internet.",
    },
    {
      question: "Which company developed the Java programming language?",
      options: ["Microsoft", "Sun Microsystems", "Oracle", "IBM"],
      answer: "Sun Microsystems",
      explanation: "Java was developed by Sun Microsystems in the mid-1990s.",
    },
    {
      question: "What does 'RAM' stand for?",
      options: ["Random Access Memory", "Read Access Memory", "Readily Available Memory", "Rapid Access Memory"],
      answer: "Random Access Memory",
      explanation: "RAM is a type of computer memory that can be accessed randomly, allowing quick data retrieval.",
    },
    {
      question: "Which of these is not a valid data type in Java?",
      options: ["int", "float", "double", "decimal"],
      answer: "decimal",
      explanation: "In Java, 'decimal' is not a data type; 'double' is used for decimal numbers.",
    },
    {
      question: "What does 'USB' stand for?",
      options: ["Universal Serial Bus", "Universal Service Bus", "Uniform Serial Bus", "Uniform Service Bus"],
      answer: "Universal Serial Bus",
      explanation: "USB is a standard for connecting peripherals to a computer.",
    },
    {
      question: "Which of these is a database management system?",
      options: ["MySQL", "MongoDB", "Oracle", "All of these"],
      answer: "All of these",
      explanation: "MySQL, MongoDB, and Oracle are all database management systems used for storing and managing data.",
    },
    {
      question: "Which of the following is not a search engine?",
      options: ["Google", "Bing", "Yahoo", "Facebook"],
      answer: "Facebook",
      explanation: "Facebook is a social media platform; Google, Bing, and Yahoo are search engines.",
    },
    {
      question: "What does 'AI' stand for?",
      options: ["Artificial Intelligence", "Automated Interface", "Artificial Interface", "Automated Intelligence"],
      answer: "Artificial Intelligence",
      explanation: "AI refers to the simulation of human intelligence in machines.",
    }
] 

const NUMBER_OF_ROUNDS = 5

const SpinningWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState('')

  const [playerName, setPlayerName] = useState("Player")
  const [points, setPoints] = useState(10)
  const [count, setCount] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [usedIndexes, setUsedIndexes] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null)

  const [revealAnswer, setRevealAnswer] = useState(false)
  
  const navigate = useNavigate()

  useEffect(() => {
    let name = localStorage.getItem("name");

    if(!name){
      navigate("/nameInput")
    }
    setPlayerName(name)
  },[])

  useEffect(() => {
    let parsedIndexes = JSON.parse(localStorage.getItem("usedIndexes"));

    setUsedIndexes(parsedIndexes || [])
  },[])


  const handleReset = () => {
    setSelectedAnswer("")
    localStorage.setItem("name","")
    setCurrentQuestion(null)
    setRevealAnswer(false)

    setTimeout(() => {
      navigate('/nameInput')
    }, 1000)
  }

  const getRandomQuestion = () => {
    if (usedIndexes.length === questions.length) {
      setUsedIndexes([])
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedIndexes.includes(randomIndex));

    setUsedIndexes([...usedIndexes, randomIndex]);
    localStorage.setItem("usedIndexes",JSON.stringify([...usedIndexes, randomIndex]))
    setCurrentQuestion(questions[randomIndex]);
    
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true)
    

    setTimeout(() => {
      setIsSpinning(false)
      getRandomQuestion()
    }, 3000);
  };

  const handleSelectQuestion = (id) => {
    setSelectedAnswer(id)

    if(currentQuestion.options[id] !== currentQuestion.answer){
      setPoints((prevState) => prevState-2)
    }

    setTimeout(() => {
        setRevealAnswer(true)
      }, 2000);
  }


  
  return (
    <>
    {!gameOver?<div>
   { !currentQuestion ? 
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Spin The Wheel</h1>
        
        <div className="relative mb-8">
          {/* Using a placeholder image with similar dimensions */}
            <img
          src={spinner}
          alt="Spinning Wheel"
          className={`rounded-full w-72 h-auto block mx-auto transition-transform ease-out ${
            isSpinning && "animate-spin-fast"
          }`}
          style={{ transformOrigin: "center" }}
        />
          
          {/* Orange pointer at the top */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-2">
            <div className="w-6 h-8 bg-orange-500" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
          </div>
        </div>
        
        <button 
          onClick={handleSpin}
          disabled={isSpinning}
          className={`px-6 py-3 rounded-full font-bold text-white transition-colors ${
            isSpinning 
              ? 'bg-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSpinning ? 'Spinning...' : 'SPIN'}
        </button>
      </div>
    </div>:
     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
     <div className="relative w-full max-w-sm overflow-hidden rounded-3xl shadow-lg">         
         {/* Main content */}
         <div className="bg-purple-500 rounded-2xl h-full pt-1 pb-4">
           {/* Header navigation */}
           <div className="flex justify-between items-center px-4 py-3">
             <div className="text-white text-sm font-medium">Question {count+1}/{NUMBER_OF_ROUNDS}</div>
             <div className="text-white text-sm font-medium flex gap-1 items-center"><span className=''>{points}</span><Heart className="w-3 h-3"/></div>
           </div>
           
           {/* Question */}
           <div className="bg-purple-400 mx-4 mt-2 p-4 rounded-2xl">
             <div className="text-white text-lg font-bold text-center">
               {currentQuestion?.question}
             </div>
           </div>

            {revealAnswer?
            <>
            <div className="bg-slate-50 mx-4 mt-7 px-4 py-6 rounded-2xl">
             <div className="text-neutral-600 text-md font-bold ">
               {currentQuestion?.answer}<br/>
               <p className='text-sm pt-3'>{currentQuestion?.explanation}</p>
             </div></div>
            {count >= (NUMBER_OF_ROUNDS-1)?
            <button className='p-4 mx-4 rounded-2xl mt-7 text-sm font-bold text-slate-50 bg-purple-400' onClick={() => setGameOver(true)}>Finish</button>
            :<button className='p-4 mx-4 rounded-2xl mt-7 text-sm font-bold text-slate-50 bg-purple-400' onClick={() => {
            setRevealAnswer(false)
            setSelectedAnswer('')
            setCurrentQuestion(null)
            setCount((prevState) => prevState+1)
            }}>Next question</button>}
            </>
            
           :
                       <div>
                       {/* Progress bar */}
            <div className="mx-4 mt-4">
                        <div className="flex justify-between text-white text-xs mb-1">
                        <div>Time</div>
                        <div>01:22</div>
                        </div>
                        <div className="bg-purple-400/50 h-2 rounded-full">
                        <div className="bg-yellow-400 h-2 rounded-full w-2/3"></div>
                        </div>
                    </div>
                    
            {/* Answer choices */}
            <div className="mx-4 mt-6 space-y-3">
                { currentQuestion?.options?.map((answer,id) => {
                return(
                <button 
                    key={id}
                    onClick={() => handleSelectQuestion(id)}
                    className={`flex items-center w-full p-3 rounded-xl 
                    ${
                        selectedAnswer === id && currentQuestion?.answer === answer ? 'bg-green-500' : selectedAnswer === id && currentQuestion?.answer !== answer? 'bg-red-500': 'bg-white'
                    }`}
                >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${selectedAnswer === id && currentQuestion?.answer === answer ? 'bg-white text-green-500' : selectedAnswer === id && currentQuestion?.answer !== answer? 'bg-white text-red-500': 'bg-purple-100 text-purple-500'
                    }`}>
                    {id+1}
                    </div>
                    <div className={`${selectedAnswer === id ? 'text-white' : 'text-gray-800'}`}>
                    {answer}
                    </div>
                </button>
                )
                
                })}
            </div>
           </div>
            } 
         </div>
     </div>
    </div> }
</div>:
<div className="flex justify-center items-center min-h-screen bg-gray-100">
     <div className="relative w-full max-w-sm overflow-hidden rounded-3xl shadow-lg">         
         <div className="bg-purple-500 rounded-2xl h-full ">
          <p className='ml-4 text-sm py-3 text-slate-100'>Correct Answer: {points/2}/{NUMBER_OF_ROUNDS}</p>
            <div className="bg-slate-50 px-4 py-6 rounded-2xl">
             <div className="text-neutral-600 text-md flex flex-col items-center ">
              <div className='w-64 text-center space-y-3'>
                <UserCircle className='w-24 h-24 mx-auto'/>
              <h2 className='text-md font-bold pt-3'>Conratulations {playerName}!!, you've completed this quiz,</h2>
              <p className='text-sm'>Let's keep testing your knowledge by playing again</p>
              </div>
               <button className='p-4 mx-4 rounded-2xl mt-7 text-sm font-bold text-slate-50 bg-purple-400 w-full' onClick={() => handleReset()}>Play Again</button>
             </div></div>
            
         </div>
     </div>
   </div>}</>
  );
};

export default SpinningWheel;
import { useState, useCallback, useEffect } from 'react';
import React from 'react'
import ParticlesBg from 'particles-bg';
import 'tachyons';
import Navbar1 from '../components/dropdown';
import Button from 'react-bootstrap/Button';
import { evaluate } from 'mathjs';
import { FaHistory, FaMoon, FaSun, FaCopy, FaCalculator, FaTrash, FaMemory } from 'react-icons/fa';

const App = () => {
  const [screenContent, setScreenContent] = useState('');
  const [answer, setAnswer] = useState('');
  const [theme, setTheme] = useState('original');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [memory, setMemory] = useState(0);
  const [isScientific, setIsScientific] = useState(false);
  const [showMemoryIndicator, setShowMemoryIndicator] = useState(false);

  const ops = ['%', '/', '*', '-', '+', '.'];
  
  const handleTheme = useCallback((data) => {
    setTheme(data);
  }, []);

  const appendNumber = useCallback((value) => {
    setScreenContent(prev => {
      if (prev === '' || !ops.includes(prev.slice(-1))) {
        return prev + value;
      }
      return prev + value;
    });
  }, []);

  const appendOperator = useCallback((value) => {
    setScreenContent(prev => {
      if (prev === '' || ops.includes(prev.slice(-1))) {
        return prev;
      }
      return prev + value;
    });
  }, []);

  const handleBracket = useCallback((value) => {
    setScreenContent(prev => {
      if (value === '(' && (prev === '' || ops.includes(prev.slice(-1)))) {
        return prev + value;
      }
      if (value === '(' && !ops.includes(prev.slice(-1))) {
        return prev + '*' + value;
      }
      if (value === ')' && prev !== '' && prev.slice(-1) !== '(') {
        return prev + value;
      }
      return prev;
    });
  }, []);

  const calculateResult = useCallback(() => {
    try {
      if (!screenContent) return;
      const result = evaluate(screenContent);
      const formattedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(4));
      setAnswer(formattedResult);
      setHistory(prev => [{
        expression: screenContent,
        result: formattedResult,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev].slice(0, 10));
    } catch (error) {
      setAnswer('Error');
    }
  }, [screenContent]);

  const clearCalculator = useCallback(() => {
    setScreenContent('');
    setAnswer('');
  }, []);

  const handleKeyPress = useCallback((event) => {
    const { key } = event;
    
    if (/[0-9]/.test(key)) {
      appendNumber(key);
    } else if (ops.includes(key)) {
      appendOperator(key);
    } else if (key === '(' || key === ')') {
      handleBracket(key);
    } else if (key === 'Enter' || key === '=') {
      calculateResult();
    } else if (key === 'Escape') {
      clearCalculator();
    }
  }, [appendNumber, appendOperator, handleBracket, calculateResult, clearCalculator]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleMemory = (operation) => {
    switch (operation) {
      case 'M+':
        setMemory(m => m + (Number(answer) || 0));
        setShowMemoryIndicator(true);
        break;
      case 'M-':
        setMemory(m => m - (Number(answer) || 0));
        setShowMemoryIndicator(true);
        break;
      case 'MR':
        if (memory) appendNumber(memory.toString());
        break;
      case 'MC':
        setMemory(0);
        setShowMemoryIndicator(false);
        break;
      default:
        break;
    }
  };

  const handleScientific = (operation) => {
    try {
      let result;
      const value = evaluate(screenContent || '0');
      switch (operation) {
        case 'sin':
          result = Math.sin(value);
          break;
        case 'cos':
          result = Math.cos(value);
          break;
        case 'tan':
          result = Math.tan(value);
          break;
        case 'sqrt':
          result = Math.sqrt(value);
          break;
        case 'log':
          result = Math.log10(value);
          break;
        case 'ln':
          result = Math.log(value);
          break;
        case 'x²':
          result = Math.pow(value, 2);
          break;
        case 'x³':
          result = Math.pow(value, 3);
          break;
        default:
          return;
      }
      const formattedResult = parseFloat(result.toFixed(4));
      setAnswer(formattedResult);
      setHistory(prev => [{
        expression: `${operation}(${screenContent || '0'})`,
        result: formattedResult,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev].slice(0, 10));
    } catch (error) {
      setAnswer('Error');
    }
  };

  const copyToClipboard = async () => {
    if (answer) {
      try {
        await navigator.clipboard.writeText(answer.toString());
        // You could add a toast notification here
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const getParticleConfig = useCallback((currentTheme) => {
    const baseConfig = {
      bg: true,
      num: 50,
      color: isDarkMode ? '#ffffff' : '#000000'
    };

    switch (currentTheme) {
      case 'circle':
        return {
          type: currentTheme,
          bg: true,
          position: "absolute",
          color: isDarkMode ? '#4da3ff' : '#000000',
          num: 15,
          size: {
            value: 20,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 10,
              sync: false
            }
          },
          move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce"
          },
          opacity: {
            value: 0.8,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.4,
              sync: false
            }
          }
        };
      case 'cobweb':
        return {
          type: currentTheme,
          bg: true,
          num: 150,
          position: "absolute",
          color: isDarkMode ? '#4da3ff' : '#000000',
          radius: 5,
          line_linked: {
            enable: true,
            distance: 120,
            color: isDarkMode ? '#4da3ff' : '#000000',
            opacity: 1,
            width: isDarkMode ? 1.5 : 1,
            shadow: {
              enable: true,
              color: isDarkMode ? '#4da3ff' : '#000000',
              blur: 5
            }
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce"
          },
          size: {
            value: 4,
            random: true
          },
          opacity: {
            value: 0.9,
            random: false,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.5,
              sync: false
            }
          }
        };
      default:
        return {
          ...baseConfig,
          type: currentTheme
        };
    }
  }, [isDarkMode]);

  return (
    <div className={`calculator-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navbar1 themedata={handleTheme} />
      <div className='calculator-wrapper'>
        <div className="mode-toggles">
          <Button variant="link" onClick={() => setIsDarkMode(prev => !prev)} title="Toggle Dark Mode">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </Button>
          <Button variant="link" onClick={() => setShowHistory(prev => !prev)} title="Show History">
            <FaHistory />
          </Button>
          <Button variant="link" onClick={() => setIsScientific(prev => !prev)} title="Toggle Scientific Mode">
            <FaCalculator /> {isScientific ? 'Basic' : 'Scientific'}
          </Button>
          {showMemoryIndicator && (
            <span className="memory-indicator" title="Memory Active">
              <FaMemory />
            </span>
          )}
        </div>

        <div className="screen">
          <div className="expression">{screenContent || '0'}</div>
          <div className="result">
            {answer || '0'}
            {answer && (
              <Button variant="link" className="copy-button" onClick={copyToClipboard} title="Copy Result">
                <FaCopy />
              </Button>
            )}
          </div>
        </div>

        {showHistory && (
          <div className="history-panel">
            <div className="history-header">
              <h4>History</h4>
              <Button variant="link" onClick={() => setHistory([])} title="Clear History">
                <FaTrash />
              </Button>
            </div>
            {history.map((item, index) => (
              <div key={index} className="history-item" onClick={() => appendNumber(item.result.toString())}>
                <div className="history-expression">{item.expression} =</div>
                <div className="history-result">{item.result}</div>
                <div className="history-timestamp">{item.timestamp}</div>
              </div>
            ))}
            {history.length === 0 && (
              <div className="history-empty">No calculations yet</div>
            )}
          </div>
        )}

        <div className='button-grid'>
          <Button variant="dark" onClick={clearCalculator}>C</Button>
          <Button variant="dark" onClick={() => handleBracket('(')}>(</Button>
          <Button variant="dark" onClick={() => handleBracket(')')}>)</Button>
          <Button variant="dark" onClick={() => appendOperator('/')}>/</Button>
          
          <Button variant="dark" onClick={() => appendNumber('7')}>7</Button>
          <Button variant="dark" onClick={() => appendNumber('8')}>8</Button>
          <Button variant="dark" onClick={() => appendNumber('9')}>9</Button>
          <Button variant="dark" onClick={() => appendOperator('*')}>×</Button>
          
          <Button variant="dark" onClick={() => appendNumber('4')}>4</Button>
          <Button variant="dark" onClick={() => appendNumber('5')}>5</Button>
          <Button variant="dark" onClick={() => appendNumber('6')}>6</Button>
          <Button variant="dark" onClick={() => appendOperator('-')}>−</Button>
          
          <Button variant="dark" onClick={() => appendNumber('1')}>1</Button>
          <Button variant="dark" onClick={() => appendNumber('2')}>2</Button>
          <Button variant="dark" onClick={() => appendNumber('3')}>3</Button>
          <Button variant="dark" onClick={() => appendOperator('+')}>+</Button>
          
          <Button variant="dark" onClick={() => appendNumber('0')}>0</Button>
          <Button variant="dark" onClick={() => appendOperator('.')}>.</Button>
          <Button variant="dark" onClick={() => answer && appendNumber(answer)}>Ans</Button>
          <Button variant="dark" className="equals-btn" onClick={calculateResult}>=</Button>
        </div>

        <div className="memory-buttons">
          <Button variant="secondary" onClick={() => handleMemory('MC')} title="Memory Clear">MC</Button>
          <Button variant="secondary" onClick={() => handleMemory('MR')} title="Memory Recall">MR</Button>
          <Button variant="secondary" onClick={() => handleMemory('M-')} title="Memory Subtract">M−</Button>
          <Button variant="secondary" onClick={() => handleMemory('M+')} title="Memory Add">M+</Button>
        </div>

        {isScientific && (
          <div className="scientific-buttons">
            <Button variant="info" onClick={() => handleScientific('sin')}>sin</Button>
            <Button variant="info" onClick={() => handleScientific('cos')}>cos</Button>
            <Button variant="info" onClick={() => handleScientific('tan')}>tan</Button>
            <Button variant="info" onClick={() => handleScientific('sqrt')}>√</Button>
            <Button variant="info" onClick={() => handleScientific('log')}>log</Button>
            <Button variant="info" onClick={() => handleScientific('ln')}>ln</Button>
            <Button variant="info" onClick={() => handleScientific('x²')}>x²</Button>
            <Button variant="info" onClick={() => handleScientific('x³')}>x³</Button>
            <Button variant="info" onClick={() => Math.PI}>π</Button>
          </div>
        )}
      </div>
      <ParticlesBg {...getParticleConfig(theme)} />
    </div>
  );
};

export default App;
import { useState } from 'react';
import React from 'react'
import ParticlesBg from 'particles-bg';
import 'tachyons';
import Navbar1 from '../components/dropdown';
import Button from 'react-bootstrap/esm/Button';

const App = () => {
  let [screenContent, setScreenContent] = useState('');
  let [answer, setanswer] = useState();
  let [theme, settheme] = useState('original');

  const themedata = (data)=>{settheme(data)};

  const ops =['%','/','*','-','+','.'];

  const bracketopen = value =>{ 
    if (screenContent === '' || ops.includes(screenContent.toString().slice(-1))){return(value);} 
     return('*'+value)
  }

  const bracketclose = value =>{ 
    if (screenContent === '' || screenContent.toString().slice(-1) !== ')'){return(value);} 
     return('*'+value)
  }

  const operator = value =>{ 
    if (screenContent ==='' || ops.includes(screenContent.toString().slice(-1))){return("");} 
     return(value)
  }

  const calculate = expr => {
    try {
      const fn = new Function(`return ${expr}`);
      return fn();
    } catch (error) {
      return 'Error';
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "="){setanswer(calculate(screenContent))}
    if (event.key === "0"){setScreenContent(screenContent+bracketclose('0'))}
    if (event.key === "1"){setScreenContent(screenContent+bracketclose('1'))}
    if (event.key === "2"){setScreenContent(screenContent+bracketclose('2'))}
    if (event.key === "3"){setScreenContent(screenContent+bracketclose('3'))}
    if (event.key === "4"){setScreenContent(screenContent+bracketclose('4'))}
    if (event.key === "5"){setScreenContent(screenContent+bracketclose('5'))}
    if (event.key === "6"){setScreenContent(screenContent+bracketclose('6'))}
    if (event.key === "7"){setScreenContent(screenContent+bracketclose('7'))}
    if (event.key === "8"){setScreenContent(screenContent+bracketclose('8'))}
    if (event.key === "9"){setScreenContent(screenContent+bracketclose('9'))}
    if (event.key === "+"){setScreenContent(screenContent+operator('+'))}
    if (event.key === "-"){setScreenContent(screenContent+operator('-'))}
    if (event.key === "*"){setScreenContent(screenContent+operator('*'))}
    if (event.key === "/"){setScreenContent(screenContent+operator('/'))}
    if (event.key === "("){setScreenContent(screenContent+bracketopen('('))}
    if (event.key === ")"){setScreenContent(screenContent+operator(')'))}
  };

  return(
    <div onKeyDown={handleKeyPress}>
      <Navbar1 themedata={themedata} />
      <div className='h1 tc ml7'>
      <div className="screen tr bg-light-green bw4 ma3 ml1 mr7 pa5 br4 bBlack">{screenContent}<br/>{answer}</div>
      <div className='container tc'>
      <div className='row tc'>
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent('')}} onDoubleClick={() => {setanswer()}}>Clear</Button>{' '}
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+bracketopen('('))}}>{'('}</Button>{' '}
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+operator(')'))}}>{')'}</Button>{' '}
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+operator('/'))}}>/</Button>{' '}
      </div>
      <div className='row tc'>
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+bracketclose('7'))}}>7</Button>{' '}
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+bracketclose('8'))}}>8</Button>{' '}
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+bracketclose('9'))}}>9</Button>{' '}
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+operator('*'))}}>*</Button>{' '}
      </div>
      <div className='row tc'>
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+bracketclose('4'))}}>4</Button>{' '}
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+bracketclose('5'))}}>5</Button>{' '}
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+bracketclose('6'))}}>6</Button>{' '}
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+operator('-'))}}>-</Button>{' '}
      </div>
      <div className='row tc'>
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+bracketclose('1'))}}>1</Button>{' '}
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+bracketclose('2'))}}>2</Button>{' '}
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+bracketclose('3'))}}>3</Button>{' '}
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+operator('+'))}}>+</Button>{' '}
      </div>
      <div className='row tc'>
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+bracketclose('0'))}}>0</Button>{' '}
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+operator('.'))}}>.</Button>{' '}
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setScreenContent(screenContent+bracketclose(answer))}}>Answer</Button>{' '}
      <Button variant="dark" className='col-2 ma3' onClick={()=>{setanswer(calculate(screenContent))}}>=</Button>{' '}
      </div>
      </div>
      </div>
      <ParticlesBg type={theme} bg={true} />
    </div>
  )
}

export default App;
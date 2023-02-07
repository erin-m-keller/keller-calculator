import React from "react";
import logo from './assets/images/logo.svg';
import './assets/css/styles.css';

class App extends React.Component {
  /* initialize */
  constructor(props) {
    super();
    /* default state */
    this.state = {
      userInput: '',
      result: '',
      calculatorBtns: ['1','2','3','+','4','5','6','*','7','8','9','-','0','/','.','=']
    }
    /* bind the methods */
    this.btnClick = this.btnClick.bind(this);
    this.allClearClick = this.allClearClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
  }

  /* reset the calculator */
  allClearClick(event) {
    this.setState({ 
      userInput: '', 
      result: '' 
    });
  }

  /* delete the last value that was input */
  deleteClick(event) {
    var val1 = this.state.userInput;
    var val2 = this.state.result;
    val1 = val1.substr(0,val1.length-1);
    if (val2) {
      this.setState({
        result: ""
      });
    } else {
      this.setState({
        userInput: val1
      });
    }
  }
  
  /* handles the button functionality of 
   * the calculator - aside from DEL and AC 
   */
  btnClick(event) {
    const value = event.currentTarget.value;
    if (value === "=") {
      /* evaluate the numbers string and update the result in state */
      if (this.state.userInput !== '') {
        var calculation ='';
        try {
          calculation = eval(this.state.userInput);
          if (calculation === undefined) {
            this.setState({result: "Err"});
          } else {
            this.setState({ 
              result: calculation, 
              userInput: ''
            });
          }
        } catch(err) {
          this.setState({result: "Err"});
        }
      }
    } else {
      /* update the result in state */
      this.setState({ userInput: this.state.userInput += value})
    }
  }
  
  render() {
    const { userInput, result, calculatorBtns } = this.state;
    return (
      <div className="body">
        <header className="main-header">
          <img src={logo} className="logo" alt="logo" />
          <h1><strong>React Powered</strong>&nbsp;Calculator</h1>
        </header>
        <main>
          <div className="calculator">
            <div className="display-panel">
              <div className="user-input">{userInput}</div>
              <div className="result">{result}</div>
            </div>
            <button onClick={e => this.deleteClick(e)} className="pushable span-two" value="DEL"><span className="front">DEL</span></button>
            <button onClick={e => this.allClearClick(e)} className="pushable span-two" value="AC"><span className="front">AC</span></button>
            {
              /* loop through and display each calculator button */
              calculatorBtns.map((btnVal,idx) => ( 
                <button onClick={e => this.btnClick(e)} 
                        key={idx} 
                        value={btnVal}
                        className={`pushable ${btnVal === "=" ? "span-four" : ""} ${btnVal === "0" ? "span-two" : ""}`}><span className="front">{btnVal}</span></button>
              ))
            }
          </div>
        </main>
        <footer>
          <h2>&copy; 2023 <a href="https://erin-m-keller.github.io/keller-portfolio/" target="_blank" rel="noreferrer">Erin Keller</a></h2>
        </footer>
      </div>
    );
  }
}

export default App;

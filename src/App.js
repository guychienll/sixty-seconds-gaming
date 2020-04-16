import React from "react";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let multiplicand = Math.floor(Math.random() * 10);
    let multiplier = Math.floor(Math.random() * 10);
    let answer;
    let operator;
    switch (Math.floor(Math.random() * 4 + 1)) {
      case 1:
        operator = "+";
        answer = Function(`return ${multiplicand} ${operator} ${multiplier}`)();
        break;
      case 2:
        operator = "-";
        answer = Function(`return ${multiplicand} ${operator} ${multiplier}`)();
        break;
      case 3:
        operator = "×";
        answer = Function(`return ${multiplicand} * ${multiplier}`)();
        break;
      case 4:
        operator = "÷";
        answer = Function(`return ${multiplicand} / ${multiplier}`)().toFixed(
          2
        );
        break;
      default:
    }

    this.state = {
      page: "page1",
      timer: 60,
      formula: {
        multiplicand: multiplicand,
        multiplier: multiplier,
        operator: operator,
        answer: answer,
      },
      score: 0,
    };

    this.startHandler = this.startHandler.bind(this);
    this.againHandler = this.againHandler.bind(this);
    this.enterHandler = this.enterHandler.bind(this);
    this.animationHandler = this.animationHandler.bind(this);
  }
  startHandler() {
    this.setState({
      page: "page2",
    });

    let intervalID = window.setInterval(() => {
      if (this.state.timer !== 0) {
        const now = this.state.timer - 1;
        this.setState({
          timer: now,
        });
      } else {
        this.setState({
          page: "page3",
        });
        window.clearInterval(intervalID);
      }
    }, 1000);
  }
  againHandler() {
    this.setState({
      page: "page2",
      timer: 60,
      score: 0,
    });
    let intervalID = window.setInterval(() => {
      if (this.state.timer !== 0) {
        const now = this.state.timer - 1;
        this.setState({
          timer: now,
        });
      } else {
        this.setState({
          page: "page3",
        });
        window.clearInterval(intervalID);
      }
    }, 1000);
  }
  enterHandler(e) {
    if (e.key === "Enter") {
      if (this.state.formula.answer == e.target.value) {
        document.querySelector(".answer").classList.add("correct");
        if (this.state.timer >= 40) {
          let multiplicand = Math.floor(Math.random() * 10);
          let multiplier = Math.floor(Math.random() * 10);
          let answer;
          let operator;
          switch (Math.floor(Math.random() * 4 + 1)) {
            case 1:
              operator = "+";
              answer = Function(
                `return ${multiplicand} ${operator} ${multiplier}`
              )();
              break;
            case 2:
              operator = "-";
              answer = Function(
                `return ${multiplicand} ${operator} ${multiplier}`
              )();
              break;
            case 3:
              operator = "×";
              answer = Function(`return ${multiplicand} * ${multiplier}`)();
              break;
            case 4:
              operator = "÷";
              answer = Function(
                `return ${multiplicand} / ${multiplier}`
              )().toFixed(2);
              break;
            default:
          }

          let score = this.state.score;
          score++;
          this.setState({
            formula: {
              multiplicand: multiplicand,
              multiplier: multiplier,
              operator: operator,
              answer: answer,
            },
            score: score,
          });
          e.target.value = "";
        } else if (this.state.timer < 40 && this.state.timer >= 20) {
          let multiplicand = Math.floor(Math.random() * 100);
          let multiplier = Math.floor(Math.random() * 100);
          let answer;
          let operator;
          switch (Math.floor(Math.random() * 4 + 1)) {
            case 1:
              operator = "+";
              answer = Function(
                `return ${multiplicand} ${operator} ${multiplier}`
              )();
              break;
            case 2:
              operator = "-";
              answer = Function(
                `return ${multiplicand} ${operator} ${multiplier}`
              )();
              break;
            case 3:
              operator = "×";
              answer = Function(`return ${multiplicand} * ${multiplier}`)();
              break;
            case 4:
              operator = "÷";
              answer = Function(
                `return ${multiplicand} / ${multiplier}`
              )().toFixed(2);
              break;
            default:
          }

          let score = this.state.score;
          score++;
          this.setState({
            formula: {
              multiplicand: multiplicand,
              multiplier: multiplier,
              operator: operator,
              answer: answer,
            },
            score: score,
          });
          e.target.value = "";
        } else {
          let multiplicand = Math.floor(Math.random() * 1000);
          let multiplier = Math.floor(Math.random() * 1000);
          let answer;
          let operator;
          switch (Math.floor(Math.random() * 4 + 1)) {
            case 1:
              operator = "+";
              answer = Function(
                `return ${multiplicand} ${operator} ${multiplier}`
              )();
              break;
            case 2:
              operator = "-";
              answer = Function(
                `return ${multiplicand} ${operator} ${multiplier}`
              )();
              break;
            case 3:
              operator = "×";
              answer = Function(`return ${multiplicand} * ${multiplier}`)();
              break;
            case 4:
              operator = "÷";
              answer = Function(
                `return ${multiplicand} / ${multiplier}`
              )().toFixed(2);
              break;
            default:
          }
          let score = this.state.score;
          score += 5;
          this.setState({
            formula: {
              multiplicand: multiplicand,
              multiplier: multiplier,
              operator: operator,
              answer: answer,
            },
            score: score,
          });
          e.target.value = "";
        }
      } else {
        let score = this.state.score;
        if (score > 0) {
          score--;
        }
        this.setState({
          score: score,
        });
        document.querySelector(".answer").classList.add("error");
      }
    }
  }
  animationHandler() {
    document.querySelector(".answer").classList.remove("error");
    document.querySelector(".answer").classList.remove("correct");
  }
  getPageComponent() {
    switch (this.state.page) {
      case "page1":
        return <StartView startHandler={this.startHandler} />;
      case "page2":
        return (
          <MainView
            timer={this.state.timer}
            enterHandler={this.enterHandler}
            animationHandler={this.animationHandler}
            formula={this.state.formula}
            score={this.state.score}
          />
        );
      case "page3":
        return (
          <RestartView
            againHandler={this.againHandler}
            score={this.state.score}
          />
        );
      default:
        break;
    }
  }
  render() {
    return <div className="container">{this.getPageComponent()}</div>;
  }
}

class StartView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="startBox">
        <div className="titleBox">
          <div className="titleNumber">60</div>
          <div className="titleText">SECONDS CHALLENGE</div>
        </div>
        <div className="buttonBox">
          <button className="start" onClick={this.props.startHandler}>
            START!
          </button>
          <div className="content">try to answer more as you can</div>
        </div>
      </div>
    );
  }
}

class MainView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let timer;
    if (this.props.timer % 60 === 0) {
      timer = `0${this.props.timer / 60}:00`;
    } else if (this.props.timer >= 10) {
      timer = `00:${this.props.timer}`;
    } else {
      timer = `00:0${this.props.timer}`;
    }
    let score;
    if (this.props.score < 10) {
      score = `00${this.props.score}`;
    } else if (this.props.score >= 10 && this.props.score < 100) {
      score = `0${this.props.score}`;
    } else {
      score = `${this.props.score}`;
    }

    return (
      <div className="mainBox">
        <div className="mainHeader">
          <div className="mainScoreBox">
            <div className="mainScoreBoxTitle">60 SECONDS CHALLENGE</div>
            <div className="mainScoreBoxScore">{score}</div>
          </div>
          <div className="timer">{timer}</div>
        </div>
        <div className="mainFooter">
          <div className="formula">{`${this.props.formula.multiplicand} ${this.props.formula.operator} ${this.props.formula.multiplier} =`}</div>
          <div className="answerBox">
            <input
              type="text"
              className="answer"
              onKeyUp={this.props.enterHandler}
              onAnimationEnd={this.props.animationHandler}
            />
            <div className="answerContent">press enter to answer</div>
          </div>
        </div>
      </div>
    );
  }
}

class RestartView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="restartBox">
        <div className="restartHeader">
          <div className="restartTitle">60 SECONDS CHALLENGE</div>
          <div className="restartFinalScore">YOUR FINAL SCORE</div>
          <div className="finalScore">{this.props.score}</div>
        </div>
        <div className="restartFooter">
          <button className="again" onClick={this.props.againHandler}>
            TRY AGAIN!
          </button>
        </div>
      </div>
    );
  }
}

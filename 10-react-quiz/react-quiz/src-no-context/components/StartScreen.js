function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>Number of questions to test your React mastery:</h3>
      <div className="choose-number">
        <button className="btn" onClick={() => dispatch({ type: 'decrease' })}>
          -
        </button>
        <input className="quest-number" value={numQuestions} />
        <button className="btn" onClick={() => dispatch({ type: 'increase' })}>
          +
        </button>
      </div>
      <div>
        <button className="btn btn-ui" onClick={() => dispatch({ type: 'start' })}>
          Let's start
        </button>
      </div>
    </div>
  );
}

export default StartScreen;

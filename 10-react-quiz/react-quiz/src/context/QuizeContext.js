import { createContext, useContext, useReducer, useEffect } from 'react';

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  totalQuestions: [],
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  numQuestions: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      const totalQuestions = action.payload;
      const numQuestions = totalQuestions.length;
      return { ...state, totalQuestions, questions: totalQuestions, status: 'ready', numQuestions };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.numQuestions * SECS_PER_QUESTION,
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption ? state.points + question.points : state.points,
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore ? state.points : state.highscore,
      };
    case 'restart':
      return {
        ...initialState,
        status: 'ready',
        totalQuestions: state.totalQuestions,
        questions: state.totalQuestions,
        numQuestions: state.totalQuestions.length,
      };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };
    case 'increase':
      const numQuesIncr = Math.min(state.numQuestions + 1, state.totalQuestions.length);
      return {
        ...state,
        numQuestions: numQuesIncr,
        questions: state.questions.slice(0, numQuesIncr),
      };
    case 'decrease':
      const numQuesDecr = Math.max(state.numQuestions - 1, 1);

      return {
        ...state,
        numQuestions: numQuesDecr,
        questions: state.questions.slice(0, numQuesDecr),
      };
    default:
      throw new Error('Action is unknown');
  }
}

function QuizProvider({ children }) {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error('QuizContext was used outside of the QuizProvider');
  return context;
}

export { QuizProvider, useQuiz };

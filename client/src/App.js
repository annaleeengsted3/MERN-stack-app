import {useEffect, useState} from "react";
import { Router } from "@reach/router";
import Questions from "./Questions"
import Question from "./Question"


const API_URL = process.env.REACT_APP_API;

function App() {
  const url = `${API_URL}/questions`
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setQuestions(data);
    };
    fetchData();
  }, []); 

  function getQuestion(id){
    return questions.find(question => question._id == id)
    }

   


  return (
    <>
      <h1>Deddit</h1>
      
      <Router>
      <Questions path="/" questions={questions} url={url} getQuestion={getQuestion} setQuestions={setQuestions}>
        
      </Questions>
      <Question path="/:_id" getQuestion={getQuestion} url={url}></Question>
    
        </Router> 
    </>
  );
}

export default App;

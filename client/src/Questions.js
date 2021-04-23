import React from 'react';
import { Link } from "@reach/router";
import AddQuestion from "./AddQuestion"

export default function Questions(props){
    let shownQuestions = props.questions
    let url = props.url

    function addAQuestion(input, event) { 
      console.log(input) ;    
        fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
      .then(response => console.log(response.json()))
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      props.setQuestions([...props.questions, input])
      }


        return (
            <>
              <section className="questions">
                  <AddQuestion addAQuestion={addAQuestion}></AddQuestion>
                {shownQuestions.map((question, index) =>
                  <article key={index}>
                   <h4> <Link to={`/${question._id}`}>{question.title}</Link></h4>
                   <div>
                      
                       <p><span className="italic">Answers: {question.answers.length}</span></p>
                   </div>
                  </article>)}
              </section>
              </>
          );
    


}
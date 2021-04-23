import React, { useState, useEffect } from 'react';
import { Link } from "@reach/router";
import AddAnswer from './AddAnswer';
import Answer from './Answer';
export default function Question(props){
  let question= props.getQuestion(props._id)

function addAnswer(answer, id) { 
    
    const bodyData= {answer: answer, _id: id, votes: 0}
    console.log(bodyData);
    fetch(`${props.url}/${id}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    })
    .then(response => console.log(response.json()))
    .then(data => {
      console.log("data: " + data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  if (question === undefined) {
    return <p>Nothing here</p>;
  } else return (
        <>
        <div>
            <article className="question">
            <h1>{question.title}</h1>
        
          <p>{question.question}</p>
          <div>
                       <p><span className="italic">Answers: {question.answers.length}</span></p>
                   </div>
            </article>
          <section>
          {question.answers.map((answer, index) =>
          <div key={index} className="answer">
           <Answer answer={answer} question={question} url ={props.url}></Answer>
          </div>
          )}
          </section>

          <AddAnswer addAnswer={addAnswer} _id={question._id} ></AddAnswer>
      
        
        </div>

        <button><Link to="/">Back</Link></button>
</>
      );



}
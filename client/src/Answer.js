import React, { useState, useEffect } from 'react';
export default function Answer(props){
  let answer= props.answer;
  const question = props.question;
  const [votes, setVote] = useState(props.answer.votes)
  useEffect(() => {
      if(votes!= 0){
          const updatedWithVotes ={
              answer: answer.answer,
              _id: question._id,
              votes: votes
          }
        fetch(`${props.url}/${question._id}`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedWithVotes),
          })
          .then(response => console.log(response.json()))
          .then(data => {
            //console.log("data: " + data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });

      }
  });


  if (answer === undefined) {
    return <p>Nothing here</p>;
  } else return (
        <>
   
           <p>A: "{answer.answer}"</p>
           <p><button type="button" onClick={() => setVote(votes + 1)}>▲ Upvote</button><span className="italic votes">{votes}</span></p>
</>
      );
    }

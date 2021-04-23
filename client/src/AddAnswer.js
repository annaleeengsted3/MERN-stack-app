import React, { useState } from 'react';

export default function AddAnswer(props) {
    const id= props._id;
    const [answer, setAnswer] = useState("");

  return (
    <section className="ask">
    <h3>Answer!</h3>
    <form>
    <input type="text" placeholder="Write your answer here" size="30"
        onChange={
          (event) => {
            setAnswer(event.target.value)
          }
        } />
     
      <button type="button" onClick={(event) => props.addAnswer(answer, id)}>Add Answer</button>
    </form>
      
    </section>
  );
}
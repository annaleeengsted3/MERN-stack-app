import React, { useState } from 'react';

export default function AddQuestion(props) {
const [input, setInput] = useState({title:"", question: "", answers: []});


function handleInputChange(event){
  const target = event.target;
    const value = target.value;
    const name = target.name;
setInput({
  ...input,
  [name]: value
  })
 
}
  return (
    <section className="ask">
    <h3>Ask the forum a question!</h3>
    <form>
        
  <label>Title: </label> <input name="title" type="text" placeholder="How do I..." size="30" onChange={(event)=> handleInputChange(event)}   />
<br></br>
     <label>Description: </label> <textarea onChange={(event)=> handleInputChange(event)} name="question" rows="4" cols="50"></textarea>
       <br></br>
     
      <button type="button" onClick={(event) => props.addAQuestion(input, event)}>Ask Question</button>
    </form>
      
    </section>
  );
}
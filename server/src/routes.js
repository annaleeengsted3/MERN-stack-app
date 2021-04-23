module.exports = (questionDB) => {
  const express = require("express");
  const router = express.Router();

  /**** Routes ****/
  router.get('/', async (req, res) => {
    const questions = await questionDB.getQuestions(); 
    res.json(questions);
  });

  router.get('/:_id', async (req, res) => {
    const question = await questionDB.getQuestion(req.params._id);
    res.json(question);
  });

  router.post('/:_id', async (req, res) => {
   const question = await questionDB.updateQuestion({answer: req.body.answer, _id: req.body._id, votes: req.body.votes});
    res.json(question);
  });

  router.post('/', async (req, res) => {
    const question = await questionDB.createQuestion({title: req.body.title, question: req.body.question, answers: req.body.answers});
    res.json(question);
  });

  return router;
}

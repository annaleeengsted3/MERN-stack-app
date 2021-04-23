module.exports = (mongoose) => {
  const questionSchema = new mongoose.Schema({
    title: String,
    question: String,
    answers: [{answer:String, votes: Number}],
  });

  const questionModel = mongoose.model('question', questionSchema);

  async function getQuestions() {
    try {

      return await questionModel.find();
    } catch (error) {
      console.error("getQuestion:", error.message);
      return {};
    }
  }

  async function getQuestion(id) {
    try {
      return await questionModel.findById(id);
    } catch (error) {
      console.error("getQuestion:", error.message);
      return {};
    }
  }

  async function createQuestion(question) {
    let newQuestion = new questionModel(question);
    console.log(newQuestion);
    return newQuestion.save();
  }
  

  async function updateQuestion(question) {
    let questionToUpdate =  await questionModel.findById(question._id);
    if(question.votes > 0){
      const answerToUpdate =questionToUpdate.answers.find(answer=> answer.answer== question.answer)
answerToUpdate.votes = question.votes;
    } else if(question.votes === 0){
      questionToUpdate.answers.push({answer: question.answer, votes: question.votes})
    }
    questionToUpdate.save();
    return questionModel.findById(question._id);
  }

  async function bootstrap(count = 10) {
    let l = (await getQuestions()).length;
    console.log("Question collection size from bootstrap():", l);

    if (l === 0) {
      let promises = [];
      let initQuestions= [
        {
        title:"Why didn't the eagles just fly the ring to mordor...", 
        question: "Seriously though I've been wondering about this for a while.", 
        answers:[{answer: "omg I can't even", votes: 23}, {answer:"Boromir said it best, One does not simply walk into Mordor", votes: 87}], 
        }, 
        {
          title:"How do I get my cat to like me", 
          question: "My cat hates me. Help.", 
          answers:[{answer: "You don't.", votes: 34}, {answer:"Get a dog.", votes: 9}, {answer:"Feed it tuna?", votes: 3}], 
          votes: 87}, 
          {
            title:"How to invest into bitcoin", 
            question: "I want to make loads of money", 
            answers:[{answer:"Bitcoin is a scam", votes: 12}, {answer:"Check out my video on YT, I explain it in detail", votes: 2}, {answer:"I wouldn't recommend it", votes:5}], 
            votes: 4}, 
          {
            title:"Why does my back hurt", 
            question: "Lately I've been having back pains and I don't know why", 
            answers:[{answer:"Probably because you sit like a wet noodle in front of the computer", votes: 67}, {answer:"Get an ergonomic chair", votes: 3}, {answer:"Get an ergonomic posture vest", votes: 1}, {answer:"Do yoga", votes: 1}, {answer:"Do pilates", votes: 0}], 
            votes: 114}
          ]
      for (let i = 0; i < initQuestions.length; i++) {
        let newQuestion = new questionModel(initQuestions[i]);
        console.log(i);
        promises.push(newQuestion.save());
      }
      return Promise.all(promises);
    }
  }

  return {
    getQuestions: getQuestions,
    getQuestion: getQuestion,
    createQuestion: createQuestion,
    updateQuestion: updateQuestion,
    bootstrap
  }
}
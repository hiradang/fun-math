const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers
const courseRouter = require('./routes/Course');
app.use('/courses', courseRouter);

const userRouter = require('./routes/User');
app.use('/users', userRouter);

const questionRouter = require('./routes/Question');
app.use('/questions', questionRouter);

const multiChoiceQuestionRouter = require('./routes/MultiChoice_Question');
app.use('/multiQuestions', multiChoiceQuestionRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server running on port 3001');
  });
});

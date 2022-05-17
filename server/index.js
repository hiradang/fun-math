const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers
const userRouter = require('./routes/User');
app.use('/users', userRouter);

const courseRouter = require('./routes/Course');
app.use('/courses', courseRouter);

const chapterUser = require('./routes/Chapter');
app.use('/chapters', chapterUser);

const courseUserRouter = require('./routes/Course_User');
app.use('/course_user', courseUserRouter);

const chapterUserRouter = require('./routes/Chapter_User');
app.use('/chapter_user', chapterUserRouter);

const questionRouter = require('./routes/Question');
app.use('/questions', questionRouter);

const multiChoiceQuestionRouter = require('./routes/MultiChoice_Question');
app.use('/multiQuestions', multiChoiceQuestionRouter);

const typeQuestionRouter = require('./routes/Type_Question');
app.use('/typeQuestions', typeQuestionRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server running on port 3001');
  });
});

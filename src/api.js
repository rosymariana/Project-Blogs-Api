const express = require('express');

require('express-async-errors');
const loginRoute = require('./routes/loginRoute');
const userRouter = require('./routes/userRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const postsRouter = require('./routes/postsRouter');
const errorMiddlewares = require('./middlewares/errorHandlerMiddleware');

// ... rosy

const app = express();

app.use(express.json());
app.use('/login', loginRoute);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postsRouter);

app.use(errorMiddlewares);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

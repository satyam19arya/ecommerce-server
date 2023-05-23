const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
dotenv.config('./.env');
const app = express();

//middlewares
app.use(express.json({ limit: "5mb" }));
app.use(morgan('common'));
app.use(cookieParser());

const PORT = process.env.PORT;
dbConnect();

// app.use("/", (req, res) => {
//     res.send("Hello World");
// });

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
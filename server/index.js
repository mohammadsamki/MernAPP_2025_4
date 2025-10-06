const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
// import cors and use it to allow cross-origin requests
const cors = require('cors');
//  import user router
const userRouter = require('./routers/userRouters');
const productsRouter = require('./routers/productsRouters');
const categoryRouter = require('./routers/categoryRouters');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors())
//  use user router
app.use('/api/users', userRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoryRouter);


const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
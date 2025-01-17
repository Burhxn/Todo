const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDb = require('./utils/connectDb');
const todoRoutes = require('./routes/todoRoutes.js');


dotenv.config();
const app = express();
connectDb();

app.use(cors());
app.use(bodyParser.json());


app.use("/api/todos", todoRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

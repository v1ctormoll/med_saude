// npm init
require('dotenv').config(); // npm install dotenv
const express = require('express'); // npm install express
const app = express();
const userRouter = require('./routes/userRouter'); // Importando as rotas user
const adminRouter = require('./routes/adminRouter') ; // Importando as rotas admin
const scheduleRouter = require('./routes/scheduleRouter') ; // Importando as rotas admin

app.use('/user', express.json(), userRouter);

app.use('/admin', express.json(), adminRouter);

app.use('/schedule', express.json(), scheduleRouter);

app.use('/', (req, res) =>{ 
    res.send("Página inicial");
});

app.listen(process.env.PORT, ()=>{
    console.log("Servidor Ligado");
})


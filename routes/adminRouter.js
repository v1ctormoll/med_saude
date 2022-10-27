const express = require('express'); // Cp
const router = express.Router(); // Cp

const authUser = require('../controllers/authUserController');
const adminController = require('../controllers/adminController');

router.get('/', authUser.admin, (req,res) =>{
    if(req.user.admin){
        res.send("Esse dado so deve ser visto pelo admin");
    }else{
        res.status(401).send('Acesso não permitido parceiro');
    }
})

router.post('/login', adminController.login);

module.exports = router; // Cp


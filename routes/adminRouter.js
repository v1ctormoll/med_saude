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

router.get('/viewSchedule', authUser.admin, adminController.viewSchedule)

router.post('/login', adminController.login);

router.delete('/complete/schedule/:id', authUser.admin, adminController.completeSchedule);

router.delete('/complete/schedule', authUser.admin, adminController.completeSchedule);

router.delete('/cancel/schedule/:id', authUser.admin, adminController.cancelSchedule);

router.delete('/cancel/schedule', authUser.admin, adminController.cancelSchedule);

module.exports = router; // Cp


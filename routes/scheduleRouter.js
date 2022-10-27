const express = require('express'); // Cp
const router = express.Router(); // Cp

const authUser = require('../controllers/authUserController');
const scheduleController = require('../controllers/scheduleController');

router.get('/opened', authUser.authenticate, scheduleController.opened)
router.get('/admin/finished', authUser.admin, scheduleController.finished)
router.get('/admin/canceled', authUser.admin, scheduleController.canceled)
router.get('/admin/scheduled', authUser.admin, scheduleController.scheduled)


router.get('/finished/user', authUser.authenticate, scheduleController.finishedUser)
router.get('/canceled/user', authUser.authenticate, scheduleController.canceledUser)
router.get('/scheduled/user', authUser.authenticate, scheduleController.scheduledUser)

router.post('/', authUser.admin, scheduleController.schedule);

router.post('/:id', authUser.authenticate, scheduleController.toSchedule);

router.post('/cancel/:id', authUser.authenticate, scheduleController.toCancel);
router.post('/admin/finish/:id', authUser.admin, scheduleController.toFinish)

router.delete('/:id', authUser.admin, scheduleController.delete)

module.exports = router; // Cp


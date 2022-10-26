const express = require('express'); // Cp
const router = express.Router(); // Cp

const authUser = require('../controllers/authUserController');
const scheduleController = require('../controllers/scheduleController');

router.get('/opened', authUser.authenticate, scheduleController.opened)
router.get('/finish', authUser.admin, scheduleController.finish)
router.get('/canceled', authUser.admin, scheduleController.canceled)
router.get('/scheduled', authUser.admin, scheduleController.scheduled)


router.get('/finish/user', authUser.authenticate, scheduleController.finishUser)
router.get('/canceled/user', authUser.authenticate, scheduleController.canceledUser)
router.get('/scheduled/user', authUser.authenticate, scheduleController.scheduledUser)

router.post('/', authUser.admin, scheduleController.schedule);
router.post('/:id', authUser.authenticate, scheduleController.toSchedule);

module.exports = router; // Cp


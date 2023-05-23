const router = require('express').Router();
const userController = require('../controllers/userController');
const requireUser = require('../middlewares/requireUser');
const requireAdmin = require('../middlewares/requireAdmin');

router.get('/getAllUsers', requireUser, userController.getAllUsers);
router.get('/:id', requireUser, userController.getaUsers);
router.delete('/:id', requireUser, userController.deleteUser);
router.put('/updateUser', requireUser, userController.updateUser);
router.put('/block/:id', requireUser, requireAdmin, userController.blockUser);
router.put('/unblock/:id', requireUser, requireAdmin, userController.unblockUser);

module.exports = router;
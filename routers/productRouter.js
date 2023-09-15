const router = require('express').Router();
const productController = require('../controllers/productController');
const requireUser = require('../middlewares/requireUser');
const requireAdmin = require('../middlewares/requireAdmin');

router.post('/create', requireUser, requireAdmin, productController.createProduct);
router.get('/:id', requireUser, productController.getProduct);
router.get('/', requireUser, productController.getAllProduct);
router.put('/update/:id', requireUser, requireAdmin, productController.updateProduct);
router.delete('/delete/:id', requireUser, requireAdmin, productController.deleteProduct);

module.exports = router;
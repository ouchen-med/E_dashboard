const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer')
const path = require('path');
const verifyToken  = require('../middlewares/verifyToken');




const diskStorage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null,'uploads')
     },
     filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
          const fileName = `product-${Date.now()}${ext}`;
          cb(null, fileName);
     }
})
const fileFilter = (req, file, cb) => {
     const allowedTypes = ['.png', '.jpg', '.jpeg', '.webp'];
     const ext = path.extname(file.originalname).toLowerCase();

     if (allowedTypes.includes(ext)) {
          cb(null, true);
     } else {
          cb(new Error('Only .png, .jpg, .jpeg, .webp allowed'), false);
     }
};
const upload = multer({
     storage: diskStorage,
     fileFilter: fileFilter,
})

router.get('/', productController.getProducts);      
router.post('/',verifyToken,upload.single('image'), productController.addProduct);       
router.delete('/:id',verifyToken, productController.deleteProduct); 
router.put('/:id',verifyToken, productController.updateProduct);   

module.exports = router;

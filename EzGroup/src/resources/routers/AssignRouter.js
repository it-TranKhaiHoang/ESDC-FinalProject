const express = require('express');
const router = express.Router();
const AssignController = require('../controllers/AssignController');
const upload = require('../middleware/multer');

router.post('/create', upload.single('file'), AssignController.postCreateAssign);
router.get('/create', (req, res) => {
    res.json('Hello');
});
module.exports = router;

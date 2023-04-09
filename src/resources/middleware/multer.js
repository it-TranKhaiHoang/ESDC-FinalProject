const multer = require('multer');
const fs = require('fs');
const root = './src/public/uploads';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let name = req.body.name;
        let dir = root + `/attachments/${name}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, root + `/attachments/${name}`);
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + '-' + Date.now() + ext);
    },
});

const upload = multer({
    storage: storage,
    limits: { fieldSize: 1024 * 1024 * 1024 },
});

module.exports = upload;

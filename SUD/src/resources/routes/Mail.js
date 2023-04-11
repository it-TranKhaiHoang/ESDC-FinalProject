const router = require('express').Router();
const { createCode, sendMail } = require('../utils');
require('dotenv').config();
const host = process.env.EMAIL_HOST2;
const path = require('path')

router.get('/', (req, res, next) => {
    return res.json({result: 'MAIL API'});
})

router.post('/send-email', async (req, res, next) => {
    const data = req.body;
    
    const options = {
        // thiết lập đối tượng, nội dung gửi mail
        from: host,
        to: data.receiver,
        subject: data.subject,
        html: data.html,
    };

    return sendMail(options, (err, info) => {
        if (err) {
            return res.status(500).json({success: false, msg: 'Gửi mail thất bại', err})
        } 
        
        return res.status(200).json({success: true, msg: 'Gửi mail thành công'})
    })
})

module.exports = router;
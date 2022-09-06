import express from 'express';

var router = express.Router();

router.get('/', function (req, res) {
    res.send('GET route on things.');
});

export default router;
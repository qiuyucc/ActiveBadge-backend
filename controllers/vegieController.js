var express = require('express');
var router = express.Router();
const { Vegie } = require('../models/vegies');


router.post("/upload", (req, res) => {
    console.log(req.body);
    const VegieInfo = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description
    }
    const vegie = new Vegie(VegieInfo);
    vegie.save();
    res.send(vegie);
});

router.get("/fetch", (req, res) => {
    Vegie.findAll().then((result) => {
        if (!result) {
            return Promise.reject('Not found!');
        } else {
            res.json(result);
        }
})});

module.exports  = router;
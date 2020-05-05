var express = require('express');
var router = express.Router();
const { Activity } = require('../models/activity');


router.post("/upload", (req, res) => {
    console.log(req.body);
    const activityInfo = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description
    }
    const activity = new Activity(activityInfo);
    activity.save();
    res.send(activity);
});

router.get("/fetch", (req, res) => {
    Activity.findAll().then((result) => {
        if (!result) {
            return Promise.reject('Not found!');
        } else {
            res.json(result);
        }
})});


module.exports  = router;
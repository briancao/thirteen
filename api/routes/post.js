const router = require("express").Router();
const verifyToken = require('../utils/verifyToken');

router.get("/", verifyToken ,async (req, res) => {
    //res.send(req.user);
    res.json({
        post: { title: "my first post", description: "protected route data" },
    });
});

module.exports = router; /*  */

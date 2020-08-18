import verifyToken from '../utils/verifyToken';
import express from 'express';
let router = express.Router();

export default router.get("/", verifyToken, async (req, res) => {
    //res.send(req.user);
    res.json({
        post: { title: "my first post", description: "protected route data" },
    });
});

//module.exports = router; /*  */

import authenticate from '../utils/auth';
import express from 'express';
let router = express.Router();

export default router.get("/", authenticate, async (req, res) => {
    //res.send(req.user);
    res.json({
        post: { title: "my first post", description: "protected route data" },
    });
});

//module.exports = router; 

/*  */

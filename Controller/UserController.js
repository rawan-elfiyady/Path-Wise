const express = require("express");
const router = express.Router();

const UserRepo = require("../Repositories/UserRepository");

router.get("/getUser/:id", async ( req, res, next) => {
    try {
        const id = req.params.id;
        const user = await UserRepo.getUserById(id);
        if(!user){
            return res.status(404).json({message: "not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}) ;

module.exports = router; 
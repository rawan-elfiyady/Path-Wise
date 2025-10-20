const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserRepo = require("../Repositories/UserRepository");

const AuthServices = require("../Services/AuthServices")

router.post("/signUp", async (req, res, next) => {
    try{
        const {name, email, password} = req.body;
        
        const user = await AuthServices.signUp({name, email, password}); 

        if(!user){
            return res.status(404).json({message: "User Already Exist"});
        }

    return res.status(200).json(user);
} catch(error){
    res.status(500).json(error.message);
}
});

router.post("/login", async (req, res, next) => {
    try{
        const {email, password} = req.body;
        const user = await AuthServices.login({email, password})

        if(!user){
            return res.status(404).json({message: "Not Found"});
        }
    return res.status(200).json(user);

}catch(error){
    res.status(500).json(error.message);
}

})

module.exports = router; 
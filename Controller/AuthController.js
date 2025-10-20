const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserRepo = require("../Repositories/UserRepository");

router.post("/signUp", async (req, res, next) => {
    try{
        const {name, email, password} = req.body;
    const existingUser = await UserRepo.getUserByEmail(email);

    if(existingUser){
        console.log("Checking for existing user with email:", email);
        console.log("Existing user:", existingUser);
        return res.status(400).json({message: "User already exist"});

    }

    const hashedPassword = await bcrypt.hash(password,8);
    const data = {name, email, hashedPassword, role: "user"};
    const user = await UserRepo.createUser(data);

    return res.status(200).json(user);
} catch(error){
    res.status(500).json(error.message);
}
});

router.post("/login", async (req, res, next) => {
    try{
        const {email, password} = req.body;
    const existingUser = await UserRepo.getUserByEmail(email);

    if(!existingUser){
    return res.status(404).json({message: "User doesn`t exist"});
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if(!match){
           return res.status(401).json({message: "Invalid Credentials"});
    }

    const token = jwt.sign({
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role
    },
    "secret",
    {expiresIn: "1h"}
);

    return res.status(200).json({
      token,
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });

}catch(error){
    res.status(500).json(error.message);
}

})

module.exports = router; 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserRepo = require("../Repositories/UserRepository");

async function signUp({name, email, password}) {
    const existingUser = await UserRepo.getUserByEmail(email);
    
        if(existingUser){
            console.log("Checking for existing user with email:", email);
            console.log("Existing user:", existingUser);
            throw new Error("User already exist");
    
        }
        const hashedPassword = await bcrypt.hash(password,8);
        const data = {name, email, hashedPassword, role: "user"};
        const user = await UserRepo.createUser(data);

        const token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
    },
    "secret",
    {expiresIn: "1h"}
);
  return {
    token,
    user: {
       id: user.id,
       name: user.name,
       email: user.email,
       role: user.role 
    }
  }
}

async function login({email, password}) {
    const existingUser = await UserRepo.getUserByEmail(email);

    if(!existingUser){
           throw new Error("User doesn`t exist");
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if(!match){
           throw new Error("Invalid Credentials");
    }

    const token = jwt.sign({
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role
    },
    "secret",
    {expiresIn: "1h"}
);

return {
      token,
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    };
}

module.exports = {
    signUp,
    login
}
const db = require("../models");
const {Sequelize, User} = db;


async function getUserById(id) {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User with this id cannot be found");
    }

    return user; 

  } catch (error) {
    console.error("Error in getUserById:", error.message);
    throw error;  
  }
}

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({where: {email: email}});
    if(!user){
        return null;
    }

    return user;
    } catch (error) {
        console.error("Error in getUserByEmail:", error.message);
        throw error;
    }
}

async function getAllUsers(){
    try{
        const users = await User.findAll({ attributes: [id, name, email, image]});

        if(!users){
            throw new Error("No Users Found");
        }

        return users;
    }
    catch(error){
        console.error("Error in getAllUser", error.message);
        throw error;
    }
}

async function createUser(data) {
    try {
        const user = await User.create({name: data.name,
                                        email: data.email,
                                        password: data.hashedPassword,
                                        role: data.role,
                                        });

        const addedUser = await User.findOne({where: {email: data.email}});
        return user;
    } catch (error) {
        console.error("Error in createUser", error.message);
        throw error;
    }
}

async function updateUser(id, updatedFields) {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return { message: "User not found" };
    }

    await user.update(updatedFields);

    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}



module.exports ={
    getUserById,
    getUserByEmail,
    getAllUsers,
    createUser,
}
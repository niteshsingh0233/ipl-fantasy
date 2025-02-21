const express = require("express");
const UserSchema = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/userHelper");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");
const {DMHelper} = require('../helpers/httpHelper')

exports.RegisterUser = async (req, res) => {
  try {
    const { name, userName, emailId, phone, password } = req.body;

    const userData = await UserSchema.findOne(
      { userName } && { emailId } && { phone }
    );

    if (userData) {
      res.status(400).json({
        message: "user already exists.",
      });
      return;
    }

    const passwordCHECK = await hashPassword(password);

    const activities = ["10000"];
    const user = UserSchema({
      name,
      userName,
      emailId,
      phone,
      password: passwordCHECK,
      currentPassword: passwordCHECK,
      activities,
    });

    await user.save();

    res.status(201).json({
      message: "User Created",
      user,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "User error",
      error,
      success: false,
    });
  }
};

exports.LoginUser = async (req, res,next) => {
  try {
    const { userName, password } = req.body;
    const user = await UserSchema.findOne({ userName });

    if (!user) {
      res.status(400).json({
        message: "user not found",
      });
      return;
    }
    console.log(user)

    const passwordCheck = await comparePassword(password, user.password);

    if (!passwordCheck) {
      res.status(400).json({
        message: "password was incorrect",
      });
      return;
    }

    if (user.isDeleted) {
      res.status(400).json({
        message: "user is already deleted.",
      });
      return;
    }

    if (user.isDeactivated) {
      res.status(400).json({
        message:
          "user is already deactivated. Please activate the user to use the software.",
      });
      return;
    }

    const token = await jwt.sign(
      {
        _id: user._id,
        userName: user.userName,
        roles : user.userRole,
        isAdmin : user.isAdmin
      },
      "434343434",
      { expiresIn: "1h" }
    );

    res.cookie('token', token, {httpOnly : true});

    res.status(200).json({
      message: "login successful",
      user,
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "login error",
      error,
      success: false,
    });
  }
};

exports.DeactivateUser = async (req, res) => {
  try {
    const userId = req.user?._id;

    console.log(userId);
    console.log(req.body);

    if (!userId) {
      res.status(401).json({
        message: "user not found",
        success: false,
      });
      return;
    }

    const { deactivate } = req.body;
    console.log(deactivate);
    if (!deactivate) {
      res.status(401).json({
        message: "deactivation failed",
        success: false,
      });
      return;
    }

    const user = await UserSchema.findById(userId);

    if (!user) {
      res.status(401).json({
        message: "authorization failed",
        success: false,
      });
      return;
    }

    if (user.isDeactivated) {
      res.status(401).json({
        message: "already deactivated ",
        success: false,
      });
      return;
    }

    user.isDeactivated = true;

    const userActivity = [10001, ...user.activities];

    user.activities = userActivity;

    await user.save();

    res.status(200).json({
      message: "deactivation successful",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "deactivation failed",
      success: false,
    });
  }
};

exports.ActivateUser = async (req, res) => {
  try {
    const userId = req.user?._id;

    console.log(userId);
    console.log(req.body);

    if (!userId) {
      res.status(401).json({
        message: "user not found",
        success: false,
      });
      return;
    }

    const { activate } = req.body;
    console.log(activate);
    if (!activate) {
      res.status(401).json({
        message: "activation failed",
        success: false,
      });
      return;
    }

    const user = await UserSchema.findById(userId);

    if (!user) {
      res.status(401).json({
        message: "authorization failed",
        success: false,
      });
      return;
    }

    if (!user.isDeactivated) {
      res.status(401).json({
        message: "already activated.",
        success: false,
      });
      return;
    }

    user.isDeactivated = false;

    await user.save();

    res.status(200).json({
      message: "activation successful",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "activation failed",
      success: false,
    });
  }
};

exports.LogoutUser = async (req, res) => {
  try {
    const userId = req.user?._id;

    console.log(userId);
    console.log(req.body);

    if (!userId) {
      res.status(401).json({
        message: "user not found",
        success: false,
      });
      return;
    }

    const user = await UserSchema.findById(userId);

    if (!user) {
      res.status(401).json({
        message: "authorization failed",
        success: false,
      });
      return;
    }

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      message: "logout successful",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "logout failed",
      success: false,
    });
  }
};

exports.DeleteUser = async (req, res) => {
  try {
    const userId = req.user?._id;

    console.log(userId);
    console.log(req.body);

    if (!userId) {
      res.status(401).json({
        message: "user not found",
        success: false,
      });
      return;
    }

    const user = await UserSchema.findById(userId);

    if (!user) {
      res.status(401).json({
        message: "authorization failed",
        success: false,
      });
      return;
    }

    if (user.isDeleted) {
      res.status(401).json({
        message: "already deleted.",
        success: false,
      });
      return;
    }

    user.isDeleted = true;

    await user.save();

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      message: "user deleted successful",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "user delete failed",
      success: false,
    });
  }
};

exports.GetAllUsers = async (req,res,next) => {
  try {
    var check = await DMHelper('users');
    res.status(200).json({
      message: "Get All users successful",
      success: true,
      check,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get All user failed",
      success: false,
    });
  }
}


exports.UpdateUserAsAdmin = async (req,res,next) => {
  try {
    const userId = req.params.userId
    console.log(userId)
    const user = await UserSchema.findById(req.params.userId)
console.log(user)
    if(!user){
      res.status(200).json({
        message: "user not found successful",
        success: true,
      });
      return
    }
    if(user.isAdmin){
      res.status(200).json({
        message: "user is alrady admin",
        success: false,
      });
      return
    }
    user.isAdmin = true
    user.userRole = 'Admin'

    await user.save()
    console.log(user)
    res.status(200).json({
      message: "UpdateUserAsAdmin successful",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "UpdateUserAsAdmin failed",
      success: false,
    });
  }
}

exports.GetSingleUser = async (req,res,next) => {
  try {
    const userId = req.params.userId
    console.log(userId)
    const user = await UserSchema.findById(req.params.userId)
    
    if(!user){
      res.status(200).json({
        message: "user not found successful",
        success: true,
      });
      return
    }

    console.log(user)
    res.status(200).json({
      message: "GetSingleUser successful",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "GetSingleUser failed",
      success: false,
    });
  }
}

exports.DeleteUserAsAdmin = async (req,res,next) =>{
  try {
    const userId = req.params.userId
    console.log(userId)
    const user = await UserSchema.findById(req.params.userId)
    
    console.log(user)

    if(!user){
      res.status(200).json({
        message: "user not found successful",
        success: true,
      });
      return
    }

    if(user.isDeleted){
      res.status(200).json({
        message: "user already deleted successful",
        success: true,
      });
      return
    }

    user.isDeleted = true;

    await user.save();
    // await user.deleteOne(req.params.userId)
    res.status(200).json({
      message: "DeleteUser successful",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "DeleteUser failed",
      success: false,
    });
  }
}


exports.GetUserDetails = async (req,res,next) =>{
  try {
    const user = await UserSchema.findById(req.user?._id)
    
    console.log(user)

    if(!user){
      res.status(200).json({
        message: "user not found successful",
        success: true,
      });
      return
    }

    if(user.isDeleted){
      res.status(200).json({
        message: "user already deleted successful",
        success: true,
      });
      return
    }


    
    res.status(200).json({
      message: "get user successful",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "DeleteUser failed",
      success: false,
    });
  }
}
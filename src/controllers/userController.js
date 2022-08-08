import mongoose from "mongoose";
import { UserSchema } from "../models/userModel";
import bcrypt from "bcrypt";
import {createTokens, validateTokens} from "./../../JWT"

const User = mongoose.model('User', UserSchema);

//REGISTER
export const register = (req, res) => {
    try {

        const {email, password} = req.body;
        bcrypt.hash(password, 10).then((hash) => {
            User.create({
                email: email,
                password: hash,
                is_active: true
            })
                .then(() => {
                    res.json("USER REGISTERED");
                })
                .catch((err) => {
                    if (err) {
                        res.status(400).json({error: err});
                    }
                });
        });
    }
    catch (error){
        throw new Error("Error registering!");
    }
}

//LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;
      
        const userLogin = await User.findOne({ where: { email: email } });


      
        if (!userLogin) res.status(400).json({ error: "User Doesn't Exist" });
      try {
          const dbPassword = userLogin.password;
          bcrypt.compare(password, dbPassword).then(async (match) => {
              if (!match) {
                  res
                      .status(400)
                      .json({error: "Wrong Email and Password Combination!"});
              } else {
                  const accessToken = createTokens(userLogin);

                  res.cookie("access-token", accessToken, {
                      maxAge: 60 * 60 * 24 * 30 * 1000,
                      httpOnly: true,
                  });

                  userLogin.last_login_timestamp = Date.now();
                  await userLogin.save();

                  res.json({message: 'User logged in!',
                            });


              }
          });
      }
        catch(error){
            throw new Error("Error logging in");
    }
}



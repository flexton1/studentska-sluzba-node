import mongoose from "mongoose";
import { UserSchema } from "../models/userModel";
import {createTokens} from "../../JWT"
import bcrypt from "bcrypt";

const User = mongoose.model('User', UserSchema);

//REGISTER
export const register = async (req, res) => {
    try {

        const {email, password, firstName, lastName, company, phone} = req.body;
        if(!email || email === '' || !password || password === ''){
            throw new Error("Invalid data");
        }


       await bcrypt.hash(password, 10).then((hash: string): void => {
            User.create({
                email: email,
                password: hash,
                is_active: true,
                firstName: firstName,
                lastName: lastName,
                company: company,
                phone: phone,
                confirmed_email: true
            })
                .then((): void => {
                    res.json("USER REGISTERED");
                })
                .catch((err: string): void => {
                    if (err) {
                        res.status(400).json({error: err});
                    }
                });
        });
    }
    catch (error: any){
        throw new Error("Error registering!");
    }
}

//LOGIN
export const login = async (req, res) => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    if(!email || !password){
        throw new Error("Invalid data");
    }
      
        const userLogin: any = await User.findOne( { email: email, is_active : true } );


      
        if (!userLogin) res.status(400).json({ error: "User Doesn't Exist" });
      try {
          const dbPassword: string = userLogin.password;
          bcrypt.compare(password, dbPassword).then(async (match) => {
              if (!match) {
                  res
                      .status(400)
                      .json({error: "Wrong Email and Password Combination!"});
              } else {
                  const accessToken: string = createTokens(userLogin);

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

//CHECK TOKEN
export const checkToken = async (req, res) => {

    try
    {
        res.json("Token valid!");


    }
    catch (e){
        throw new Error("Token invalid");
    }

}

//LOGOUT
export const logout = async (req, res) => {
    // Set token to none and expire after 5 seconds
    res.cookie('access-token', 'none', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
    })
    res
        .status(200)
        .json({ success: true, message: 'User logged out successfully' })
};






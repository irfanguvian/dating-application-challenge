import { isEmpty, isNil } from "lodash"
import * as bcrypt from "bcrypt"
import { LoginUserHandlerParameterType, SignupUserHandlerParameterType } from "types/auth.service";
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { connection } from "../index";
import { createNewUser, getUserByUsername, updateUserLogin } from "../repository/user.repository";
import { createNewUserDetail } from "../repository/user-detail.repository";
import { createTokenUser, deleteTokenUser } from "../repository/auth-token.repository";
import moment from "moment";

function checkEmail(email : string) : boolean {
    const pattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    return pattern.test(email) ? true : false;
}

const signupUserHandler = async (body : SignupUserHandlerParameterType) => {
    return connection.transaction(async (trx) => {
        try {
            if(isNil(body.username) || isEmpty(body.username)){
              throw new Error("Username is required")
            }
      
            if(isNil(body.password) || isEmpty(body.password)){
              throw new Error("password is required")
            }
      
            if(isNil(body.retypePassword) || isEmpty(body.retypePassword)){
              throw new Error("retypePassword is required")
            }
      
            if(isNil(body.firstName) || isEmpty(body.firstName)){
              throw new Error("firstName is required")
            }
      
            if(body.password !== body.retypePassword){
              throw new Error("password and retypePassword should be same")
            }
      
            if(!checkEmail(body.username)){
              throw new Error("Invalid email address")
            }
      
            body.username = body.username.toLowerCase()
      
            const passwordEncrypted = await bcrypt.hash(body.password, 10)
         
            const parameterCreateNewUser = {
                username : body.username,
                password : passwordEncrypted
            }
                       
            const createNewUserResponse = await createNewUser(parameterCreateNewUser, trx)
                    
            const parameterCreateNewUserDetail = {
                email : body.username,
                firstName : body.firstName,
                lastName : body.lastName,
                userId : createNewUserResponse[0].id,
            }
            const createNewUserDetailResponse = await createNewUserDetail(parameterCreateNewUserDetail, trx)
      
            return {
              success: true,
              message : "User created successfully",
            }
        } catch (error) {
            throw new Error(error.message)
        }
    })
}

const loginUserHandler = async (body : LoginUserHandlerParameterType) => {
    return connection.transaction(async (trx) => {
        try {
            if(isNil(body.username) || isEmpty(body.username)){
                throw new Error("Username is required")
            }
        
            if(isNil(body.password) || isEmpty(body.password)){
                throw new Error("password is required")
            }
    
            if(!checkEmail(body.username)){
                throw new Error("Invalid email address")
            }
    
            // get user by username
            const getUser = await getUserByUsername(body.username)
    
            if(isNil(getUser) || isEmpty(getUser)){
                throw new Error("User not found")
            }
    
            const user = getUser[0]
    
            const checkPassword = await bcrypt.compare(body.password, user.password);
    
            if(!checkPassword){
                throw new Error("wrong password, try again")
            }
    
            // update user login
            const updateUserLoginResponse = await updateUserLogin(body.username, trx) 
    
            // create token JWT
            const accessId = uuidv4()
    
            const parameterCreateTokenUser = {
                accessId : accessId,
                userId : +user.id,
                endDate: moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
            }
    
            const secretKey = process.env.JWT_SECRET ? process.env.JWT_SECRET : "secretkey";
    
            const token = jwt.sign(parameterCreateTokenUser ,secretKey , {
                expiresIn: '1 days',
            });        
    
            const deleteTokenUserResponse = await deleteTokenUser(+user.id, trx)
        
            const createTokenResponse = await createTokenUser(parameterCreateTokenUser, trx)
    
            return {
                success: true,
                message : "User login successfully",
                data: {
                    token: token
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    })
}

 const verifyUserTokenHandler = (tokenUser: string) => {
    try {
        if(isNil(tokenUser) || isEmpty(tokenUser)){
            throw new Error("token is required")
        }
        const secretKey = process.env.JWT_SECRET ? process.env.JWT_SECRET : "secretkey";

        const decoded  = jwt.verify(tokenUser, secretKey); 

        if(isNil(decoded)) {
            throw new Error("Invalid token")
        }

        return {
            success: true,
            message : "User authenticated successfully",
            data: {
                userId: decoded['userId'],
                accessId: decoded['accessId']
            }
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export {
    signupUserHandler,
    loginUserHandler,
    verifyUserTokenHandler
}
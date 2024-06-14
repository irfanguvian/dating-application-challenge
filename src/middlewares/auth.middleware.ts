import { NextFunction, Response, Request } from "express";
import { isNil } from "lodash";
import { checkAccessIdUser } from "../repository/auth-token.repository";
import { getUserDetail } from "../repository/user-detail.repository";
import { verifyUserTokenHandler } from "../services/auth.service";

const verifyTokenMiddleware = async (req : Request, res: Response, next: NextFunction) => {
    let authHeader = req.headers.authorization;

    // scan bearer token
    if(isNil(authHeader) || authHeader === ''){
        return res.status(400).json({ success: false, message: "Token is required" });
    }

    authHeader = authHeader.replace('Bearer ', '');

    if (authHeader) {
        try {
            const verifyTokenResponse = verifyUserTokenHandler(authHeader);

            if(verifyTokenResponse.success == true) {
                const checkAccessId = await checkAccessIdUser(verifyTokenResponse.data.accessId);
                if(checkAccessId.length == 0) {
                    return res.status(400).json({ success: false, message: "Failed to verify token" });
                }
                const getUser = await getUserDetail(verifyTokenResponse.data.userId);
                req.context = getUser[0];
                return next();
            }
        } catch (error) {
            return res.status(400).json({ success: false, message: "Failed to verify token" });
        }
    } 
    return res.status(400).json({ success: false, message: "Failed to verify token" });
};

export {
    verifyTokenMiddleware
};
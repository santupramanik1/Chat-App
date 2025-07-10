import { NextFunction, Request, Response } from "express";
import { IUser } from "../model/userModel.js";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}

export const isAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        // If the Authorization oken is not Found Simply Return
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message: "No Auth Token is Found - PLZ Login",
            });
            return;
        }

        // If the Authtoken is found extract the authorization from the header
        const token = authHeader.split(" ")[1];

        const decodeValue = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        if (!decodeValue || !decodeValue.user) {
            res.status(401).json({
                message: "Invalid Token",
            });
            return;
        }

        req.user = decodeValue.user;

        next();
    } catch (error) {
        res.status(401).json({
            message: "JWT Error - PLZ Login",
        });
        return
    }
};

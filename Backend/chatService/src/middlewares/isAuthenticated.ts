import { NextFunction, Request, Response } from "express";
import { Document } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";

interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
}

export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}

export const isAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No Auth Header- PLZ Login",
            });
        }

        const token = authHeader.split(" ")[1];

        const decodeValue = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        if (!decodeValue || !decodeValue.user) {
            return res.status(401).json({
                message: "Invalid Token",
            });
        }

        req.user = decodeValue.user as IUser

        next()
    } catch (error) {
        return res.status(401).json({
            message: "JWT Error - PLZ Login",
        });

    }
};

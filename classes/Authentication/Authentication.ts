import { ObjectId } from "mongoose";
import { verify, sign } from "jsonwebtoken";
import { Request } from "express";

class Authentication {

    protected TOKEN_NOT_FOUND: string = 'No tiene token';
    protected TOKEN_INVALID: string = 'Token no valido';
    protected USER_NOT_FOUND: string = 'Por favor, autentificate';

    public createToken(_id: ObjectId): string {
        return sign({ _id }, process.env.JWT_SECRET as string);
    }

    public getToken(req: Request): string {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error(this.TOKEN_NOT_FOUND);
        }

        return token;
    }

    public decodeToken(token: string) {
        const decoded = verify(token, process.env.JWT_SECRET as string);

        if (!decoded) {
            throw new Error(this.TOKEN_INVALID);
        }

        return decoded as { _id: string };
    }

}

export default Authentication;
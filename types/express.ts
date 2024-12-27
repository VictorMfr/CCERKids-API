import { Request, Response, NextFunction } from "express";

export type Tmiddleware = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => void; 

export type Tmethod = 'get' | 'post' | 'patch' | 'delete';
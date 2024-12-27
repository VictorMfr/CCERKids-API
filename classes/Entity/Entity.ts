import { Model } from "mongoose";
import IMiddleware from "../ExpressApp/Routes/Middlewares/IMiddleware";
import IEntity from "./IEntity";
import { Tmiddleware } from "../../types/express";
import IAuthentication from "../Authentication/IAuthentication";
import entityTokenAuthentication from "../Authentication/AuthenticationMethods/EntityTokenAuthentication";

class Entity implements IMiddleware, IEntity {
    private name: string;
    private model: Model<any,any>;
    private authenticationMethod: IAuthentication;

    constructor(name: string, model: Model<any,any>, authenticationMethod?: IAuthentication) {
        this.name = name;
        this.model = model;
        this.authenticationMethod = authenticationMethod || entityTokenAuthentication;
    }

    public setAuthenticationMethod(authenticationMethod: IAuthentication) {
        this.authenticationMethod = authenticationMethod;
    }

    public getName() {
        return this.name;
    }

    public getModel() {
        return this.model;
    }

    private getAuth(auth: IAuthentication): Tmiddleware {
        return auth.getAuthenticationMiddleware(this);
    }

    public getMiddleware(): Tmiddleware {
        const middleware: Tmiddleware = this.getAuth(this.authenticationMethod);
        return middleware;
    }
}

export default Entity
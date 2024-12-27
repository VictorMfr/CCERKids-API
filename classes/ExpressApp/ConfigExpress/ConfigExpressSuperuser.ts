import { IConfigExpressApp } from "./IConfigExpressApp";
import { Model } from "mongoose";
import bcrypt from "bcrypt";

class ConfigExpressSuperuser implements IConfigExpressApp {

    private SuperuserModel: Model<any, any>;
    private superuserData: { [index: string]: any };

    constructor(superuserModel: Model<any, any>, data: { [index: string]: any }) {
        this.SuperuserModel = superuserModel;
        this.superuserData = data;
    }

    private async isSuperuserInDDBB() {
        try {

            const superusers = await this.SuperuserModel.find({});
            return (superusers.length !== 0);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error);
            }
        }
    }

    private async addSuperUserToBBDD() {
        try {
            const superUser = new this.SuperuserModel(this.superuserData);

            await superUser.save();
            console.log("[Servidor]: Superusuario añadido a la base de datos");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error);
            }
        }
    }

    async configApplication(): Promise<void> {
        if (!await this.isSuperuserInDDBB()) {
            await this.addSuperUserToBBDD();
        }
    }
}

export default ConfigExpressSuperuser;
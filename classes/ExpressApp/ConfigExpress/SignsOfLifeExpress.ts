import { Express } from "express";
import { IConfigExpressApp } from "./IConfigExpressApp";

class SignsOfLifeExpress implements IConfigExpressApp {
    configApplication(app: Express): void {
        app.get('/', (req, res) => {
            res.send("I'm alive");
        })
    }
}

const signsOfLifeExpress = new SignsOfLifeExpress();

export default signsOfLifeExpress;
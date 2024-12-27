import { Express } from "express";
import { IConfigExpressApp } from "./IConfigExpressApp";

class ConfigExpressAppCORS implements IConfigExpressApp {
    public configApplication(app: Express): void {
        console.log("Configuring Cors...");
    }
}

export default ConfigExpressAppCORS;
import express, { Express } from "express";
import { IConfigExpressApp } from "./IConfigExpressApp";

export class ConfigExpressAppJSON implements IConfigExpressApp {
    public configApplication(app: Express) {
        app.use(express.json());
    }
    
}

const configExpressAppJSON = new ConfigExpressAppJSON(); 

export default configExpressAppJSON;
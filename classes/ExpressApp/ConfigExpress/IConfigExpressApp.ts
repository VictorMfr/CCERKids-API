import { Express } from "express";

export interface IConfigExpressApp {
    configApplication(app: Express): void;
}
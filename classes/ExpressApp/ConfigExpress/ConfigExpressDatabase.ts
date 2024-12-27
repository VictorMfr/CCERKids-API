import { IConfigExpressApp } from "./IConfigExpressApp";
import Database from "../../Database/Database";

class ConfigExpressDatabase implements IConfigExpressApp {

    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    configApplication(): void {
        this.database.connectToDatabase();
    }
}

export default ConfigExpressDatabase;
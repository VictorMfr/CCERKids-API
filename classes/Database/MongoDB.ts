import mongoose from "mongoose";
import Database from "./Database";

class MongoDB extends Database {
    public async connectToDatabase() {
        mongoose.connect(process.env.MONGODB_URL as string, { connectTimeoutMS: 60000 }).then(() => {
            this.displaySuccessMessage();
        }).catch((error: Error) => {
            this.displayErrorMessage(error);
        });
    }

    protected displaySuccessMessage() {
        console.log(this.DATABASE_CONNECTION_SUCCESS);
    }

    protected displayErrorMessage(error: Error) {
        console.log(this.DATABASE_CONNECTION_ERROR, error);
    }
}

const mongoDB = new MongoDB();

export default mongoDB;



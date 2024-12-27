import { Model } from "mongoose";

class Service {
    protected serviceModel: Model<any, any>;

    constructor(servicesModel: Model<any, any>) {
        this.serviceModel = servicesModel;
    }

    protected getServicesModel() {
        return this.serviceModel;
    }
}

export default Service;
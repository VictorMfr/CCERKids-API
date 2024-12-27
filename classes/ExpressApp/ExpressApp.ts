import express, { Express } from "express";
import { IConfigExpressApp } from "./ConfigExpress/IConfigExpressApp";
import Route from "./Routes/Route";
import IServices from "./Services/IService";

class ExpressApp {
    private app: Express = express();
    private port: number;

    private INSTALLED_ROUTES_MESSAGE = '[servidor]: Rutas instaladas en la aplicacion!';

    constructor (port: number) {
        this.port = port;
    }

    public configApplication(ConfigExpress: IConfigExpressApp) {
        ConfigExpress.configApplication(this.app);
    }

    public addRoutes(router: Route, services?: IServices | IServices[]) {
        this.app.use(router.getRouter().router);
        console.log(this.INSTALLED_ROUTES_MESSAGE);

        if (services) {
            if ("length" in services) {
                services.forEach(service => {
                    service.executeService(router);
                }); 
            } else {
                services.executeService(router);
            }
        }
    }

    public startApp() {
        this.app.listen(this.port, () => {
            console.log(`[servidor]: Servidor inicializado en el puerto: ${this.port}`);
        });
    }
}

export default ExpressApp;

import ExpressApp from "./classes/ExpressApp/ExpressApp";
import ConfigExpressAppJSON from "./classes/ExpressApp/ConfigExpress/ConfigExpressJSON";
import Entity from "./classes/Entity/Entity";
import User from "./models/user";
import createOperation from "./classes/ExpressApp/Routes/Operation/CRUD/CreateOperation";
import readAllOperation from "./classes/ExpressApp/Routes/Operation/CRUD/ReadAllOperation";
import readOperation from "./classes/ExpressApp/Routes/Operation/CRUD/ReadOperation";
import deleteOperation from "./classes/ExpressApp/Routes/Operation/CRUD/DeleteOperation";
import UpdateOperation from "./classes/ExpressApp/Routes/Operation/CRUD/UpdateOperation";
import mongoDB from "./classes/Database/MongoDB";
import RouteMiddleware from "./classes/ExpressApp/Routes/RouteMiddleware";
import { IUser } from "./types/models";
import loginOperation from "./classes/ExpressApp/Routes/Operation/Authentication/LoginOperation";
import logoutOperation from "./classes/ExpressApp/Routes/Operation/Authentication/LogoutOperation";
import DBAppServicesRegistration from "./classes/ExpressApp/Services/BBDDAppServices/BBDDAppServicesRegistration";
import Operation from "./models/operation";
import Role from "./models/role";
import { IRole } from "./types/models/role";
import Superuser from "./models/superuser";
import ConfigExpressSuperuser from "./classes/ExpressApp/ConfigExpress/ConfigExpressSuperuser";
import readSelfOperation from "./classes/ExpressApp/Routes/Operation/CRUD/ReadSelfOperation";
import assignUserRole from "./classes/ExpressApp/Routes/Operation/User/AssignUserRole";
import removeUserRole from "./classes/ExpressApp/Routes/Operation/User/RemoveUserRole";
import getUserRoles from "./classes/ExpressApp/Routes/Operation/User/GetUserRoles";
import setBanStateUser from "./classes/ExpressApp/Routes/Operation/User/SetBanStateUser";
import addRolePermit from "./classes/ExpressApp/Routes/Operation/Role/AddRolePermit";
import getRolePermits from "./classes/ExpressApp/Routes/Operation/Role/GetRolePermits";
import removeRolePermit from "./classes/ExpressApp/Routes/Operation/Role/RemoveRolePermit";
import { ISuperuser } from "./types/models/superuser";
import getUsersByRole from "./classes/ExpressApp/Routes/Operation/User/GetUsersByRole";
import ConfigExpressDatabase from "./classes/ExpressApp/ConfigExpress/ConfigExpressDatabase";
import KPS from "./models/Schedules/kidsPlanification";
import { IKidsPlanification } from "./types/models/kidsPlanification";
import CPS from "./models/Schedules/cleanPlanification";
import { ICleanPlanification } from "./types/models/cleanPlanification";
import PPS from "./models/Schedules/protocolPlanification";
import { IProtocolPlanification } from "./types/models/protocolPlanification";
import Notification from "./models/notification";
import sendNotificationByRole from "./classes/ExpressApp/Routes/Operation/Notification/SendNotificationByRole";
import getNotificationsByUser from "./classes/ExpressApp/Routes/Operation/Notification/GetNotificationsByUser";
import KCS from "./models/Schedules/kidsChronogram";
import { IKidsChronogram } from "./types/models/kidsChronogram";
import createKidChronogram from "./classes/ExpressApp/Routes/Operation/KidChronogram/CreateKidChronogram";
import getKidChronogram from "./classes/ExpressApp/Routes/Operation/KidChronogram/GetKidChronogram";
import { set } from "mongoose";
import setDrawback from "./classes/ExpressApp/Routes/Operation/KidChronogram/SetDrawback";
import addScheduleDescription from "./classes/ExpressApp/Routes/Operation/KidChronogram/AddScheduleDescription";
import signsOfLifeExpress from "./classes/ExpressApp/ConfigExpress/SignsOfLifeExpress";


// Starting app
const app = new ExpressApp(8000);
const dbServices = new DBAppServicesRegistration(Operation);

// Configuring Application
app.configApplication(ConfigExpressAppJSON);
app.configApplication(new ConfigExpressSuperuser(Superuser, {
    name: "Victor",
    lastName: "Martinez",
    gender: "male",
    phoneNumber: "+584128612673",
    email: "victormfr2003@gmail.com",
    password: "12345678"
}));

app.configApplication(new ConfigExpressDatabase(mongoDB));
app.configApplication(signsOfLifeExpress);

// Entities
const ESuperuser = new Entity('superuser', Superuser);
const EUser = new Entity('user', User);
const ERole = new Entity('role', Role);
const EOperation = new Entity('operation', Operation);

const EKSchedule = new Entity('kidSchedule', KPS);
const ECSchedule = new Entity('cleanSchedule', CPS);
const EPSchedule = new Entity('protocolSchedule', PPS);
const ENotification = new Entity('notification', Notification);

const EKChronogram = new Entity('kidChronogram', KCS);

const DEFAULT_AUTH_MIDDLEWARES = [ESuperuser, EUser];

// Superuser router
const superuserRouter = new RouteMiddleware(ESuperuser);
superuserRouter.addRoute(loginOperation);
superuserRouter.addRoute(logoutOperation);
superuserRouter.addRoute(new UpdateOperation<ISuperuser>(["lastName", "name", "phoneNumber", "password"]));
superuserRouter.addRoute(readSelfOperation, [ESuperuser]);

app.addRoutes(superuserRouter, dbServices);

// User router
const userRouter = new RouteMiddleware(EUser);
userRouter.addRoute(createOperation, DEFAULT_AUTH_MIDDLEWARES);
userRouter.addRoute(readAllOperation, DEFAULT_AUTH_MIDDLEWARES);
userRouter.addRoute(readOperation, DEFAULT_AUTH_MIDDLEWARES);
userRouter.addRoute(readSelfOperation, [EUser]);
userRouter.addRoute(new UpdateOperation<IUser>(["lastName", "name", "phoneNumber", "gender", "email", "password"]), DEFAULT_AUTH_MIDDLEWARES);
userRouter.addRoute(deleteOperation, DEFAULT_AUTH_MIDDLEWARES);
userRouter.addRoute(loginOperation);
userRouter.addRoute(logoutOperation);
userRouter.addRoute(assignUserRole, DEFAULT_AUTH_MIDDLEWARES);
userRouter.addRoute(removeUserRole, DEFAULT_AUTH_MIDDLEWARES);
userRouter.addRoute(getUserRoles, DEFAULT_AUTH_MIDDLEWARES);
userRouter.addRoute(setBanStateUser, DEFAULT_AUTH_MIDDLEWARES);
userRouter.addRoute(getUsersByRole, DEFAULT_AUTH_MIDDLEWARES);

app.addRoutes(userRouter, dbServices);

// Role router
const roleRouter = new RouteMiddleware(ERole);
roleRouter.addRoute(createOperation, DEFAULT_AUTH_MIDDLEWARES);
roleRouter.addRoute(readAllOperation, DEFAULT_AUTH_MIDDLEWARES);
roleRouter.addRoute(readOperation, DEFAULT_AUTH_MIDDLEWARES);
roleRouter.addRoute(new UpdateOperation<IRole>(["name", "description"]), DEFAULT_AUTH_MIDDLEWARES);
roleRouter.addRoute(deleteOperation, DEFAULT_AUTH_MIDDLEWARES);
roleRouter.addRoute(addRolePermit, DEFAULT_AUTH_MIDDLEWARES);
roleRouter.addRoute(getRolePermits, DEFAULT_AUTH_MIDDLEWARES);
roleRouter.addRoute(removeRolePermit, DEFAULT_AUTH_MIDDLEWARES);

app.addRoutes(roleRouter, dbServices);


// Operation router
const operationRouter = new RouteMiddleware(EOperation);
operationRouter.addRoute(readAllOperation, DEFAULT_AUTH_MIDDLEWARES);
operationRouter.addRoute(readOperation, DEFAULT_AUTH_MIDDLEWARES);

// Kids Schedule router
const kidSheduleRouter = new RouteMiddleware(EKSchedule);
kidSheduleRouter.addRoute(createOperation, DEFAULT_AUTH_MIDDLEWARES);
kidSheduleRouter.addRoute(readAllOperation, DEFAULT_AUTH_MIDDLEWARES);
kidSheduleRouter.addRoute(readOperation, DEFAULT_AUTH_MIDDLEWARES);
kidSheduleRouter.addRoute(new UpdateOperation<IKidsPlanification>([
    "title", 
    "target", 
    "biblic_quotes", 
    "complementary_biblic_quotes"
]));

kidSheduleRouter.addRoute(deleteOperation, DEFAULT_AUTH_MIDDLEWARES);
app.addRoutes(kidSheduleRouter, dbServices);

// Kids Chronogram router
const kidChronogramRouter = new RouteMiddleware(EKChronogram);

kidChronogramRouter.addRoute(createOperation);
kidChronogramRouter.addRoute(readAllOperation);
kidChronogramRouter.addRoute(readOperation);
kidChronogramRouter.addRoute(new UpdateOperation<IKidsChronogram>(["bigGroup", "smallGroup", "date", "bigGroup", "smallGroup" ]));
kidChronogramRouter.addRoute(deleteOperation);
kidChronogramRouter.addRoute(createKidChronogram);
kidChronogramRouter.addRoute(getKidChronogram, DEFAULT_AUTH_MIDDLEWARES);
kidChronogramRouter.addRoute(setDrawback);
kidChronogramRouter.addRoute(addScheduleDescription, DEFAULT_AUTH_MIDDLEWARES);

app.addRoutes(kidChronogramRouter, dbServices)

// Clean Schedule router
const cleanScheduleRouter = new RouteMiddleware(ECSchedule);

cleanScheduleRouter.addRoute(createOperation, DEFAULT_AUTH_MIDDLEWARES);
cleanScheduleRouter.addRoute(readAllOperation, DEFAULT_AUTH_MIDDLEWARES);
cleanScheduleRouter.addRoute(readOperation, DEFAULT_AUTH_MIDDLEWARES);
cleanScheduleRouter.addRoute(new UpdateOperation<ICleanPlanification>(["date", "team"]), DEFAULT_AUTH_MIDDLEWARES);
cleanScheduleRouter.addRoute(deleteOperation, DEFAULT_AUTH_MIDDLEWARES);

app.addRoutes(cleanScheduleRouter, dbServices);



// Protocol Schedule router
const protocolScheduleRouter = new RouteMiddleware(EPSchedule);

protocolScheduleRouter.addRoute(createOperation, DEFAULT_AUTH_MIDDLEWARES);
protocolScheduleRouter.addRoute(readAllOperation, DEFAULT_AUTH_MIDDLEWARES);
protocolScheduleRouter.addRoute(readOperation, DEFAULT_AUTH_MIDDLEWARES);
protocolScheduleRouter.addRoute(new UpdateOperation<IProtocolPlanification>(["date", "team"]), DEFAULT_AUTH_MIDDLEWARES);
protocolScheduleRouter.addRoute(deleteOperation, DEFAULT_AUTH_MIDDLEWARES);


app.addRoutes(protocolScheduleRouter, dbServices);

// Notification router
const notificationRouter = new RouteMiddleware(ENotification);

notificationRouter.addRoute(createOperation, DEFAULT_AUTH_MIDDLEWARES);
notificationRouter.addRoute(readAllOperation, DEFAULT_AUTH_MIDDLEWARES);
notificationRouter.addRoute(readOperation, DEFAULT_AUTH_MIDDLEWARES);
notificationRouter.addRoute(deleteOperation, DEFAULT_AUTH_MIDDLEWARES);
notificationRouter.addRoute(sendNotificationByRole, DEFAULT_AUTH_MIDDLEWARES);
notificationRouter.addRoute(getNotificationsByUser, DEFAULT_AUTH_MIDDLEWARES);


app.addRoutes(notificationRouter, dbServices);

// Starting App
app.addRoutes(operationRouter, dbServices);
app.startApp();
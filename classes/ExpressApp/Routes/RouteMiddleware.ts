import { Tmiddleware } from "../../../types/express";
import IEntity from "../../Entity/IEntity";
import IOperation, { TOperation } from "./Operation/IOperation";
import Route from "./Route";

class RouteMiddleware extends Route {

  constructor(entity: IEntity) {
    super(entity);
  }

  private isIEntity(obj: any): obj is IEntity {
    return 'getMiddleware' in obj;
  }

  public addRoute(operation: IOperation, middlewares: (IEntity | Tmiddleware)[] = []): TOperation {
    if (!middlewares) {
      return operation.handleOperation(this.router, this.entity, middlewares);
    }

    const routeMiddlewares: Tmiddleware[] = middlewares.map(element => {
      if (this.isIEntity(element)) {
        return element.getMiddleware();
      }
      return element;
    });

    const entityOperation: TOperation = operation.handleOperation(this.router, this.entity, routeMiddlewares);
    this.setOperation(entityOperation);
    
    return entityOperation;
  }
}

export default RouteMiddleware;
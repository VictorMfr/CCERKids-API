import IRoute from "../Routes/IRoute";

interface IService {
    executeService(router?: IRoute): void
}

export default IService;
abstract class Database {
    protected DATABASE_CONNECTION_SUCCESS: string = '[servidor]: Conexión exitosa con la base de datos!';
    protected DATABASE_CONNECTION_ERROR: string = '[servidor]: Error al conectarse a la base de datos';
    
    public abstract connectToDatabase(): void;

    protected abstract displaySuccessMessage(): void;
    protected abstract displayErrorMessage(error: Error): void;
}

export default Database;
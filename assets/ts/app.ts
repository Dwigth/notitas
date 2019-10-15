import { SplashScreen } from "./controllers/splashscreen.controller";
import { InputController } from "./controllers/input.controller";
import { DBController } from "./controllers/db.controller";

class App {
    constructor() {
        const db = new DBController();
        const sc = new SplashScreen();
        const ic = new InputController();
    }
}
const notitasApp = new App();
import auth from "./auth";
import normal from "./normal";
import pos from "./pos";

const routes = [...auth, ...normal, ...pos];

// This function will group all the routes together
export default routes;

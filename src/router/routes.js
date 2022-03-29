import auth from "./auth";
import normal from "./normal";
import pos from "./pos";

const routes = [...auth, ...normal, ...pos];

export default routes;

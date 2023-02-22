import config from '~/config';
import Home from '~/pages/client/Home';

// Public routes
const publicRoutes = [{ path: config.routes.home, component: Home }];

const privateRoutes = [{ path: config.routes.homeAdmin, component: Home }];

export { publicRoutes, privateRoutes };

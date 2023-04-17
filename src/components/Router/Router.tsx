import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import routes from './routes';
import RouteNames from './routeNames';

const Router = () => {
   const location = useLocation();

   return (
      <AnimatePresence mode="wait">
         <Routes key={location.pathname} location={location}>
            {routes.map(({ path, Component }) => (
               <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path={RouteNames.BAD_URL} element={<Navigate to={RouteNames.HOME} />} />
         </Routes>
      </AnimatePresence>
   );
};

export default Router;
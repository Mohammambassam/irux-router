import {createRoutes, Router} from './lib';

import Home from './pages/Home'
import User from './pages/User'
import routes from './utils/routes';
import StaticUser from './pages/StaticUser';

export default function App(){

  console.log(
  createRoutes([
    { path: "/users/:id", component: User },
    { path: "/users/id", component: StaticUser },
  ])
  );

  return(
    <>
      <Router routes={routes}></Router>

    </>
  )
    
}
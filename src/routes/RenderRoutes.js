import React from 'react';
import { Switch, Route } from 'react-router-dom';

const AuthGuard = ({ children, ...props }) => {
  return children;
};

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => (
        <AuthGuard {...props} {...route}>
          <route.component {...props} {...route} routes={route.routes} />
        </AuthGuard>
      )}
    />
  );
};

const RenderRoutes = ({ routes = [], props }) => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} props={props}/>
      ))}
    </Switch>
  );
};

export default RenderRoutes;

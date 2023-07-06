import React from 'react';
import RenderRoutes from './RenderRoutes';
import { getAuthRoutes } from './authRoutes';

const AppRoutes = () => {
  return <RenderRoutes routes={getAuthRoutes()} />;
};

export default AppRoutes;

// MainLayout.js
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <><div className="app">
          <Navbar />
          <Outlet />
      </div><Footer /></>

  );
};

export default MainLayout;

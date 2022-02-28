import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Account/Account';
import Work from './Work/Work';
import Inventory from './Inventory/Inventory';
import Market from './Market/Market';
import Charge from './Charge/Charge';
import ChargeKlay from './ChargeKlay/ChargeKlay';
import Banner1 from './Banner/Banner1';
import Banner3 from './Banner/Banner3';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account/*" element={<Login />} />
      <Route path="/work/*" element={<Work />} />
      <Route path="/inventory/*" element={<Inventory />} />
      <Route path="/market/*" element={<Market />} />
      <Route path="/charge/*" element={<Charge />} />
      <Route path="/chargeklay/*" element={<ChargeKlay />} />
      <Route path="/banner1" element={<Banner1 />} />
      <Route path="/banner3" element={<Banner3 />} />
    </Routes>
  );
};

export default RoutesComponent;

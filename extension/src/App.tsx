import React from 'react';
//import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home-page';
//import { NotFoundPage } from './pages/not-found-page';


window.console.log('app.tsx');

export const App: React.FC = () => {
  window.console.log('app.tsx rendered');

  return (
    <HomePage />
  )
}

export default App

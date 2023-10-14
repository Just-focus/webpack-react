import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import './styles/reset.scss';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<RouterProvider router={router} />);

// @ts-ignore
if (DEBUG) {
  // do something for debug
  // removed in production env
  const a = 10;
  const b = 20;
  console.log(a + b);
}
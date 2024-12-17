import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { routes } from './routes/route.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './state/store.ts';
import { Provider } from 'react-redux';
const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </Provider>
  </React.StrictMode>
);

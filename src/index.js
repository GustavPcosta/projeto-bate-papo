// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import MainRoutss from './Routs/routs';
// import {BrowserRouter} from 'react-router-dom'
// import { useState } from 'react';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//    <BrowserRouter>
//     <MainRoutss/>
   
//    </BrowserRouter>
//   </React.StrictMode>
// );

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainRoutss from './Routs/routs';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState(null); 

  return (
    <BrowserRouter>
      <MainRoutss setUser={setUser} />
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


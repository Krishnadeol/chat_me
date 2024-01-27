import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<div>Login</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;

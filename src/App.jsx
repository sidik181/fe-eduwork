import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './config/AppRoutes';
import './App.css';
import { useEffect } from 'react';
import { getCarts } from './app/api/cart';


function App() {

  useEffect(() => {
    
  }, [])
  return (
    <div className="App bg-white min-h-screen">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;

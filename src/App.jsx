import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './config/AppRoutes';
import './App.css';


function App() {
  return (
    <div className="App bg-white min-h-screen">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;

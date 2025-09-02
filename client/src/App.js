import TaskManager from './TaskManager';
import UserSignup from './UserSignup';
import UserLogin from './UserLogin';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
         <BrowserRouter>
          <Routes>
          <Route path="/" element={<UserSignup />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/tasks" element={<TaskManager />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;

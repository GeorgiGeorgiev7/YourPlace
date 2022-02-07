import { Routes, Route, Navigate } from 'react-router-dom';

import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="/places/new" element={<NewPlace />}></Route>
        <Route path="/*" element={<Navigate to="/" />}></Route>
      </Routes>
    </div>
  );
}

export default App;

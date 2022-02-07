import Users from './users/pages/Users';
import { Routes, Route, Navigate } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="/*" element={<Navigate to={'/'} />}></Route>
      </Routes>
    </div>
  );
}

export default App;

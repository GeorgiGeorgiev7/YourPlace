import { Routes, Route, Navigate } from 'react-router-dom';

import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNav from './common/components/Navigation/MainNav/MainNav';
import PageNotFound from './common/pages/PageNotFound/PageNotFound';


function App() {
  return (
    <div className="App">
      <MainNav />
      <main>
        <Routes>
          <Route path="/" element={<Users />}></Route>
          <Route path="/places/new" element={<NewPlace />}></Route>
          <Route path="/*" element={<PageNotFound />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;

import { Routes, Route, Navigate } from 'react-router-dom';

import Users from './users/pages/Users';
import MainNav from './common/components/Navigation/MainNav/MainNav';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import PageNotFound from './common/pages/PageNotFound/PageNotFound';


function App() {
  return (
    <div className="App">
      <MainNav />
      <main>
        <Routes>
          <Route path="/" element={<Users />}></Route>
          <Route path="/places/new" element={<NewPlace />}></Route>
          <Route path="/:uid/places" element={<UserPlaces />}></Route>
          <Route path="/*" element={<PageNotFound />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;

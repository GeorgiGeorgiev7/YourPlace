import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import Users from './users/pages/Users';
import MainNav from './common/components/Navigation/MainNav/MainNav';
import NewPlace from './places/pages/NewPlace/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces/UserPlaces';
import PageNotFound from './common/pages/PageNotFound/PageNotFound';


function App() {
  return (
    <div className="App">
      <MainNav />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Users />}
          />
          <Route
            path="/:uid/places"
            element={<UserPlaces />}
          />
          <Route
            path="/places/new"
            element={<NewPlace />}
          />
          <Route
            path="/places/:pid"
            element={<UpdatePlace />}
          />
          <Route
            path="/pageNotFound"
            element={<PageNotFound />}
          />
          <Route
            path="/*"
            element={<Navigate to="/pageNotFound" />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import useAuth from './common/hooks/auth-hook';

import Users from './users/pages/Users';
import Auth from './users/pages/Auth/Auth';
import MainNav from './common/components/Navigation/MainNav/MainNav';
import NewPlace from './places/pages/NewPlace/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces/UserPlaces';
import PageNotFound from './common/pages/PageNotFound/PageNotFound';
import AuthContext from './common/context/auth-context';



function App() {
   const { userId, token, login, logout } = useAuth();

   let routes;
   if (token) {
      routes = (
         <>
            <Route path="/" element={<Users />} />
            <Route path="/:uid/places" element={<UserPlaces />} />
            <Route path="/places/new" element={<NewPlace />} />
            <Route path="/places/:pid" element={<UpdatePlace />} />
            <Route path="/*" element={<PageNotFound />} />
         </>
      );
   } else {
      routes = (
         <>
            <Route path="/" element={<Users />} />
            <Route path="/:uid/places" element={<UserPlaces />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={<PageNotFound />} />
         </>
      );
   }

   return (
      <AuthContext.Provider value={{
         isLoggedIn: !!token,
         userId, token,
         login, logout
      }}>
         <MainNav />
         <main>
            <Routes>
               {routes}
            </Routes>
         </main>
      </AuthContext.Provider>
   );
}

export default App;

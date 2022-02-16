import { useState, useCallback, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Users from './users/pages/Users';
import Auth from './users/pages/Auth/Auth';
import MainNav from './common/components/Navigation/MainNav/MainNav';
import NewPlace from './places/pages/NewPlace/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces/UserPlaces';
import PageNotFound from './common/pages/PageNotFound/PageNotFound';
import AuthContext from './common/context/auth-context';


function App() {
   const navigate = useNavigate();

   const [token, setToken] = useState(false);
   const [userId, setUserId] = useState(null);

   const login = useCallback((uid, token) => {
      setUserId(uid);
      setToken(token);

      localStorage.setItem('userData', JSON.stringify({
         userId: uid, token
      }));

      navigate('/');

   }, []);

   const logout = useCallback(() => {
      setToken(null);
      setUserId(null);

      localStorage.removeItem('userData');

      navigate('/');

   }, []);

   useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (userData && userData.token) {
         login(userData.userId, userData.token);
      }

   }, [login]);

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
         token,  userId,
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

import React, { Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';
import useAuth from './common/hooks/auth-hook';

import MainNav from './common/components/Navigation/MainNav/MainNav';
import PageNotFound from './common/pages/PageNotFound/PageNotFound';

import AuthContext from './common/context/auth-context';
import LoadingSpinner from './common/components/UIElements/LoadingSpinner/LoadingSpinner';


const Users = React.lazy(() => import('./users/pages/Users'));
const Auth = React.lazy(() => import('./users/pages/Auth/Auth'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces/UserPlaces'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace/NewPlace'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace/UpdatePlace'));


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
            <Suspense fallback={
               <div className='center'>
                  <LoadingSpinner />
               </div>
            }>
               <Routes>
                  {routes}
               </Routes>
            </Suspense>
         </main>
      </AuthContext.Provider>
   );
}

export default App;

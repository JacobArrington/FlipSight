import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom"; // Import Redirect
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Dashbored from './components/Dashbored';

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='/dashboard'>
            {sessionUser ? <Dashbored /> : <Redirect to="/" />}
          </Route>
         
        </Switch>
      )}
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginPage';
import SignUpForm from './components/auth/RegisterPage';
import UserDMs from './components/ChannelBar/UserDMs';
import Parent from './components/Parent'
import ServerChannels from './components/ChannelBar/ServerChannels';
import ServerBar from './components/ServerBar/ServerBar.jsx';
import MessageComponent from './components/MessageComponent/MessageComponent'
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import LandingPage from './components/LandingPage';
import ErrorPage from './components/ErrorPage'
import { authenticate } from './store/session';
import * as serverActions from "./store/server";


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate()).then(() => {
        if (user) {
          dispatch(serverActions.loadUsersServers(user.id))
        }
      })
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <LandingPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/register' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/@me/:serverId' exact={true} >
          <ServerBar />
          <UserDMs />
          <ChatComponent />
        </ProtectedRoute>
        <ProtectedRoute path='/@me/:channelId' exact={true} >
          <ServerBar />
          <UserDMs />
          <ChatComponent />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/servers/:serverId' exact={true} >
          <Parent />
          <ChatComponent />
        </ProtectedRoute>
        <ProtectedRoute path='/app' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <Route path='*'>
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

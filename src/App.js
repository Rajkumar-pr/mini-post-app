
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Opening from './Pages/Opening';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Opening} />
          <Route path='/home' component={Home} />
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import Header from './components/Header';
import './App.css';
import Main from './components/Main';
import Home from './components/Home';
import MainHeader from './components/MainHeader';
import Movies from './components/Movies';
import Restaurants from './components/Restaurants';
import Footer from './components/Footer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Event from './components/Events';
import Blog from './components/Blog';
import Profile from './components/Profile';
import Activity from './components/Activity';
import Fav from './components/Fav';

function App() {
  return (

    <>
      <Router>
        <Switch>
          <Route path="/Restaurants">
            <Restaurants />
          </Route>
          <Route path="/Activities">
            <Activity />
          </Route>
          <Route path="/Movies">
            <Movies />
          </Route>
          <Route path="/Events">
            <Event />
          </Route>
          <Route path="/Profile">
            <Profile />
          </Route>
          <Route path="/Favorites">
            <Fav />
          </Route>
          <Route path="/Blog">
            <Blog />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <Footer/>
    </>
  );
}

export default App;

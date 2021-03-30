import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Home from './components/pages/Home';
import Community from './components/pages/Community';
import Details from './components/pages/Details';
import CommunityDetails from './components/pages/CommunityDetails';
import NotFoundPage from './components/pages/NotFoundPage';

import Auth from './hoc/auth';


function App() {

  return (
      <BrowserRouter>
        <div>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Auth(Home, null)}/>
            <Route path="/login" component={Auth(LoginPage, false)}/>
            <Route path="/register" component={Auth(RegisterPage, false)}/>
            <Route exact path="/community" component={Auth(Community, null)}/>
            <Route exact path="/details/:postid" component={Auth(Details, true)}/>
            <Route exact path="/community/details/:postid" component={Auth(CommunityDetails, true)}/>
            <Route path="/" component={Auth(NotFoundPage, null)}/>
          </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
  );
}

export default App;

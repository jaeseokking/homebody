import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import LoginPage from './components/pages/login/LoginPage';
import RegisterPage from './components/pages/register/RegisterPage';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Home from './components/pages/home/Home';
import Community from './components/pages/community/Community';
import About from './components/pages/about/About';
import HomeDetails from './components/pages/home/HomeDetails';
import CommunityDetails from './components/pages/community/CommunityDetails';
import CommunityUpdate from './components/pages/community/CommunityUpdate';
import NotFoundPage from './components/pages/NotFoundPage';


import Auth from './hoc/auth';


function App() {

  return (
      <BrowserRouter>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Auth(Home, null)}/>
            <Route path="/login" component={Auth(LoginPage, false)}/>
            <Route path="/register" component={Auth(RegisterPage, false)}/>
            <Route exact path="/community" component={Auth(Community, null)}/>
            <Route exact path="/about" component={Auth(About, null)}/>
            <Route exact path="/details/:home_id" component={Auth(HomeDetails, true)}/>
            <Route exact path="/community/details/:board_id" component={Auth(CommunityDetails, true)}/>
            <Route exact path="/community/update" component={Auth(CommunityUpdate, true)}/>
            <Route path="/" component={Auth(NotFoundPage, null)}/>
          </Switch>
          <Footer/>
      </BrowserRouter>
  );
}

export default App;

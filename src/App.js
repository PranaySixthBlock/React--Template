import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import './App.scss';
import ReactGA from 'react-ga';
// import createHistory from 'history/createBrowserHistory';
import { createBrowserHistory } from 'history';
import RSSHelp from './views/Pages/RSSHelp/RSSHelp';


ReactGA.initialize('UA-133682637-3');
const history = createBrowserHistory()
ReactGA.set({ page:history.location.hash });
ReactGA.pageview(history.location.hash);
history.listen((location, action) => {
  ReactGA.set({ page:history.location.hash });
  ReactGA.pageview(history.location.hash);
});

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});
// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

const SkillSubmitted = Loadable({
  loader: () => import('./views/Pages/SkillSubmitted'),
  loading
});



class App extends Component {
  componentDidMount(){
    // //console.log(this.props)
    // let token=localStorage.getItem("Rjstoken")
    // let token = true ;
    // if(!token){
    //   // this.props.history.push("/#/admin/login");
    //   window.location = '/#/login';
    // }
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route exact path="/skillsubmitted" name="Page 500" component={SkillSubmitted} /> 
          <Route exact path="/RSSHelp" name="RSS Help" component={RSSHelp} />         
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;

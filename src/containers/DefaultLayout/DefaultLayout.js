import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppBreadcrumb,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
// import axios from 'axios';
import {withRouter} from "react-router-dom";
import axios from 'axios';
const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  
state = {
  permissions : null,
  dashboard : null ,
  settings : null ,
  locations : null , 
  company_settings : null ,
  user_management : null,
  users : null ,
}
  
  componentDidMount(){
    let token=localStorage.getItem("Rjstoken")
    // console.log(token);
    
    if(!token){
          window.location = '/#/login';
      }
      let userId = localStorage.getItem("userId");
        let config = {
          headers: {
            'Authorization': token
          }
        }
      axios.get(process.env.REACT_APP_BACKEND_API_URL+'//get/user/permissions/'+ userId , config)
      .then(response =>{    
        // console.log(response.data.data) 
      this.setState({
        permissions : response.data.data.permissions,
        dashboard : response.data.data.dashboard,
        locations : response.data.data.locations,
        settings : response.data.data.settings,
        users : response.data.data.users,
        user_management : response.data.data.user_management,
        company_settings : response.data.data.company_settings,
      })
      // console.log(this.state.users , this.state.user_management )
      })      
    }

  signOut = () => {
    // localStorage.clear();
    // axios.defaults.headers.common['Authorization'] = "";
    // // this.props.history.push('/login');
    // window.location = '/#/login';
  }
  

  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

  render() {
    if(this.state.permissions != null ){
      if(this.state.user_management.canView == false){
        delete navigation.items[1];
      }else{
        if(this.state.permissions.canView == false ){
          delete navigation.items[1].children[1];
        }
        if(this.state.users.canView == false ){
          delete navigation.items[1].children[0];
        }
      }
      
      if(this.state.dashboard.canView == false ){
        delete navigation.items[0];
      }
      if(this.state.settings.canView == false ){
        delete navigation.items[2];
      }else{
        if(this.state.locations.canView == false ){
          delete navigation.items[2].children[0];
        }
        if(this.state.company_settings.canView == false ){
          delete navigation.items[2].children[1];
        }}
      }
      
    return (
      <div className="app">
      <AppHeader fixed>
        <Suspense fallback={this.loading()}>
          <DefaultHeader onLogout={e=>this.signOut(e)}/>
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
          <AppSidebarNav navConfig={navigation} {...this.props} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          {/* <AppBreadcrumb appRoutes={routes}/> */}
          <Container fluid>
            <Suspense fallback={this.loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )} />
                  ) : (null);
                })}
                <Redirect from="/" to="/home" />
              </Switch>
            </Suspense>
          </Container>
        </main>
        <AppAside fixed>
          <Suspense fallback={this.loading()}>
            <DefaultAside />
          </Suspense>
        </AppAside>
      </div>
      <AppFooter>
        <Suspense fallback={this.loading()}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
    );
    }
  //   else return null;
  // }
}

export default withRouter(DefaultLayout);

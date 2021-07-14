import React, { Component,Suspense } from 'react';
import {Button,  Col, Container, Row } from 'reactstrap';
// import successImage from '../../../assets/img/brand/success.png';
import step1 from '../../../assets/img/brand/skillSubmitted.png';
import {
  AppHeader,

} from '@coreui/react';
const DefaultHeader = React.lazy(() => import('./../../../containers/DefaultLayout/DefaultHeader'));
class SkillSubmitted extends Component {

  homeButtonClick=()=>{
    
    if(localStorage.getItem(localStorage.getItem('templateType')+'_isadmin') === "false"){
      window.location=process.env.REACT_APP_PORTAL_URL
    }else{
      // window.location=process.env.REACT_APP_ADMIN_URL
      
        window.close();
    }
      
  }
  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;
  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <div className="app  flex-row align-items-center" style={{width:"100%"}}>
            <Container>
              <Row className="justify-content-center">
                <Col md="8">
                  <div className="clearfix" align="center">
                    {/* <h1 className=" display-3 mr-4" >Success</h1> */}
                    <img src={step1} alt="Skill Submitted"  style={{width:"100%",height:"auto"}}/>
                    <p>Your skill is Under Review It might take at least 3-5 days for the platforms to accept.We will review your skill every day and will give You update on your skill.</p>
                    <Button type="button" color="vobo"onClick={this.homeButtonClick} className="px-4" >Back To Home</Button>
                  </div>
                  
                </Col>
              </Row>
            </Container>
          </div>
          </div>
        </div>
   

    );
  }
}

export default SkillSubmitted;

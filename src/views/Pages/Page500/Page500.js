import React, { Component,Suspense } from 'react';
import {  Col, Container, Row, Button } from 'reactstrap';
import {
  AppHeader,

} from '@coreui/react';
const DefaultHeader = React.lazy(() => import('./../../../containers/DefaultLayout/DefaultHeader'));
class Page500 extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;
  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader />
          </Suspense>
        </AppHeader>
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="6" >
                  <span className="clearfix" >
                    {/* <h1 className="float-left display-3 mr-4">500</h1> */}
                    <h4 >SORRY. </h4>
                    <h4 >IT'S NOT YOU. IT'S US. </h4>
                    <p className="text-muted ">We're currently experiencing an internal server problem. Please</p>
                  </span>
            
                <Row className="justify-content-center">
                    <Button className="btn btn-primary " onClick={this.props.history.goBack} color="info">Try Again</Button>
                </Row>
              
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default Page500;
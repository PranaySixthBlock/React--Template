import React, { Component,Suspense } from 'react';
import {  Col, Container, Row,Button } from 'reactstrap';
import {
  AppHeader,

} from '@coreui/react';
const DefaultHeader = React.lazy(() => import('./../../../containers/DefaultLayout/DefaultHeader'));
class Page404 extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;
  render() {
    console.log(this.props.history.goBack)
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
              <Col md="6" align="center">
                <div className="clearfix">
                  <h4 className="pt-3">OOPS..! YOU'RE LOST.</h4>
                  <p className="text-muted">The page you are looking for was not found.</p>
                </div>
                <Row className="justify-content-center">
                    <Button className="btn btn-primary " onClick={()=>{window.location=process.env.REACT_APP_PORTAL_URL}} color="info">Back To Home</Button>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default Page404;
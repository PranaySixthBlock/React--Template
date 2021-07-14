import React,{Suspense} from 'react';
import {  Col,Row, Container,Button } from 'reactstrap';
import axios from '../Axios/Config' ;
import {
  AppHeader,

} from '@coreui/react';
const DefaultHeader = React.lazy(() => import('./../DefaultLayout//DefaultHeader'));
class ErrorBoundary extends React.Component {
    constructor(props) {
    super(props);
    this.state = {hasError: false };
}

componentDidCatch(error, info) {
    this.setState({hasError: true });
    axios.post('customer/skill/imrovement',{"suggestion":"Client side error(React) "+error.toString()+", And error was at "+(localStorage.getItem('templateType'))+ ':' +info.componentStack})
    .then(response => {
        if(!response.status === 200 ){
          console.error(response.data.error.message)
        }
    })
    .catch(function (error) {
        this.setState({
        successMessage:undefined,
        error:error,
        apiStatus: false,
        modalPopup:true,
        });
    }.bind(this));
}
redirect=()=>{
  this.setState({hasError: false });
  window.location="#/botinfo"
}
loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;
render() {
    if (this.state.hasError) {
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
                      {/* <h1 className=" display-3 mr-4">Sorry....!</h1> */}
                      <h4 >SORRY. </h4>
                      <h4>SOMETHING WENT WRONG....! </h4>
                      <p className="text-muted">The page you are looking is broken. Please</p>
                      <Row className="justify-content-center">
                          <Button color="primary" className="mt-1" active tabIndex={-1} onClick={this.redirect}>Try Again</Button>
                      </Row>
                  </Col>
                </Row>
              </Container>
            </div>
            </div>
        )
    } else {
        return this.props.children;
        }
    }
} 

export default ErrorBoundary;
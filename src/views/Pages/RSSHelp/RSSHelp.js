import React, { Component } from 'react';
import { Card, CardBody,CardHeader,Col, Row, Container} from 'reactstrap';

class RSSHelp extends Component{
    render(){
    return(
        <div className="app flex-row align-items-center">
        <Container fluid={true}>
          <Row className="justify-content-center">
            <Col md={6}>
            <Card >
            <CardHeader>
        <h1 style= {{textAlign:"center"}}>How To Get RSS URL</h1>
        </CardHeader>
         <CardBody>
        <p ><strong>SOUNDCLOUD</strong></p>
        <hr className="my-2" />
        <ol>   
           <li> Open WWW.SOUNDCLOUD.COM </li>

           <li> Login to your Soundcloud Account and Go to the Settings Tab </li>

           <li> In the Settings page, Select CONTENT Tab </li>

           <li> In the Content tab, Copy the URL in the “RSS Feed” field. </li>

           <li>  Paste the URL in the IMPORT From RSS button and click Import.</li>

        </ol>
        <strong>PIPPA</strong>
        <hr className="my-2" />
        <ol>   
           <li> Open WWW.PIPPA.COM </li>

           <li> Login to your Pippa Account and click on your already created show </li>

           <li> Click on the “RSS Feed” Share button which opens a page in the new tab </li>

           <li> Copy the URL from the new tab and paste the URL in the IMPORT From RSS button and click Import </li>

        </ol>
        </CardBody>
        
        </Card>  
            </Col>
          </Row>
          </Container>
          </div>

        // <Row> 
        //     <Col lg={12}>
        //     <Row>
        //        <Col lg ={3}>
        //        </Col>
                
        //     <Col lg={6} >
        //      <Card>
        //     <CardHeader>
        // <h1>How To Get RSS URL</h1>
        // </CardHeader>
        //  <CardBody>
        // <p className="lead"><strong>SOUNDCLOUD</strong></p>
        // <hr className="my-2" />
        // <ol>   
        //    <li> Open WWW.SOUNDCLOUD.COM </li>

        //    <li> Login to your Soundcloud Account and Go to the Settings Tab </li>

        //    <li> In the Settings page, Select CONTENT Tab </li>

        //    <li> In the Content tab, Copy the URL in the “RSS Feed” field. </li>

        //    <li>  Paste the URL in the IMPORT From RSS button and click Import.</li>

        // </ol>
        // <p className="lead"><strong>PIPPA</strong></p>
        // <hr className="my-2" />
        // <ol>   
        //    <li> Open WWW.PIPPA.COM </li>

        //    <li> Login to your Pippa Account and click on your already created show </li>

        //    <li> Click on the “RSS Feed” Share button which opens a page in the new tab </li>

        //    <li> Copy the URL in the new tab and paste the URL in the IMPORT From RSS button and click Import </li>

        // </ol>
        // </CardBody>
        
        // </Card> 
        // </Col> 
        // </Row>
        // </Col>
        // </Row>
    );

    }  
}
export default RSSHelp;
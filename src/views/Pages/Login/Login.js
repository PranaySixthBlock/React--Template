import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row,FormFeedback } from 'reactstrap';

// import {validationSchema,validate} from './ValidationSchema';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../../containers/Axios/Config';
import Modals  from '../../../containers/ModalAlerts/ModalAlerts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css'
import swal from 'sweetalert';


const validationSchema = function (values) {
  return Yup.object().shape({
    email: Yup.string()
    .email(`Invalid Email`)
    .required('Email is required'),
    password: Yup.string()
    .required('password is required'),
  })
}

const validate = (getValidationSchema) => {
  return (values) => {
    const validationSchema = getValidationSchema(values)
    try {
      validationSchema.validateSync(values, { abortEarly: false })
      return {}
    } catch (error) {
      return getErrorsFromValidationError(error)
    }
  }
}

const getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {})
}

class Login extends Component {
  state={
    email: '',
    password:'',
    successMessage:undefined,
    error:"",
    redirectToReferrer: false,
  }

  onSubmit=(values,{ setSubmitting, setErrors }) => {
                                    
    // setSubmitting(true)
      axios.post(process.env.REACT_APP_BACKEND_API_URL+'/company/user/signin', {"email":values.email,"password":values.password})
      .then(res => {     
        // alert(res.data.status)
        
        console.log(res.data.data);
        // return
        // return res.data;
          if (res.data.status===200) {
            localStorage.setItem("Rjstoken", res.data.data.token);
            localStorage.setItem("companyId" , res.data.data.user.company._id);
            localStorage.setItem("userId" , res.data.data.user._id);
              axios.defaults.headers.common['Authorization'] = localStorage.getItem("Rjstoken");
              console.log(localStorage.getItem("Rjstoken"));
              // this.setState({
              //     email: '',
              //     password: '',
              //     apiStatus: true,
              //     // modalPopup:true,
              //     // successMessage:"Login Successfull...!"
              // });               

              setTimeout(
                function(){
                  swal("Successful!", "You are now logged in" , 'success' ,{button : 'continue' })
                  this.props.history.push("/");
                }.bind(this),
               1);               
          }else{
              console.error('login failed')              
          }
      })
      .catch(function (error) {
        console.log(error)
          this.setState({
            successMessage:undefined,
            error:error,
            apiStatus: false,
            // modalPopup:true,
            redirectToReferrer: false,
        });
        swal("Login failed!", "Incorrect Email or Password ", "error", {
          button: "Go to Login!",
        })
        }.bind(this));
        // setSubmitting(false)
        // this.toggleModelPopup();
  }
  
  render() {
    
  const {history} = this.props;
    return (
      <div className=" flex-col align-items-center " style={{marginTop:'8%'}}>

        <div className='form_gradient'></div>

        <div style={{textAlign:'center', marginBottom:'20px'}}>
          <h1 style={{color: '#32aedb' , textShadow: '1px 1px 2px black', fontWeight : 'bold' }}>User Management</h1>
          <h4 style={{color:'white' , textShadow: '1px 1px 2px black'}}>Login to your account</h4>
        </div>        
        <Container >
          <Row className="justify-content-center ">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                  <ToastContainer />
                <Formik
              enableReinitialize
              initialValues={this.state}
              validate={validate(validationSchema)}
              onSubmit={this.onSubmit}
              render={
                ({
                  values,
                  errors,
                  touched,
                  status,
                  dirty,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  isValid,
                  handleReset,
                  setTouched
                }) => (
                  <Row >
                    <Col lg="12">
                      <Form onSubmit={handleSubmit} noValidate name='simpleForm'>
                          <h1>Login</h1>
                          <p className="text-muted">Sign In to your account</p>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="email" name="email" placeholder="Enter your Email"
                              valid={!errors.email}
                              invalid={touched.email && !!errors.email}
                              //  autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email} 
                              style={{borderRadius:'2px'}}
                            />
                      <FormFeedback>{errors.email}</FormFeedback>
                          </InputGroup>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" id="password" name="password" placeholder="Enter password"
                              valid={!errors.password}
                              invalid={touched.password && !!errors.password}
                              //  autoFocus={true}
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password} 
                              style={{borderRadius:'2px'}}
                            />
                              <FormFeedback>{errors.password}</FormFeedback>
                          </InputGroup>
                          <Row>
                            <Col xs="6">
                              <Button type="submit" color="primary" className="px-4"  >Login </Button>
                           </Col>
                            <Col xs="6" className="text-right">
                              <Button 
                                type="Button"
                                color="link" 
                                className="px-0"
                                onClick= { () => alert("Your password has been reset")}
                              >
                                Forgot password?
                              </Button>
                            </Col>
                          </Row>
                          <Row className=" flex-col align-items-center" style={{marginTop:'10px'}}>
                            <Col lg="12" className="text-left">
                               New to User Management ? 
                              <Button 
                                style={{padding:'0px 0px 4.5px 0px' , marginLeft: '3px'}}
                                type="Button"
                                color="link" 
                                className="px-0"
                                onClick= { () => window.location = '/#/register' }
                              >
                                Sign Up
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                        </Col>
                        </Row>
                       )}
                        />
                  </CardBody>
                </Card>
                  <Card className="text-white py-5 bg-primary d-md-down-none login" style={{ width: '44%' }}>
                    <CardBody className="text-center">
                      <div>
                        {/* <img src={workweek_pro_logo} style={{paddingTop:"75px"}}></img> */}
                      </div>
                    </CardBody>
                  </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
        { this.state.modalPopup? <Modals successMessage={this.state.successMessage} error={this.state.error} apiStatus={this.state.apiStatus} redirectUrl={this.state.redirectUrl}/>: null }
         </div>
    );
  }
}

export default Login;

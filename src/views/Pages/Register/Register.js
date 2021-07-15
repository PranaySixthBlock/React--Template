import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row ,FormFeedback } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Register.css';
import axios from 'axios';
import swal from 'sweetalert';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone : Yup.string().required('Required')
  .min(10, 'Phone number should contain 10 numbers')
  .max(10, 'Phone number should contain 10 numbers'),
  password : Yup.string().required('Required'),
  companyName : Yup.string().required('Required')
  .min(2, 'Too Short!')
  .max(30, 'Too Long!')
});

class Register extends Component {

  state = {
    details:{
      fullName : 'Register',
      email : '',
      password : '',
      phone : '',
      companyName : '',
    }    
  }
  onSubmit = () => {
    // alert(JSON.stringify(this.state.details));
    axios.post(process.env.REACT_APP_BACKEND_API_URL+'/default/registartion/user', {
      "fullName"      : this.state.details.fullName,
      "email"         : this.state.details.email,
      "password"      : this.state.details.password,
      "phone"         : this.state.details.phone,
      "companyName"   : this.state.details.companyName
    })
      .then(response => {     
        // alert(response.data.status)
        console.log(response.data.token);
        // return response.data;
          if (response.data.status===200) {
            // localStorage.setItem("Rjstoken", response.data.token);
            //   axios.defaults.headers.common['Authorization'] = localStorage.getItem("Rjstoken");
            //   console.log(localStorage.getItem("Rjstoken"));
              // this.setState({
              //     email: '',
              //     password: '',
              //     companyName : '',
              //     phone : '',
              //     fullName : '',
              //     // apiStatus: true,
              //     // modalPopup:true,
              //     // successMessage:"Login Successfull...!"
              // }); 
              // alert("success")
              swal("Good job!", "Your Resgiration is successful!", "success", {
                button: "Go to Login!",
              }).then((okay) => {
                if(okay) {
                  window.location = '/#/login'
                }
              })              
              // setTimeout( () => window.location = '/#/login',
              //   // function(){
              //   //   this.props.history.push("/#/login");
              //   // }.bind(this),
              //  1000);               
          }
          else{
             alert('registration failed')              
          }
      })
      .catch((error) => {
        console.log(error.response.data.message)
        if(error.response.data.message === "[object Object]") {
          swal("Registration failed!", 'company name already exists' , "error");
        }
        else{
          swal("Registration failed!", `${error.response.data.message}`, "error");
        }
      })
  //     .catch(function (error) {
  //       console.log(error)
  //         this.setState({
  //           successMessage:undefined,
  //           error:error,
  //           apiStatus: false,
  //           // modalPopup:true,
  //           redirectToReferrer: false,
  //       });
  //       toast.error("Login Faild");
  //       }.bind(this));
  //       // setSubmitting(false)
  //       // this.toggleModelPopup();
  // }
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
        <Formik
              enableReinitialize
              initialValues={this.state.details}
              validationSchema = {DisplayingErrorMessagesSchema}
              // validate={validate(validationSchema)}
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
                  <Row className="justify-content-center">
                    <Col md="9" lg="7" xl="6">
                      <Card className="mx-4">
                        <CardBody className="p-4 register">
                          <Form onSubmit={handleSubmit} noValidate >
                            <h1>Register</h1>
                            <p className="text-muted">Create your account</p>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-user"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" placeholder="Username" autoComplete="username" value={values.fullName} name ="fullName"
                                valid={!errors.fullName}
                                invalid={touched.fullName && !!errors.fullName}
                                // onChange={(e) => this.setState({details : {...this.state.details , fullName:e.target.value}})}
                                onChange = {handleChange}
                                onBlur={handleBlur}
                              />
                              <FormFeedback>{errors.fullName}</FormFeedback>
                            </InputGroup>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>@</InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" placeholder="Email" autoComplete="email" value={values.email} name = 'email'
                                valid={!errors.email}
                                invalid={touched.email && !!errors.email}
                                onChange={(e) => this.setState({details : {...this.state.details , email:e.target.value}})}
                              />
                              <FormFeedback>{errors.email}</FormFeedback>
                            </InputGroup>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-phone"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input type="number" placeholder="Phone Number" autoComplete="phone-number" value={values.phone} name = 'phone'
                                valid={!errors.phone}
                                invalid={touched.phone && !!errors.phone}
                                onChange={(e) => this.setState({details : {...this.state.details , phone:e.target.value}})}
                              />
                              <FormFeedback>{errors.phone}</FormFeedback>
                            </InputGroup>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-lock"></i>
                                </InputGroupText>
                              </InputGroupAddon> 
                              <Input type="password" placeholder="Password" autoComplete="new-password" value={values.password} name = 'password'
                                valid={!errors.password}
                                invalid={touched.password && !!errors.password}
                                onChange={(e) => this.setState({details : {...this.state.details , password:e.target.value}})}
                              />
                              <FormFeedback>{errors.password}</FormFeedback>
                            </InputGroup>
                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-home"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" placeholder="Company Name" autoComplete="company" value={values.companyName}
                                valid={!errors.companyName}
                                invalid={touched.companyName && !!errors.companyName}
                                onChange={(e) => this.setState({details : {...this.state.details , companyName:e.target.value}})}
                              />
                              <FormFeedback>{errors.companyName}</FormFeedback>
                            </InputGroup>
                            <Button color="success" block type="submit">Create Account</Button>
                            <Row className=" flex-col align-items-center" style={{marginTop:'20px'}}>
                                    <Col lg="12" className="text-center">
                                      Already have an account ? 
                                      <Button 
                                        style={{padding:'0px 0px 4.5px 0px' , marginLeft: '3px'}}
                                        type="Button"
                                        color="link" 
                                        className="px-0"
                                        onClick= { () => window.location = '/#/login' }
                                      >
                                        Login
                                      </Button>
                                    </Col>
                                  </Row>
                          </Form>
                        </CardBody>
                        {/* <CardFooter className="p-4">
                          <Row>
                            <Col xs="12" sm="6">
                              <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                            </Col>
                            <Col xs="12" sm="6">
                              <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                            </Col>
                          </Row>
                        </CardFooter> */}
                      </Card>
                    </Col>
                  </Row>
                       )}
                        />
         
        </Container>
      </div>
    );
  }
}

export default Register;

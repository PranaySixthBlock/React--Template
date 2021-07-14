import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  InputGroup,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Row,
  FormText,
} from "reactstrap";
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { validationSchema, validate } from "./CreateAuditValidation";
import Select from "react-select";
import "react-select/dist/react-select.min.css";
import _ from "lodash";
import moment from "moment";
import * as Yup from "yup";
import axios from 'axios'

// const validationSchema = Yup.object({
//   Name : Yup.string().required('Required'),
//   Email : Yup.string().required('Required').email('Invalid email address'),
// })

const DisplayingErrorMessagesSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  role : Yup.string().required('Required'),
  phone : Yup.string().required('Required')
  .min(10, 'Phone number should contain 10 numbers')
  .max(10, 'Phone number should contain 10 numbers'),
  password : Yup.string().required('Required'),
  address : Yup.string().required('Required')
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
});

const presentdate = moment().format("YYYY-MM-DD");
export default class EditStorerooms extends Component {
  state = {
    id: undefined,
    companyId: localStorage.getItem("companyId"),
    permissions: {
      canCreate: false,
      canView: false,
      canUpdate: false,
      canDelete: false,
    },
    Location: "",
    auditName: "",
    assetTypeId: "",
    auditUserId: "",
    startDate: "",
    endDate: "",
    locationData: [
            {id:"1",name:"hyd"},
            {id:"2",name:"vizag"},
            {id:"3",name:"guntur"},
            {id:"4",name:"kphb"}],
    assetTypeIdData: [],
    auditUserData: [],
    status: false,
    auditStatusData: [],
    Input : {
      fullName : 'Teja',
      role : '',
      phone : '' , 
      email : '' ,
      password : '' ,
      address : '' ,
    }
    
  };

  componentDidMount () {
    let token=localStorage.getItem("Rjstoken")
        let config = {
          headers: {
            'Authorization': token
          }
        }
    let userId = localStorage.getItem('userId');
    let companyId = localStorage.getItem('companyId');
    axios.get(process.env.REACT_APP_BACKEND_API_URL+ '/company/asset/dropdown/values/60ed5d963df1053630d3ae26')
    .then(response => {
      // console.log(response.data.data.roles)
     //  this.setState({
     //    Input : { ...this.state.Input , Role : response.data.data.roles }
     //  })
     //  console.log(this.state.Input.Role)     
    })
    if(this.props.match.params.id != 'new'){
      axios.get(process.env.REACT_APP_BACKEND_API_URL + '/display/company/member/' + this.props.match.params.id , config)
    .then(response => {
      console.log(response.data.data.data.role.roleName)
      let dummy = this.state.Input;
      dummy.fullName = response.data.data.data.fullName
      dummy.phone = response.data.data.data.phone
      dummy.email = response.data.data.data.email
      dummy.password = response.data.data.data.fullName
      dummy.address = response.data.data.data.address
      dummy.role = response.data.data.data.role.roleName
      this.setState({
        Input : dummy
      })
    })
    }
    
  }

  onSubmit = () => {
    let token=localStorage.getItem("Rjstoken")
        let config = {
          headers: {
            'Authorization': token
          }
        }
        if (this.props.match.params.id != 'new') {
          let token=localStorage.getItem("Rjstoken")
          let config = {
          headers: {
            'Authorization': token
          }
        }
          axios.put(process.env.REACT_APP_BACKEND_API_URL+ '/update/company/member/' + this.props.match.params.id , this.state.Input , config)
          .then (response => {
            console.log(response)
          })  
        }
        else{
          let userId = localStorage.getItem('userId');
          axios.post(process.env.REACT_APP_BACKEND_API_URL+ '/add/members/company/' + userId , this.state.Input , config)
          .then(response => {
            if(response.status === 200){
              console.log(response)
              this.props.history.push("/users/");
            }
            else{
              console.log(response.message)
            }
        })
        }
    
    
  }

  // handleChange = (e) => {
    
  // }

  
  render() {
    return (
      <div className="animated fadeIn">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          style={{ zIndex: "1999" }}
        />
        <br></br>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="chevron-bottom pr-1"></i>
                  {this.state.id ? "Edit" : `Create`}
                </strong>
              </CardHeader>
              <CardBody>
                <Formik
                  enableReinitialize={true}
                  initialValues={this.state.Input}
                  // validate={validationSchema}
                  validationSchema = {DisplayingErrorMessagesSchema}
                  onSubmit={this.onSubmit}
                  render={({
                    keepDirtyOnReinitialize,
                    setFieldValue,
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
                    setTouched,
                  }) => (
                    <Form onSubmit={handleSubmit} noValidate name="simpleForm">
                      <Row form>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="Name">Name *</Label>
                            <Input
                              type="text"
                              name="Name"
                              id="Name"
                              valid={!errors.Name}
                              invalid={touched.Name && !!errors.Name}
                              required
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , fullName : e.target.value}
                                })
                                }}
                              onBlur={handleBlur}
                              value={values.fullName}
                            />
                            <FormText className="help-block">Please enter your name</FormText>
                            <FormFeedback>{errors.Name}</FormFeedback>
                          </FormGroup>
                        </Col>
                        
                        <Col md={4}>
                          <FormGroup>
                            <Label for="Role">Role *</Label>
                            <Input
                              type='select'
                              name="Role"
                              id="Role"
                              multi
                              value={values.role}
                              valid={!errors.Role}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.Role && !!errors.Role}
                              options={this.state.locationData }
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , role : e.target.value}
                                })
                                
                                
                              }}
                              onBlur={handleBlur}
                            >
                              <option value="0"></option>
                              <option value="60ed5d963df1053630d3ae24">SUPERUSER</option>
                              <option value="60ed65b6648f122630ad826a">CEO</option>
                              <option value="60ed668d648f122630ad82d9">EMPLOYEE</option>
                            </Input>
                            <FormText className="help-block">Please select your role</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.Role}
                            </div>
                          </FormGroup>
                        </Col>
                        {/* <Col md={4}>
                          <FormGroup>
                            <Label for="Location">Project/Location *</Label>
                            <Input
                              type='select'
                              name="Location"
                              id="Location"
                              multi
                              value={values.Location}
                              valid={!errors.Location}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.Location && !!errors.Location}
                              options={this.state.locationData}
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , Location : e.target.value}
                                })                         
                                }}
                              onBlur={handleBlur}
                            >
                              <option value="0"></option>
                              <option value="Hyderabad">Hyderabad</option>
                              <option value="Warangal">Warangal</option>
                              <option value="Vijayawada">Vijayawada</option>
                            </Input>
                            <FormText className="help-block">Please select your location</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.Location}
                            </div>
                          </FormGroup>
                        </Col> */}
                        <Col md={4}>
                          <FormGroup>
                            <Label for="number">Phone Number *</Label>
                            <Input
                              type="text"
                              name="number"
                              id="number"
                              valid={!errors.number}
                              invalid={touched.number && !!errors.number}
                              required
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , phone : e.target.value}
                                })                         
                                }}
                              onBlur={handleBlur}
                              value={values.phone}
                            />
                            <FormText className="help-block">Please enter your phone number</FormText>
                            <FormFeedback>{errors.number}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="Email">Email *</Label>
                            <Input
                              type="text"
                              name="Email"
                              id="Email"
                              valid={!errors.Email}
                              invalid={touched.Email && !!errors.Email}
                              required
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , email : e.target.value}
                                })                         
                                }}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                            <FormText className="help-block">Please enter your email</FormText>
                            <FormFeedback>{errors.Email}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="Password">Password *</Label>
                            <Input
                              type="password"
                              name="Password"
                              id="Password"
                              valid={!errors.Password}
                              invalid={touched.Password && !!errors.Password}
                              required
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , password : e.target.value}
                                })                         
                                }}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                            <FormText className="help-block">Please enter your password</FormText>
                            <FormFeedback>{errors.Password}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="Address">Address *</Label>
                            <Input
                              type="text"
                              name="Address"
                              id="Address"
                              valid={!errors.Address}
                              invalid={touched.Address && !!errors.Address}
                              required
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , address : e.target.value}
                                })                         
                                }}
                              onBlur={handleBlur}
                              value={values.address}
                            />
                            <FormText className="help-block">Please enter your address</FormText>
                            <FormFeedback>{errors.Address}</FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Row className="justify-content-center">
                              <Col
                                md={2}
                                col="6"
                                sm="4"
                                className="mb-3 mb-xl-0"
                              >
                                <Button
                                  type="Button"
                                  block
                                  outline
                                  color="danger"
                                  onClick={this.props.history.goBack}
                                  className="mr-1"
                                >
                                  Cancel
                                </Button>
                              </Col>
                              <Col
                                md={2}
                                col="6"
                                sm="4"
                                className="mb-3 mb-xl-0"
                              >
                                <Button
                                  type="submit"
                                  block
                                  outline
                                  color="primary"
                                  className="mr-1"
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? "Submitting" : "Submit"}
                                </Button>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  )}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

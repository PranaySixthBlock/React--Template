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
import { AppSwitch } from '@coreui/react'

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
//   role : Yup.string().required('Required'),
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
    Input : {
      tender : 'Teja',
      department : '',
      country : '' , 
      state : '' ,
      city : '' ,
      departmentContact1 : 'dc1' ,
      departmentContact2 : 'dc2' ,
      tenderDocuments : '' ,
      tenderOwner : 'to' ,
      emdAmount : 'eA' ,
      emdPaid : 'eP' ,
      refundDate : 'rd' ,
      lastDate : 'ld' ,
      consortium : '' ,
      statusDropdown : '' ,
      primaryContact : 'pc' ,
      secondaryContact : 'sc' ,
      thirdContact : 'tc' ,
      partners : [
        {Name : 'Pranay' , contactPerson : 'block' , company : '' , role : ''},
      ]
    },
    options : [
        {
            label : 'Select',
            value : ''
        },
        {
            label : 'Yes',
            value : 'yes'
        },
        {
            label : 'No',
            value : 'no'
        },
    ],
    consortium : true ,
    count : 0,   
  };

  componentDidMount () {
    // let token=localStorage.getItem("Rjstoken")
    //     let config = {
    //       headers: {
    //         'Authorization': token
    //       }
    //     }
    // let userId = localStorage.getItem('userId');
    // let companyId = localStorage.getItem('companyId');
    // axios.get(process.env.REACT_APP_BACKEND_API_URL+ '/company/asset/dropdown/values/' + companyId)
    // .then(response => {
    //   console.log(response.data.data.roles)
    //   let copy = []
    //   copy.push({
    //     label : 'Select',
    //     value : ''
    //   })
    //   response.data.data.roles.forEach((e,index) => {
    //     copy.push ({
    //       label : e.roleName,
    //       value : e._id
    //     })
    //   })
    //   this.setState({
    //     options : copy
    //   })    
    // })    
  }

  onSubmit = () => {
    alert(`${JSON.stringify(this.state.Input)}`)
  }
  
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
                //   validationSchema = {DisplayingErrorMessagesSchema}
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
                            <Label for="tender">tender *</Label>
                            <Input
                              type='select'
                              name="tender"
                              id="tender"
                              multi
                            //   value={this.state.role.value}
                              valid={!errors.tender}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.tender && !!errors.tender}
                              options={this.state.locationData }
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , tender : e.target.value}
                                })                            
                                
                              }}
                              onBlur={handleBlur}
                            >
                              {this.state.options.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your tender</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.tender}
                            </div>
                          </FormGroup>
                        </Col> 
                        <Col md={4}>
                          <FormGroup>
                            <Label for="department">department *</Label>
                            <Input
                              type='select'
                              name="department"
                              id="department"
                              multi
                            //   value={this.state.department.value}
                              // defaultValue={values.department}
                              valid={!errors.department}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.department && !!errors.department}
                              options={this.state.locationData }
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , department : e.target.value}
                                })                            
                                
                              }}
                              onBlur={handleBlur}
                            >
                              {this.state.options.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your department</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.department}
                            </div>
                          </FormGroup>
                        </Col> 
                        <Col md={4}>
                          <FormGroup>
                            <Label for="country">country *</Label>
                            <Input
                              type='select'
                              name="country"
                              id="country"
                              multi
                            //   value={this.state.country.value}
                              // defaultValue={values.country}
                              valid={!errors.country}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.country && !!errors.country}
                              options={this.state.locationData }
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , country : e.target.value}
                                })                            
                                
                              }}
                              onBlur={handleBlur}
                            >
                              {this.state.options.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your country</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.country}
                            </div>
                          </FormGroup>
                        </Col>   
                        </Row>
                        <Row Form>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="state">state *</Label>
                            <Input
                              type='select'
                              name="state"
                              id="state"
                              multi
                            //   value={this.state.state.value}
                              // defaultValue={values.state}
                              valid={!errors.state}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.state && !!errors.state}
                              options={this.state.locationData }
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , state : e.target.value}
                                })                            
                                
                              }}
                              onBlur={handleBlur}
                            >
                              {this.state.options.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your state</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.state}
                            </div>
                          </FormGroup>
                        </Col>  
                        <Col md={4}>
                          <FormGroup>
                            <Label for="city">city *</Label>
                            <Input
                              type='select'
                              name="city"
                              id="city"
                            //   value={this.state.city.value}
                              // defaultValue={values.city}
                              valid={!errors.city}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.city && !!errors.city}
                              options={this.state.locationData }
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , city : e.target.value}
                                })                            
                                
                              }}
                              onBlur={handleBlur}
                            >
                              {this.state.options.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your city</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.city}
                            </div>
                          </FormGroup>
                        </Col>                                  
                        <Col md={4}>
                          <FormGroup>
                            <Label for="departmentContact1">departmentContact1 Number *</Label>
                            <Input
                              type="text"
                              name="departmentContact1"
                              id="departmentContact1"
                              valid={!errors.departmentContact1}
                              invalid={touched.departmentContact1 && !!errors.departmentContact1}
                              required                             
                              onChange = {handleChange}
                              onBlur={(e) => {this.setState(
                                   {
                                    Input : {...this.state.Input , departmentContact1 : e.target.value}
                                  })                         
                                  }}
                              value={values.departmentContact1}
                            />
                            <FormText className="help-block">Please enter your departmentContact1 number</FormText>
                            <FormFeedback>{errors.departmentContact1}</FormFeedback>
                          </FormGroup>
                        </Col>
                        </Row>
                        <Row Form>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="departmentContact2">departmentContact2 *</Label>
                            <Input
                              type="text"
                              name="departmentContact2"
                              id="departmentContact2"
                              valid={!errors.departmentContact2}
                              invalid={touched.departmentContact2 && !!errors.departmentContact2}
                              required                              
                              onChange = {handleChange}
                              onBlur={(e) => {this.setState(
                                   {
                                    Input : {...this.state.Input , departmentContact2 : e.target.value}
                                  })                         
                                  }}
                              value={values.departmentContact2}
                            />
                            <FormText className="help-block">Please enter your departmentContact2</FormText>
                            <FormFeedback>{errors.departmentContact2}</FormFeedback>
                          </FormGroup>
                        </Col>                        
                        <Col md={4}>
                          <FormGroup>
                            <Label for="tenderOwner">tenderOwner *</Label>
                            <Input
                              type="text"
                              name="tenderOwner"
                              id="tenderOwner"
                              valid={!errors.tenderOwner}
                              invalid={touched.tenderOwner && !!errors.tenderOwner}
                              required
                              onChange={handleChange}
                              onBlur={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , tenderOwner : e.target.value}
                                })                         
                                }}
                              value={values.tenderOwner}
                            />
                            <FormText className="help-block">Please enter your tenderOwner</FormText>
                            <FormFeedback>{errors.tenderOwner}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="emdAmount">emdAmount *</Label>
                            <Input
                              type="text"
                              name="emdAmount"
                              id="emdAmount"
                              valid={!errors.emdAmount}
                              invalid={touched.emdAmount && !!errors.emdAmount}
                              required
                              onChange={handleChange}
                              onBlur={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , emdAmount : e.target.value}
                                })                         
                                }}
                              value={values.emdAmount}
                            />
                            <FormText className="help-block">Please enter your emdAmount</FormText>
                            <FormFeedback>{errors.emdAmount}</FormFeedback>
                          </FormGroup>
                        </Col>
                        </Row>
                        <Row Form>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="emdPaid">emdPaid *</Label>
                            <Input
                              type="text"
                              name="emdPaid"
                              id="emdPaid"
                              valid={!errors.emdPaid}
                              invalid={touched.emdPaid && !!errors.emdPaid}
                              required
                              onChange={handleChange}
                              onBlur={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , emdPaid : e.target.value}
                                })                         
                                }}
                              value={values.emdPaid}
                            />
                            <FormText className="help-block">Please enter your emdPaid</FormText>
                            <FormFeedback>{errors.emdPaid}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="refundDate">refundDate *</Label>
                            <Input
                              type="text"
                              name="refundDate"
                              id="refundDate"
                              valid={!errors.refundDate}
                              invalid={touched.refundDate && !!errors.refundDate}
                              required
                              onChange={handleChange}
                              onBlur={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , refundDate : e.target.value}
                                })                         
                                }}
                              value={values.refundDate}
                            />
                            <FormText className="help-block">Please enter your refundDate</FormText>
                            <FormFeedback>{errors.refundDate}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="lastDate">lastDate *</Label>
                            <Input
                              type="text"
                              name="lastDate"
                              id="lastDate"
                              valid={!errors.lastDate}
                              invalid={touched.lastDate && !!errors.lastDate}
                              required
                              onChange={handleChange}
                              onBlur={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , lastDate : e.target.value}
                                })                         
                                }}
                              value={values.lastDate}
                            />
                            <FormText className="help-block">Please enter your lastDate</FormText>
                            <FormFeedback>{errors.lastDate}</FormFeedback>
                          </FormGroup>
                        </Col>     
                        </Row>
                        <Row Form>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="consortium">consortium *</Label>
                          <div style={{marginTop:'1px' , marginLeft:'10px'}}></div>
                          <AppSwitch
                            name="consortium"
                            id="consortium"
                            className={"mx-1"}
                            variant={"3d"}
                            color={"primary"}
                            // disabled={ownerStatus}
                            label
                            dataOn={"\u2713"}
                            dataOff={"\u2715"}
                            onChange={(e) => this.setState({consortium : e.target.checked})}
                            checked={this.state.consortium}
                        />                            
                            <FormText className="help-block">Please select your consortium</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.consortium}
                            </div>
                          </FormGroup>
                        </Col>                     
                        <Col md={4}>
                          <FormGroup>
                            <Label for="statusDropdown">Status *</Label>
                            <Input
                              type='select'
                              name="statusDropdown"
                              id="statusDropdown"
                              multi
                            //   value={this.state.statusDropdown.value}
                              // defaultValue={values.statusDropdown}
                              valid={!errors.statusDropdown}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.statusDropdown && !!errors.statusDropdown}
                              options={this.state.locationData }
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , statusDropdown : e.target.value}
                                })                            
                                
                              }}
                              onBlur={handleBlur}
                            >
                              {this.state.options.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your statusDropdown</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.statusDropdown}
                            </div>
                          </FormGroup>
                        </Col>  
                        <Col md={4}>
                          <FormGroup>
                            <Label for="primaryContact">primaryContact Number *</Label>
                            <Input
                              type="text"
                              name="primaryContact"
                              id="primaryContact"
                              valid={!errors.primaryContact}
                              invalid={touched.primaryContact && !!errors.primaryContact}
                              required                             
                              onChange = {handleChange}
                              onBlur={(e) => {this.setState(
                                   {
                                    Input : {...this.state.Input , primaryContact : e.target.value}
                                  })                         
                                  }}
                              value={values.primaryContact}
                            />
                            <FormText className="help-block">Please enter your primaryContact number</FormText>
                            <FormFeedback>{errors.primaryContact}</FormFeedback>
                          </FormGroup>
                        </Col>
                        </Row>
                        {this.state.consortium && this.state.Input.partners.map((e , index) => (
                          <Row key={index}>
                          <Col md={3}>
                          <FormGroup>
                            <Label for='Name'> Name  *</Label>
                            <Input
                              type="text"
                              name="Name"
                              id="Name"
                              valid={!errors.Name}
                              invalid={touched.Name && !!errors.Name}
                              required                             
                              onChange = {(e)=> {
                                  let copy = this.state.Input.partners
                                  copy[index].Name = e.target.value
                                  this.setState({
                                    Input : { ...this.state.Input , partners : copy }
                                  })
                                  console.log(this.state.Input.partners)
                              }}
                              onBlur={handleBlur}
                              value={values.partners[index].Name }
                            />
                            <FormText className="help-block">Please enter your Name </FormText>
                            <FormFeedback>{errors.Name}</FormFeedback>
                          </FormGroup>
                          </Col>
                          <Col md={3}>
                          <FormGroup>
                            <Label for="contactPerson">contactPerson  *</Label>
                            <Input
                              type="text"
                              name="contactPerson"
                              id="contactPerson"
                              valid={!errors.contactPerson}
                              invalid={touched.contactPerson && !!errors.contactPerson}
                              required                             
                              onChange = {(e)=> {
                                let copy = this.state.Input.partners
                                copy[index].contactPerson = e.target.value
                                this.setState({
                                  Input : { ...this.state.Input , partners : copy }
                                })
                            }}
                              onBlur={handleBlur}
                              value={this.state.Input.partners[index].contactPerson}
                            />
                            <FormText className="help-block">Please enter your thirdContact </FormText>
                            <FormFeedback>{errors.thirdContact}</FormFeedback>
                          </FormGroup>
                          </Col >
                          <Col md={3}>
                          <FormGroup>
                            <Label for="company">company *</Label>
                            <Input
                              type='select'
                              name="company"
                              id="company"
                            //   value={this.state.company.value}
                              // defaultValue={values.company}
                              valid={!errors.company}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.company && !!errors.company}
                              options={this.state.locationData }
                              onChange={(e) => {
                                let copy = this.state.Input.partners
                                copy[index].company = e.target.value
                                this.setState(
                                {
                                  Input : {...this.state.Input , partners : copy}
                                })                          
                             }}
                              onBlur={handleBlur}
                            >
                              {this.state.options.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your company</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.company}
                            </div>
                          </FormGroup>
                        </Col>   
                        <Col md={3}>
                          <FormGroup>
                            <Label for="role">role *</Label>
                            <Input
                              type='select'
                              name="role"
                              id="role"
                            //   value={this.state.role.value}
                              // defaultValue={values.role}
                              valid={!errors.role}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.role && !!errors.role}
                              options={this.state.locationData }
                              onChange={(e) => {
                                let copy = this.state.Input.partners
                                copy[index].role = e.target.value
                                this.setState(
                                {
                                  Input : {...this.state.Input , partners : copy }
                                })                            
                                
                              }}
                              onBlur={handleBlur}
                            >
                              {this.state.options.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your role</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.role}
                            </div>
                          </FormGroup>
                        </Col>   
                      </Row>
                      ))}
                      {this.state.consortium && (
                          <Row  className="justify-content-center text-center" style={{marginBottom:'30px' }}>
                          <Col
                              md={2}
                            >
                                <i className="fa fa-plus" aria-hidden="true" style={{cursor:'pointer'}}
                                onClick={() => {
                                    let copy = this.state.Input.partners
                                    copy.push({Name : '' , contactPerson : '' , company : '' , role : ''})
                                    this.setState({
                                        Input : { ...this.state.Input , partners : copy }
                                    })
                                }}
                                ></i>                             
                            </Col>
                            <Col
                              md={2}
                            >
                            <i className="fa fa-minus" aria-hidden="true" style={{cursor:'pointer'}}
                                onClick={() => {
                                let copy = this.state.Input.partners
                                copy.pop()
                                this.setState({
                                    Input : {...this.state.Input , partners : copy}
                                });
                                }}>

                            </i>
                            </Col>
                    </Row>
                      )}
                        <Row Form>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="secondaryContact">secondaryContact Number *</Label>
                            <Input
                              type="text"
                              name="secondaryContact"
                              id="secondaryContact"
                              valid={!errors.secondaryContact}
                              invalid={touched.secondaryContact && !!errors.secondaryContact}
                              required                             
                              onChange = {handleChange}
                              onBlur={(e) => {this.setState(
                                   {
                                    Input : {...this.state.Input , secondaryContact : e.target.value}
                                  })                         
                                  }}
                              value={values.secondaryContact}
                            />
                            <FormText className="help-block">Please enter your secondaryContact number</FormText>
                            <FormFeedback>{errors.secondaryContact}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="thirdContact">thirdContact Number *</Label>
                            <Input
                              type="text"
                              name="thirdContact"
                              id="thirdContact"
                              valid={!errors.thirdContact}
                              invalid={touched.thirdContact && !!errors.thirdContact}
                              required                             
                              onChange = {handleChange}
                              onBlur={(e) => {this.setState(
                                   {
                                    Input : {...this.state.Input , thirdContact : e.target.value}
                                  })                         
                                  }}
                              value={values.thirdContact}
                            />
                            <FormText className="help-block">Please enter your thirdContact number</FormText>
                            <FormFeedback>{errors.thirdContact}</FormFeedback>
                          </FormGroup>
                        </Col>
                        {/* <Col md={4}>
                          <FormGroup>
                            <Label for="tenderDocuments">tenderDocuments *</Label>
                            <Input
                              style={{marginTop:'5px'}}
                              type="file"
                              name="tenderDocuments"
                              id="tenderDocuments"
                              valid={!errors.tenderDocuments}
                              invalid={touched.tenderDocuments && !!errors.tenderDocuments}
                              required                              
                              onChange = {handleChange}
                              onBlur={(e) => {this.setState(
                                   {
                                     Input : {...this.state.Input , tenderDocuments : e.target.value}
                                   })                         
                                   }}
                              value={values.tenderDocuments}
                            />
                            <FormText className="help-block" style={{marginTop:'8px'}} >Please enter your tenderDocuments</FormText>
                            <FormFeedback  >{errors.tenderDocuments}</FormFeedback>
                          </FormGroup>
                        </Col> */}
                       
                      </Row>
 {/* //=========================================================================================================================================*/}

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

{/* <Col md={4}>
                          <FormGroup>
                            <Label for="tender">Name *</Label>
                            <Input
                              type="text"
                              name="tender"
                              id="tender"
                              valid={!errors.tender}
                              invalid={touched.tender && !!errors.tender}
                              required                            
                              onChange = {handleChange}
                              onBlur={(e) => {this.setState(
                                   {
                                     Input : {...this.state.Input , tender : e.target.value}
                                   })
                                   }}
                              value={values.tender}
                            />
                            <FormText className="help-block">Please enter tender name</FormText>
                            <FormFeedback>{errors.tender}</FormFeedback>
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
                              value={this.state.role.value}
                              // defaultValue={values.role}
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
                              {this.state.options.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
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
                        </Col>       */}
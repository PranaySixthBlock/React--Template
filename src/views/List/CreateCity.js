import React, { Component } from 'react'
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
  import { AppSwitch } from '@coreui/react'
  import axios from 'axios'

export default class CreateCountry extends Component {

    state = {
            options : [],
            name : "",
            status : '' ,
            state : ''
    }

    componentDidMount () {
        let companyId = localStorage.getItem("companyId");
        console.log(companyId);
        axios.get(process.env.REACT_APP_BACKEND_API_URL + '/all/state/dropdowns/' + companyId)
        .then (response => {
            // console.log(response.data.data)
            let copy = []
            response.data.data.forEach((e,index) => {
                copy.push({
                    label : e.name,
                    value : e._id
                })
            })
            this.setState({
                options : copy,
            })
            console.log(this.state.options)
        })
        let id = this.props.match.params.id;
        if(id != 'new'){
        axios.get(process.env.REACT_APP_BACKEND_API_URL + '/get/company/city/dropdown/' + id)
        .then(response => {
            console.log(response.data.data)
            this.setState({name:response.data.data[0].name})
            this.setState({status : response.data.data[0].status})
            this.setState({state : response.data.data[0].stateId})
        })
    }
    }

    onSubmit = () => {
        let id = this.props.match.params.id;
        if(id != 'new'){
            axios.put(process.env.REACT_APP_BACKEND_API_URL + '/update/company/city/dropdown/' + id , {
                name : this.state.name,
                status : this.state.status? "1" : "0",
                stateId : this.state.state
            })
            .then (response => {
                console.log(response)
                this.props.history.push("/city");
            })
        }
        else{
            let companyId = localStorage.getItem("companyId");
        axios.post(process.env.REACT_APP_BACKEND_API_URL + '/create/new/city/dropdown/' + companyId , {
            name : this.state.name,
            stateId : this.state.state
        })
        .then (response => {
            console.log(response);
            this.props.history.push("/city");
        })
        .catch (err => {
            console.log(err);
        })
        }        
    }
    render() {
        return (
            <div>
                <Row>
          <Col sm={12} style={{ marginTop:'50px'}}>
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
                  initialValues={this.state}
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
                            <Label for="Country">State *</Label>
                            <Input
                              type='select'
                              name="Country"
                              id="Country"
                              multi
                              value={this.state.state}
                              // defaultValue={values.Country}
                              valid={!errors.Country}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.Country && !!errors.Country}
                              options={this.state.locationData }
                              onChange={(e) => {this.setState(
                                {
                                   state : e.target.value
                                })                          
                              }}
                              onBlur={handleBlur}
                            >
                              {this.state.options.map((option) => (
                              <option value={option.value} key ={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your State</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.Country}
                            </div>
                          </FormGroup>
                        </Col> 
                        <Col md={4}>
                          <FormGroup>
                            <Label for="name">City *</Label>
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              valid={!errors.name}
                              invalid={touched.name && !!errors.name}
                              required
                              // onChange={(e) => this.setState({name:e.target.value})}
                              onChange = {handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                            />
                            <FormText className="help-block">Please enter the city name</FormText>
                            <FormFeedback>{errors.name}</FormFeedback>
                          </FormGroup>
                        </Col>
                        {/* {console.log(values.role)} */}                        
                        <Col >
                        <FormGroup className="text-center">
                            <Label for="status" class="switch switch-3d switch-primary" >Status *</Label>
                            <div style={{marginTop:'1px' , marginLeft:'10px'}}></div>
                            <AppSwitch
                                name="status"
                                id="status"
                                className={"mx-1"}
                                variant={"3d"}
                                color={"primary"}
                                // disabled={ownerStatus}
                                label
                                dataOn={"\u2713"}
                                dataOff={"\u2715"}
                                onChange={(e) => this.setState({status: e.target.checked})}
                                checked={this.state.status}
                            />
                            <FormText className="help-block">Please select the status</FormText>
                            <FormFeedback>{errors.status}</FormFeedback>
                          </FormGroup>          
                        </Col>
                       
                       </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Row className="justify-content-center">
                              <Col
                                md ={2}
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
                                md ={2}
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
                                //   disabled={isSubmitting}
                                >
                                  {/* {isSubmitting ? "Submitting" : "Submit"} */}
                                  Submit
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
        )
    }
}


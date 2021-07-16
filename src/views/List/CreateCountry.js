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
  import * as Yup from 'yup';
  import axios from 'axios'

  const validationSchema = function (values) {
    return Yup.object().shape({
      name: Yup.string()
      .required('Email is required'),
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
export default class CreateCountry extends Component {

    state = {
            type : this.props.match.params.type,
            name : "",
            status : '' ,        
    }

    componentDidMount () {
        let id = this.props.match.params.id;
        let type = this.props.match.params.type;
        console.log(type)
        if(id != 'new'){
        axios.get(process.env.REACT_APP_BACKEND_API_URL + '/get/company/dropdown/' + id)
        .then(response => {
            console.log(response.data.data)
            this.setState({name:response.data.data[0].name})
            this.setState({status:response.data.data[0].status})
        })
    }}

    onSubmit = () => {
        let id = this.props.match.params.id;
        if(id != 'new'){
            axios.put(process.env.REACT_APP_BACKEND_API_URL + '/update/company/dropdown/' + id , {
                name : this.state.name,
                status:this.state.status? "1" : "0",
                type : this.state.type
            })
            .then (response => {
                console.log(response)
                this.props.history.push(`/${this.state.type}`);
            })
        }
        else{
            let companyId = localStorage.getItem("companyId");
        axios.post(process.env.REACT_APP_BACKEND_API_URL + '/create/new/user/dropdown/' + companyId , {
            name : this.state.name,
            status : this.state.status,
            type : this.state.type
        })
        .then (response => {
            console.log(response);
            this.props.history.push(`/${this.state.type}`);
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
                  validate={validate(validationSchema)}
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
                            <Label for="name">{this.state.type }</Label>
                            <Input
                              type="text"
                              name="name"
                              // id="name"
                              valid={!errors.name}
                              invalid={touched.name && !!errors.name}
                              required
                              // onChange={(e) => this.setState({name:e.target.value})}
                              onChange = {handleChange}
                              onBlur={(e) => this.setState({name:e.target.value})}
                              value={values.name}
                            />
                            <FormText className="help-block">Please enter the {this.state.type} name</FormText>
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


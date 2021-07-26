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
  import readXlsxFile from 'read-excel-file'
  import * as XLSX from 'xlsx';


export default class CreateCountry extends Component {

    state = {
            options : [ 
              {
                value: 'TenderCategory',
                label : 'TenderCategory'
              } , 
              {
                value: 'Department',
                label : 'Department'
              } , 
              {
                value: 'Country',
                label : 'Country'
              }],
            name : '',
            Country : ''
    }

table = (e) => {
  console.log(e)
}

   handleUpload = (e) => {

      var files = e.target.files, f = files[0];
      var reader = new FileReader();
       reader.readAsBinaryString(f)
       var dataParse = []
       const handleName  = async(name) => {
         console.log(name[0])

         await this.setState({
           name : name
         } )
       }
       reader.onload =  function (e) {
          var data = e.target.result;
          let readedData = XLSX.read(data, {type: 'binary'});
          const wsname = readedData.SheetNames[0];
          const ws = readedData.Sheets[wsname];
  
          /* Convert array to json*/
          // var dataParse = []
          dataParse = XLSX.utils.sheet_to_json(ws, {header:1});
          console.log(dataParse)
          // this.setState({
          //   name : dataParse
          // } , () => console.log(this.state.name))
          handleName(dataParse)
      };
     
      
  }

    render() {
      console.log(this.state.name)
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
                            <Label for="Country">Type *</Label>
                            <Input
                              type='file'
                              name="Country"
                              id="Country"
                              multi
                              // value={this.state.Country}
                              // defaultValue={values.Country}
                              valid={!errors.Country}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.Country && !!errors.Country}
                              options={this.state.locationData }
                              onChange={ (e) => this.handleUpload(e)
                              }
                              onBlur={handleBlur}
                            >
                            </Input>
                            
                            <FormText className="help-block">Please select the Type</FormText>
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
        <Row>
                        <Col>
                          <Card>
                            <CardBody>
                       
                        {this.state.name == [] ? 
                          <table className=' table bordered table' style={{textAlign:'center' , padding:'10px'}} >
                            
                          </table>
                      : <table>
                      
                      {this.state.name.map((e , index)=>{
                        console.log(e , index)  
                        if(index === 0){
                          return (
                          <tr>
                          {e.map((th) => (
                            <th style={{margin:'25px', padding:'10px'}}>{th}</th>
                          ))}
                          </tr>
                      )
                      }else{
                        return (
                          <tr>
                          {e.map((td) => (
                            <td style={{margin:'25px',  padding:'10px'}}>{td}</td>
                          ))}
                          </tr>
                      )
                        }

                      }                        
                      )}
                      
                    </table>
                    }
                       
                        </CardBody>
                        </Card>
                        </Col>
                        </Row>      
            </div>
        )
    }
}


import React, { Component , Suspense} from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Col,
    Row,
    CardFooter,
    FormGroup,
    ButtonDropdown,
    DropdownToggle,
    Input,
    Badge,
    Table,
    DropdownMenu,
    ButtonGroup,
    FormFeedback,
    UncontrolledTooltip,
    Label,
  } from "reactstrap";
  import { Formik , Form } from "formik";
  import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
  import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
  import DatatableOptions from "../../containers/DefaultDatatableOptions/DefaultDatatableOptions";
  import axios from 'axios'
  import Typography from '@material-ui/core/Typography';
  import Box from '@material-ui/core/Box';
  // import Button from '@material-ui/core/Button';
  import Popover from '@material-ui/core/Popover';
  import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
  import { toast, ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import swal from 'sweetalert';

export default class Country extends Component {

    state = {
        AssetsData: [],
        Input : {
          country : '',
          state : ''
        },
        options : [],
        options1 : [],
        type : 'country'
    }

    indexN(cell, row, enumObject, index) {
        return (<div>{index+1}</div>) 
      }
    
    addCheckBox ( cell , row , enumObject) {
        return (
          <div >
            <i class="fa fa-pencil-square-o fa-lg" onClick={() => this.createForm(row._id)} style={{cursor:'pointer'}} ></i>
            {/* <button type="button" className="btn btn-dark" >Edit</button> */}
          </div>
        )
    }

    openForm=()=>{
        this.props.history.push(`/createState/new`);
    }    
    createForm = (id)=> {
        this.props.history.push(`/createState/${id}`);
    }
    addCountry = ( cell , row , enumObject) => {
        return(row.countryId ? row.countryId.name : null)
      }
    addStatus ( cell , row , enumObject) {
        return(row.status? 'Active' : 'Inactive');
    }    
    componentDidMount() {
        let companyId = localStorage.getItem("companyId");
        axios.get(process.env.REACT_APP_BACKEND_API_URL + '/all/state/dropdowns/' + companyId)
        .then (response => {
            console.log(response.data.data)
            this.setState({
                AssetsData : response.data.data
            })
            let copy = []
            copy.push({
              label : 'Select',
              value : ''
            })
            response.data.data.forEach((e,index) => {
                copy.push({
                    label : e.name,
                    value : e._id
                })
            })
            this.setState({
                options1 : copy,
            })
        })
        .catch(function (error) {
          console.log(error.message)
          swal({error}, {icon : "error" } )
          }.bind(this));

        axios.get(process.env.REACT_APP_BACKEND_API_URL + '/all/user/dropdowns/bytype/'+ this.state.type + '/' + companyId)
        .then (response => {
            // console.log(response.data.data)
            let copy = []
            copy.push({
              label : 'Select',
              value : ''
            })
            response.data.data.forEach((e,index) => {
                copy.push({
                    label : e.name,
                    value : e._id
                })
            })
            this.setState({
                options : copy,
            })
            // console.log(this.state.options)
        })
        .catch(function (error) {
          console.log(error.message)
          swal({error}, {icon : "error" } )
          }.bind(this));
    }

    onSubmit = () => {
      let companyId = localStorage.getItem("companyId");
      let copy = {}
      if(this.state.Input.country && this.state.Input.state){
        copy.company = companyId ; 
        copy.countryId = this.state.Input.country ; 
        copy.stateId = this.state.Input.state;
      } else if(this.state.Input.country){
        copy.company = companyId ; 
        copy.countryId = this.state.Input.country ; 
      }else if(this.state.Input.state){
        copy.company = companyId ; 
        copy.stateId = this.state.Input.state;
      }
      console.log(copy);
      axios.post(process.env.REACT_APP_BACKEND_API_URL + '/get/filtered/state/data' , copy )
      .then(response => {
        console.log(response.data.data)
        if(response.status === 200){
        toast.success("Successfully filtered")
        this.setState({
          AssetsData : response.data.data
        })
      }
      else{
        toast.error("Unsuccessfully")
      }
      })
      .catch(function (error) {
        console.log(error.message)
        swal({error}, {icon : "error" } )
        }.bind(this));
    }
    render() {
        return (
          <div>
             <br></br>
              <ToastContainer
          position="top-right"
          autoClose={5000}
          style={{ zIndex: "199" }}
        />
        <br></br>
            <Row>   
              <Col xl={12}>
            <Card>  
                  <CardHeader className="text-right">
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <div style={{position:"absolute" , right:'140px' , top:'18px' , cursor : 'pointer'}}>
                        <i class="fa fa-filter fa-lg" aria-hidden="true" {...bindTrigger(popupState)}></i>
                        {/* <Button variant="contained" color="primary" {...bindTrigger(popupState)}> */}
                          {/* Open Popover
                        </Button> */}
                        <Popover style={{marginTop:'10px'}}
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                        >
                          <Box p={2} style={{width:'400px'}}>
                          <Formik
                            enableReinitialize={true}
                            initialValues={this.state.Input}
                            // validate={validationSchema}
                            // validationSchema = {DisplayingErrorMessagesSchema}
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
                        <Col md={12}>
                          <FormGroup>
                            <Label for="country">Country *</Label>
                            <Input
                              type="select"
                              name="country"
                              id="country"
                              valid={!errors.country}
                              invalid={touched.country && !!errors.country}
                              required                            
                              onChange = {handleChange}
                              onBlur={(e) => {this.setState(
                                   {
                                     Input : {...this.state.Input , country : e.target.value}
                                   })
                                   }}
                              value={values.country}
                            >
                              {this.state.options.map((option) => (
                              <option value={option.value} key ={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            {/* <FormText className="help-block">Please enter your name</FormText> */}
                            <FormFeedback>{errors.country}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="state">State *</Label>
                            <Input
                              type="select"
                              name="state"
                              id="state"
                              valid={!errors.state}
                              invalid={touched.state && !!errors.state}
                              required                            
                              onChange = {handleChange}
                              onBlur={(e) => {this.setState(
                                   {
                                     Input : {...this.state.Input , state : e.target.value}   
                                   })
                                   }}
                              value={values.state}
                            >
                              {this.state.options1.map((option) => (
                              <option value={option.value} key ={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            {/* <FormText className="help-block">Please enter your name</FormText> */}
                            <FormFeedback>{errors.state}</FormFeedback>
                          </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <Col>
                          <FormGroup>
                            <Row className="justify-content-center">
                              <Col
                                md ={6}
                                col="6"
                                sm="4"
                                className="mb-3 mb-xl-0"
                              >
                                <Button
                                  type="Button"
                                  block
                                  outline
                                  color="danger"
                                  // onClick={this.props.history.goBack}
                                  onClick = {() => {window.location.reload(true)}}
                                  // {...bindTrigger(popupState)}
                                  className="mr-1"
                                >
                                  Cancel
                                </Button>
                              </Col>
                              <Col
                                md ={6}
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
                          </Box>
                        </Popover>
                      </div>
                    )}
                  </PopupState>
                    <Button className="btn btn-primary" onClick={() => this.openForm()}>Create State</Button>
                  </CardHeader>
               
              <CardBody>
                <Suspense
                  fallback={
                    <div className="animated fadeIn pt-3 text-center">
                      <div className="sk-spinner sk-spinner-pulse"></div>
                    </div>
                  }
                >
                  <BootstrapTable
                    data={this.state.AssetsData}
                    selectRow={this.selectRow}
                    version="4"
                    striped
                    hover
                    // exportCSV={true}
                    csvFileName={"Assets List.csv"}
                    // search
                    options={DatatableOptions}
                  >
                    <TableHeaderColumn
                      dataField="_id"
                      dataFormat={this.indexN.bind(this)}
                      dataAlign="center"
                      // formatExtraData={value1}
                      dataSort
                      export={false}
                      width="50"
                    >
                    S.NO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                    //   dataField="stateId"
                      dataAlign="center"
                      dataFormat={this.addCountry.bind(this)}
                      dataSort
                      width="120"
                    >
                      Country
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField='name'
                      dataAlign="center"
                      dataSort
                      export={false}
                      width="120"
                    >
                      State
                    </TableHeaderColumn>                    
                    <TableHeaderColumn
                      isKey
                      dataAlign="center"
                      dataField= "status" 
                      dataSort
                      dataFormat={this.addStatus.bind(this)}
                    //   tdStyle={{ whiteSpace: "normal" }}
                      width="100"
                    >
                       Status
                    </TableHeaderColumn>
                                    
                    <TableHeaderColumn
                      dataField="_id"
                      dataAlign="center"
                      dataFormat={this.addCheckBox.bind(this)}
                      // formatExtraData='_id'                    
                      export={true}
                      width="80"
                    >
                    Actions
                    </TableHeaderColumn>
                  
                  </BootstrapTable>
                </Suspense>
              </CardBody>
            </Card>
          </Col>
        </Row>
            </div>
        )
    }
}



import React from 'react'
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {
    Button,
    InputGroup,
    Form,
    FormFeedback,
    FormGroup,
    Label,
    Input,
    FormText,
  } from "reactstrap";
  import { Formik } from "formik";
import { Component } from 'react';
import { AppSwitch } from '@coreui/react'
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { toast, ToastContainer } from "react-toastify";
// import './roles.css'

export default class roles extends Component {

  state = {
    companyId: localStorage.getItem("companyId"),
    userId: localStorage.getItem("iotUser"),
    view: false,
    create: false,
    edit: false,
    delete: false,
    selectAll: false,
    roleform: {
      id: undefined,
      roleName: "",
    },
    checked: [],
    menus: [
      { menuId: 0, menuName: "Select All", identifier: "selectAll" },
      { menuId: 1, menuName: "User Management", identifier: "user_management" },
      { menuId: 2, menuName: "Users", identifier: "users" }, 
      { menuId: 3, menuName: "Permissions", identifier: "permissions" }, 
      { menuId: 4, menuName: "Dashboard", identifier: "dashboard" },    
      { menuId: 5, menuName: "Settings", identifier: "settings" },    
      { menuId: 6, menuName: "Location", identifier: "locations" },   
      { menuId: 7, menuName: "Company Settings", identifier: "company_settings" }, 
      ],      
    permissions: {
      canCreate: false,
      canUpdate: false,
      canDelete: false,
    },
  };

    // componentDidMount() {
    //   var id = this.state.id ;
    //   console.log(id);
    //   let token=localStorage.getItem("Rjstoken")
    //     let config = {
    //       headers: {
    //         'Authorization': token
    //       }
    //     }
    //   axios.get(process.env.REACT_APP_BACKEND_API_URL+'/get/role/permissions/'+ id , config)
    //   .then (response => {
    //     console.log(response.data.data)
    //     let dummy = this.state.Data;
    //     dummy[1] = response.data.data.data.user_management
    //     dummy[2] = response.data.data.data.users
    //     dummy[3] = response.data.data.permissions
    //     this.setState({
    //       Data : dummy
    //     })
    //   })
    // }

    // onSubmit = () => {
    //   // alert(`${JSON.stringify(this.state.Input)} ${JSON.stringify(this.state.Data)}`);
    //   let companyId = localStorage.getItem("companyId");
    //   let userId = localStorage.getItem("userId");
    //   let token=localStorage.getItem("Rjstoken")
    //     let config = {
    //       headers: {
    //         'Authorization': token
    //       }
    //     }
    //   axios.post(process.env.REACT_APP_BACKEND_API_URL+'/create/new/user/role/'+ companyId +'/'+ userId , {
    //     "roleName": this.state.Input.Role,
    //     "user_management":{
    //           "canCreate":this.state.Data[1].canCreate,
    //           "canView" : this.state.Data[1].canView,
    //           "canUpdate":this.state.Data[1].canUpdate,
    //           "canDelete":this.state.Data[1].canDelete
    //     },
    //     "users":{
    //           "canCreate":this.state.Data[2].canCreate,
    //           "canView" : this.state.Data[2].canView,
    //           "canUpdate":this.state.Data[2].canUpdate,
    //           "canDelete":this.state.Data[2].canDelete
    //     },
    //     "permissions":{
    //           "canCreate":this.state.Data[3].canCreate,
    //           "canView" : this.state.Data[3].canView,
    //           "canUpdate":this.state.Data[3].canUpdate,
    //           "canDelete":this.state.Data[3].canDelete
    //     }
    //   } , config )
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.log(err.response.data)
    //   })
    // }
    
    componentDidMount() {
      if (this.props.match.params.id != 'new') {
        this.getRoleData(this.props.match.params.id);
      }
      if(this.props.match.params.id == 'new') {
        let checkedCopy = [];
        let selectAll = this.state.selectAll;
        this.state.menus.map(function (e, index) {
          checkedCopy.push({
            menuId: e.menuId,
            [e.identifier]: {
              canCreate: false,
              canView: false,
              canUpdate: false,
              canDelete: false,
            },
          });
        })
        this.setState({
          menus: this.state.menus.sort(function (a, b) {
            return a.menuId - b.menuId;
          }),
          checked: checkedCopy.sort(function (a, b) {
            return a.menuId - b.menuId;
          }),
          selectAll: selectAll,
        });
      }
    }

    getRoleData(id) {
      let token=localStorage.getItem("Rjstoken")
        let config = {
          headers: {
            'Authorization': token
          }
        }
      axios.get(process.env.REACT_APP_BACKEND_API_URL+'/get/role/permissions/'+ id , config)
      .then(response => {
        if(response.status === 200){
          // console.log(response);
          let responseData = response.data.data.data;
          let permissions = response.data.data.permissions;
          let checkedCopy = [];
              let selectAll = this.state.selectAll;
              this.state.menus.forEach(function (e, index) {
                if (e.identifier === "selectAll") {
                  responseData[e.identifier] = {
                    canCreate: false,
                    canView: false,
                    canUpdate: false,
                    canDelete: false,
                  };
                }
                checkedCopy.push({
                  menuId: e.menuId,
                  [e.identifier]: responseData[e.identifier],
                });
              });
              this.setState({
                menus: this.state.menus.sort(function (a, b) {
                  return a.menuId - b.menuId;
                }),
                checked: checkedCopy.sort(function (a, b) {
                  return a.menuId - b.menuId;
                }),
                roleform: {
                  roleName: responseData.roleName,
                  id: responseData._id,
                },
                selectAll: selectAll,
                permissions: response.data.data.permissions,
              });
        } else{
          console.log(response);
        }
      })
    }

    addCheckBox(cell, row, enumObject) {
      // console.log(this.state.checked[row.menuId])
      // return
      let testData = this.state.checked[row.menuId] ? this.state.checked[row.menuId][row.identifier][enumObject] : false;
      return (
        <div>
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
            onChange={() => this.checkStatus(row, enumObject, testData)}
            checked={testData}
          />
        </div>
      );
    }

    checkStatus = (row, data, testData) => {
      let checkedCopy = this.state.checked;
      console.log()
      if (row.identifier === "selectAll") {
        this.state.menus.forEach(function (e, index) {
            checkedCopy[index][e.identifier][data] = !testData
        });
  
        this.setState({
          checked: checkedCopy,
        });
  
      } else {
        checkedCopy[row.menuId][row.identifier][data] = !this.state.checked[
          row.menuId
        ][row.identifier][data];
        if (checkedCopy[row.menuId][row.identifier][data] === false) {
          checkedCopy[0]["selectAll"][data] = false;
        }
        this.setState({
          checked: checkedCopy,
        });
      }
    };

    onSubmit = (values, { setSubmitting, setErrors }) => {
      setSubmitting(false);
      const data = Object.assign({}, values);
      let checkedCopy = this.state.checked;
      data.roleName = values.roleName.trim();
      this.state.menus.map((result, index) => {
        if (result.menuName === "Select All") {
          return null;
        } 
        else {
          return (data[result.identifier] = checkedCopy[index][result.identifier]);
        }
      });
      if (this.props.match.params.id != 'new') {
        let token=localStorage.getItem("Rjstoken")
        let config = {
          headers: {
            'Authorization': token
          }
        }
        axios.put(process.env.REACT_APP_BACKEND_API_URL+'/update/company/role/permissions/' + data.id, data , config)
        .then(response => {
          console.log(response)
          if(response.status === 200) {
            toast("Role has been updated successfully")
            setTimeout(
              function(){
                this.props.history.push("/role/");
              }.bind(this),
             3000);            
          }
          else {console.log(response.message)}
        })
      }
      else {
        let token=localStorage.getItem("Rjstoken")
        let config = {
          headers: {
            'Authorization': token
          }
        }
        let companyId = localStorage.getItem("companyId");
        let userId = localStorage.getItem("userId");
        axios.post(process.env.REACT_APP_BACKEND_API_URL+'/create/new/user/role/'+ companyId +'/'+ userId , data , config )
        .then(response => {
          console.log(response)
          if(response.status === 200) {
            toast("Role has been created successfully")
            setTimeout(
              function(){
                this.props.history.push("/role/");
              }.bind(this),
             3000);
          }
          else {console.log(response.message)}
        })
      }
    }

    render() {
        return (
          <div>
            <br></br>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              style={{ zIndex: "1999" }}
            />
            <Formik
              enableReinitialize={true}
              initialValues={this.state.roleform}
              // validate={validate(validationSchema)}
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
                        <Label for="roleName">Role * </Label>
                        <Input
                          type="text"
                          name="roleName"
                          id="roleName"
                          valid={!errors.roleName}
                          invalid={touched.roleName && !!errors.roleName}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.roleName}
                        />
                        <FormFeedback>{errors.roleName}</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <BootstrapTable
                    data={this.state.menus}
                    bordered={false}
                    // options={DatatableOptions}
                    trClassName={this.trClassFormat}
                  >
                    {/* <TableHeaderColumn dataField="menuId" isKey={true}>
                ID
              </TableHeaderColumn> */}
                    <TableHeaderColumn isKey dataField="menuName">
                      Menu
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      // dataField="name"
                      formatExtraData={"canView"}
                      dataFormat={this.addCheckBox.bind(this)}
                    >
                      View
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      // dataField="price"
                      formatExtraData={"canCreate"}
                      dataFormat={this.addCheckBox.bind(this)}
                    >
                      Create
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      // dataField="price"
                      formatExtraData={"canUpdate"}   
                      dataFormat={this.addCheckBox.bind(this)}
                    >
                      Edit
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      // dataField="price"
                      formatExtraData={"canDelete"}
                      dataFormat={this.addCheckBox.bind(this)}
                    >
                      Delete
                    </TableHeaderColumn>
                  </BootstrapTable>
                  <br></br>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Row className="justify-content-center">
                          <Col md={2} col="6" sm="4" className="mb-3 mb-xl-0">
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
                          {/* {checkPermission? */}
                          <Col md={2} col="6" sm="4" className="mb-3 mb-xl-0">
                            <Button
                              type="submit"
                              block
                              outline
                              color="primary"
                              className="mr-1"
                              // disabled={isSubmitting}
                            >
                              {isSubmitting ? "Submitting" : "Submit"}
                            </Button>
                          </Col>
                          {/* :null} */}
                        </Row>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              )}
            />
          </div>
        );
    
    }
}


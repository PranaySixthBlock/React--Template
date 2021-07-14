import React, { Component } from "react";
import {
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Row,
  Form,
  FormFeedback,
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import { Formik } from "formik";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatatableOptions from "../../../containers/DefaultDatatableOptions/DefaultDatatableOptions";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import axios from "../../../containers/Axios/Config";
import {
  validationSchema,
  validate,
} from "./EditUserRoleAndPermissionValidationSchema";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
export default class EditUserRoleAndePermissions extends Component {
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
      { menuId: 1, menuName: "Locations", identifier: "locations" },
      { menuId: 2, menuName: "Assets", identifier: "assets" },
      { menuId: 3, menuName: "Tickets", identifier: "tickets" },
      { menuId: 4, menuName: "Settings", identifier: "settings" },
      { menuId: 5, menuName: "User Management", identifier: "user_management" },
      { menuId: 6, menuName: "Custom Fields", identifier: "customFields" },
      { menuId: 7, menuName: "Asset Conditions", identifier: "assetCondition" },
      { menuId: 8, menuName: "Asset Types", identifier: "assetCategory" },
      { menuId: 9, menuName: "Asset Status", identifier: "assetStatus" },
      { menuId: 10, menuName: "Ticket Priorities", identifier: "ticketPriorities" },
      { menuId: 11, menuName: "Ticket Type", identifier: "ticketType" },
      { menuId: 12, menuName: "Ticket Status", identifier: "ticketStatus" },
      { menuId: 13, menuName: "Service Providers", identifier: "serviceProviders" },
      // { menuId: 13, menuName: "vendors" },
      // { menuId: 15, menuName: "block" },
      // { menuId: 16, menuName: "floor" },
      { menuId: 18, menuName: "Store Rooms", identifier: "storeRooms" },
      { menuId: 14, menuName: "Users", identifier: "users" },
      { menuId: 15, menuName: "Permissions", identifier: "permissions" },
      { menuId: 16, menuName: "Company Settings", identifier: "companySettings" },
      { menuId: 17, menuName: "Company Employees", identifier: "companyEmployees" },
      { menuId: 19, menuName: "Audit", identifier: "audit" },
      { menuId: 20, menuName: "Reports", identifier: "reports" },
      { menuId: 21, menuName: "Asset Type Reports", identifier: "assetTypeReports" },
      { menuId: 22, menuName: "Asset Price Reports", identifier: "assetPriceReports" },
      { menuId: 23, menuName: "Tickets Assigned To Me", identifier: "ticketsAssignedToMe" },
      { menuId: 24, menuName: "Tickets Created By Me", identifier: "ticketsCreatedByMe" },
      { menuId: 25, menuName: "Employee Wise Asset Reports", identifier: "employeeWiseAssetReports" }
      // { menuId: 20, menuName: "Audit Reports", identifier: "auditReports" },
      
    ],
    permissions: {
      canCreate: false,
      canUpdate: false,
      canDelete: false,
    },
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getRoleData(this.props.match.params.id);
    } else {
      axios
        .get("menu/create/permissions/permissions")
        .then((response) => {
          if (response.status === 200) {
          
            let permissions = response.data.data;
            if (!permissions.canCreate || !permissions.canView) {
              Swal.fire({
                type: "warning",
                title: "Access Permission Denied",
                icon: "warning",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok",
              }).then((result) => {
                this.props.history.push("/home");
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
      });

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
    axios
      .get("/get/role/permissions/" + id)
      .then((response) => {
        
        if (response.status === 200) {
          let responseData = response.data.data.data;
          let permissions = response.data.data.permissions;
          if (permissions.canUpdate && permissions.canView) {
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
          } else {
            Swal.fire({
              type: "warning",
              title: "Access Permission Denied",
              icon: "warning",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then((result) => {
              this.props.history.push("/home");
            });
          }
        }
      })
      .catch(
        function (error) {
          Swal.fire({
            type: "error",
            title: "Error",
            text: error,
          });
        }.bind(this)
      );
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
    // const check = Object.assign({}, values);

    // data.status === false ? (data.status = "false") : (data.status = "true");
    // data.type = this.props.match.params.dtype;
    if (this.props.match.params.id) {
      axios
        .put("/update/company/role/permissions/" + data.id, data)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Updated Successfully");
            setTimeout(() => {
              setSubmitting(false);
              this.props.history.push("/roles/");
            }, 1500);
          } else {
            console.log(response.message);
            Swal.fire({
              type: "error",
              title: "Error",
              text: response.message,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            type: "error",
            title: "Error",
            text: error,
          });
        });
    } else {
      axios
        .post(
          "/create/new/user/role/" +
            this.state.companyId +
            "/" +
            this.state.userId,
          data
        )
        .then((response) => {
          if (response.status === 200) {
            toast.success("Role Added Successfully");
            setTimeout(() => {
              setSubmitting(false);
              this.props.history.push("/roles/");
            }, 1500);
          } else {
            console.log(response.data.error.message);
            Swal.fire({
              type: "error",
              title: "Error",
              text: response.message,
            });
          }
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status === 500) {
            Swal.fire({
              type: "error",
              title: "Warning",
              text: `${values.roleName} Role Already Exists`,
            });
          } else {
            Swal.fire({
              type: "error",
              title: "Error",
              text: error.response.data.message,
            });
          }
        });
    }
  };

  // trClassFormat(row, rowIndex) {
  //   return row.menuName === "Select All" ? <b>Select All</b> : "white";
  // }

  render() {
    let checkPermission = this.props.match.params.id
      ? this.state.permissions.canUpdate
      : true;
    //console.log(this.state.permissions)
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
          validate={validate(validationSchema)}
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
                options={DatatableOptions}
                trClassName={this.trClassFormat}
              >
                {/* <TableHeaderColumn dataField="menuId" isKey={true}>
            ID
          </TableHeaderColumn> */}
                <TableHeaderColumn isKey dataField="menuName">
                  Menu
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="name"
                  formatExtraData={"canView"}
                  dataFormat={this.addCheckBox.bind(this)}
                >
                  View
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="price"
                  formatExtraData={"canCreate"}
                  dataFormat={this.addCheckBox.bind(this)}
                >
                  Create
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="price"
                  formatExtraData={"canUpdate"}
                  dataFormat={this.addCheckBox.bind(this)}
                >
                  Edit
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="price"
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
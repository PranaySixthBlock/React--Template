import React, { Component, Suspense } from "react";
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
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatatableOptions from "../../containers/DefaultDatatableOptions/DefaultDatatableOptions";
import "sweetalert2/src/sweetalert2.scss";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";
import "react-select/dist/react-select.min.css";
import _ from "lodash";
import axios from "axios";

export default class ListAssets extends Component {
  state = {
    companyId: localStorage.getItem("companyId"),
    AssetsData: [
        {no:"1", name:"chandu", location:"vizag"},
        {no:"2", name:"Aravind", location:"hyd"},
        {no:"3", name:"krishna", location:"madhapur"},
        {no:"4", name:"sharan", location:"ameerpet"},
        {no:"5", name:"murali", location:"KPHB"}],
    users : {},
  }
  openForm=()=>{
    this.props.history.push(`/form/new`);
  }

  createForm = (id)=> {
    this.props.history.push(`/form/${id}`);
  }

  componentDidMount() {
    let companyId = localStorage.getItem("companyId");
    let userId = localStorage.getItem("userId");
        let token=localStorage.getItem("Rjstoken")
        let config = {
          headers: {
            'Authorization': token
          }
        }
    axios.get(process.env.REACT_APP_BACKEND_API_URL+'/all/company/members/'+ companyId , config)
    .then(response =>{
        this.setState({
        AssetsData : response.data.data.data,
      })
      axios.get(process.env.REACT_APP_BACKEND_API_URL+'//get/user/permissions/'+ userId , config)
      .then(response => {
        this.setState({
          users : response.data.data.users,
        })
      })
    })
  }

  addCheckBox ( cell , row , enumObject) {
    return (
      <div >
        <i class="fa fa-pencil-square-o fa-lg" onClick={() => this.createForm(row._id)} style={{cursor:'pointer'}} ></i>
        {/* <button type="button" className="btn btn-dark" >Edit</button> */}
      </div>
    )
  }

  indexN(cell, row, enumObject, index) {
    return (<div>{index+1}</div>) 
  }

  addRole = ( cell , row , enumObject) => {
    // if(row){return row.role.roleName}
    // else return null
    return (row.role ? row.role.roleName : null ) 
  }

  render() {
    return (
      <div>
        {/* {console.log(this.state.AssetsData)} */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          style={{ zIndex: "1999" }}
        />
        <Row>   
          <Col xl={12}>

            <Card>
                {this.state.users.canCreate && (
                  <CardHeader className="text-right">
                    <Button className="btn btn-primary" onClick={() => this.openForm()}>Create User</Button>
                  </CardHeader>
                )}
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
                      width="80"
                    >
                    S.NO
                    </TableHeaderColumn>
                    
                    <TableHeaderColumn
                      dataField='fullName'
                      dataAlign="center"
                      dataSort
                      export={false}
                      width="80"
                    >
                      Name
                    </TableHeaderColumn>                    
                    <TableHeaderColumn
                      isKey
                      dataAlign="center"
                      dataField="email"
                      dataSort
                      tdStyle={{ whiteSpace: "normal" }}
                      width="120"
                    >
                       Email
                    </TableHeaderColumn>
                    
                    <TableHeaderColumn
                      dataField="role"
                      dataAlign="center"
                      dataFormat={this.addRole.bind(this)}
                      dataSort
                      width="120"
                    >
                      Role
                    </TableHeaderColumn>
                    {this.state.users.canUpdate && (
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
                    )}
                  </BootstrapTable>
                </Suspense>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

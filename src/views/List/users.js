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
  }
  openForm=()=>{
    this.props.history.push(`/form/new`);
  }

  createForm = (id)=> {
    this.props.history.push(`/form/${id}`);
  }

  componentDidMount() {
    let companyId = localStorage.getItem("companyId");
        let token=localStorage.getItem("Rjstoken")
        let config = {
          headers: {
            'Authorization': token
          }
        }
    axios.get(process.env.REACT_APP_BACKEND_API_URL+'/all/company/members/'+ companyId , config)
    .then(response =>{
      console.log(response.data.data.data)
      this.setState({
        AssetsData : response.data.data.data
      })
    })
  }

  addCheckBox ( cell , row , enumObject) {
    return (
      <div>
        <button type="button" className="btn btn-dark" onClick={() => this.createForm(row._id)}>Edit</button>
      </div>
    )
  }

  indexN(cell, row, enumObject, index) {
    return (<div>{index+1}</div>) 
  }

  render() {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          style={{ zIndex: "1999" }}
        />
        <Row>
          <Col xl={12}>

            <Card>
                <CardHeader className="text-right">
                    <Button className="btn btn-primary" onClick={() => this.openForm()}>Create User</Button>
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
                      // formatExtraData={value1}
                      dataSort
                      export={false}
                      width="80"
                    >
                    S.NO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField='fullName'
                      dataSort
                      export={false}
                      width="80"
                    >
                      Name
                    </TableHeaderColumn>                    
                    <TableHeaderColumn
                      isKey
                      dataField="email"
                      dataSort
                      tdStyle={{ whiteSpace: "normal" }}
                      width="120"
                    >
                       Email
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="phone"
                      dataSort
                      width="120"
                    >
                      Number
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="_id"
                      dataFormat={this.addCheckBox.bind(this)}
                      // formatExtraData='_id'
                      dataSort
                      export={true}
                      width="80"
                    >
                    Edit
                    </TableHeaderColumn>
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

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
  import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
  import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
  import DatatableOptions from "../../containers/DefaultDatatableOptions/DefaultDatatableOptions";
  import axios from '../../containers/Axios/Config';
  import swal from 'sweetalert';


export default class Country extends Component {

    state = {
        AssetsData: [ ],
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
    addStatus ( cell , row , enumObject) {
      return(row.status? 'Active' : 'Inactive');
    }

    openForm=()=>{
        this.props.history.push(`/tenderCreation/new`);
    }
    
    createForm = (id)=> {
        this.props.history.push(`/tenderCreation/${id}`);
    }

    componentDidMount() {
  let companyId = localStorage.getItem('companyId');
  axios.get( '/all/tenders/' + companyId )
  .then(response => { 
    console.log(response.data.data.data)
    this.setState({
      AssetsData : response.data.data.data
    })
  })
  .catch(function (error) {
    console.log(error.message)
    swal({error}, {icon : "error" } )
    }.bind(this));
    }

    render() {
        return (
            <div>
                <Row>   
          <Col xl={12}>

            <Card>
                
                  <CardHeader className="text-right">
                    <Button className="btn btn-primary" onClick={() => this.openForm()}>Create Tender</Button>
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
                    exportCSV={true}
                    csvFileName={"Tender List.csv"}
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
                      csvHeader = 'Name'
                      dataField='tender_name'
                      dataAlign="center"
                      dataSort
                      width="120"
                    >
                      Name
                    </TableHeaderColumn>     
                    <TableHeaderColumn
                      csvHeader = 'Amount'
                      dataField='emd_amount'
                      dataAlign="center"
                      dataSort
                      width="120"
                    >
                      Tender Amount
                    </TableHeaderColumn>                  
                    <TableHeaderColumn
                      csvHeader = 'Status'
                      isKey
                      dataAlign="center"
                      dataField="tender_status"
                      dataSort
                      // dataFormat={this.addStatus.bind(this)}
                      // tdStyle={{ whiteSpace: "normal" }}
                      width="100"
                    >
                       Status
                    </TableHeaderColumn>
                                    
                    <TableHeaderColumn
                      dataField="_id"
                      dataAlign="center"
                      dataFormat={this.addCheckBox.bind(this)}
                      // formatExtraData='_id'                    
                      export={false}
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



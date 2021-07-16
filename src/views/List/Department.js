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
  import axios from 'axios'

export default class Country extends Component {

    state = {
        AssetsData: [],
        type : 'department'
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
        this.props.history.push(`/createCountry/new/department`);
    }
    
    createForm = (id)=> {
        this.props.history.push(`/createCountry/${id}/department`);
    }

    addCountry = ( cell , row , enumObject) => {
        // if(row){return row.role.roleName}
        // else return null
        // return (row.name ? row.name : null ) 
        return(row.countryId ? row.countryId.name : null)
      }
    addStatus ( cell , row , enumObject) {
        return(row.status? 'Active' : 'Inactive');
    }

    componentDidMount() {
        let companyId = localStorage.getItem("companyId");
        axios.get(process.env.REACT_APP_BACKEND_API_URL + '/all/user/dropdowns/bytype/' + this.state.type + '/' + companyId)
        .then (response => {
            console.log(response.data.data)
            this.setState({
                AssetsData : response.data.data
            })
        })
    }

    render() {
        return (
            <div>
                <Row>   
          <Col xl={12}>

            <Card>
                
                  <CardHeader className="text-right">
                    <Button className="btn btn-primary" onClick={() => this.openForm()}>Create Department</Button>
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
                      dataField='name'
                      dataAlign="center"
                      dataSort
                      export={false}
                      width="120"
                    >
                      Department
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



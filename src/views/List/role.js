import React, { Component ,Suspense } from 'react'
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
    Form
  } from "reactstrap";
  import { AppSwitch } from '@coreui/react'
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
  import axios from 'axios'
  import { Formik } from "formik";


export class role extends Component {

    state = {
        companyId: localStorage.getItem("companyId"),
        Data: [
            // {no:"1", name:"chandu", location:"vizag"},
            // {no:"2", name:"Aravind", location:"hyd"},
            // {no:"3", name:"krishna", location:"madhapur"},
            // {no:"4", name:"sharan", location:"ameerpet"},
            // {no:"5", name:"murali", location:"KPHB"}],
        ]
      }

      componentDidMount(){
        let companyId = localStorage.getItem("companyId");
        let token=localStorage.getItem("Rjstoken")
        let config = {
          headers: {
            'Authorization': token
          }
        }
        axios.get(process.env.REACT_APP_BACKEND_API_URL+'/get/company/roles/'+ companyId , config)
        .then(res => {
          
          this.setState({
            Data : res.data.data.data
          })
          console.log(this.state.Data);
        })
      }

      openRoles=()=>{
        this.props.history.push(`/createroles/new`);
      }

      editRoles=(id)=>{
        this.props.history.push(`/createroles/${id}`)
      }

    render() {
        return (
          <Row style={{marginTop:'50px'}}>
              <Col lg={12}>
                <Card >
                <CardHeader className="text-right">
                  <Button className="btn btn-primary" onClick={() => this.openRoles()}>Create Role</Button>
                </CardHeader>
                  <CardBody>
                  <table className="table table-bordered" style={{textAlign:'center'}}>
                    <thead>
                      <tr>
                        <th scope="col">S.NO</th>
                        <th scope="col">Role Name</th>
                        <th scope="col">Created Date</th>
                        <th scope="col">Status</th>
                        {/* <th scope="col">Actions</th> */}
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.Data.map((data , index) => (
                        <tr key = {index}>
                        <td scope="row">{index + 1}</td>
                        <td>{data.roleName}</td>
                        <td>{data.createdAt}</td>
                        <td>{data.status? 'Active' : 'Inactive'}</td>
                        {/* <td><AppSwitch className={'float-center'} variant={'pill'} label color={'dark'} size={'sm'}/> </td> */}
                        <td>
                            <i class="fa fa-pencil-square-o fa-lg" onClick={ () => this.editRoles(data._id)} style={{cursor:'pointer'}} ></i>
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
               
        )
    }
}

export default role

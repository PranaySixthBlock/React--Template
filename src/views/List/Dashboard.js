import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line , Pie } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities'
import axios from '../../containers/Axios/Config';
import swal from 'sweetalert';


const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  legend : {
    display :false
  },
  title: {
    display: true,
    text: 'Line Chart'
  },
  scales: {
    yAxes: [
      {
        // gridLines:{
        //   color: 'transparent',
        // },        
        ticks: {
          beginAtZero: true,
          max : 3.5,
        },
      },
    ],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 3.5,
      hitRadius: 10,
      hoverRadius: 7,
    },
  },
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  title: {
    display: true,
    text: 'Pie Chart'
  },
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  legend : {
    display :false
  },
  title: {
    display: true,
    text: 'Bar Chart'
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          // zeroLineColor: 'transparent',
        },
        barPercentage: 0.4,
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          barPercentage : 0.3
        },
      },
    ],
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roles : 0,
      tenders : 0,
      users : 0,
      data : [],
      labels : [],
      d : {}
    };
  }

  componentDidMount = async() => {
    let companyId = localStorage.getItem("companyId");
    let token=localStorage.getItem("Rjstoken")
    let config = {
      headers: {
        'Authorization': token
      }
    }
  await axios.get(process.env.REACT_APP_BACKEND_API_URL+'/get/dashboard/counts/'+ companyId )
    .then(response => {
      console.log(response.data.data)
       this.setState({
        users : response.data.data.total_users,
        tenders : response.data.data.total_tenders,
        roles : response.data.data.total_users_roles,
        data : response.data.data.dataValues,
        labels : response.data.data.labels,
      })
     })
    .catch(function (error) {
      console.log(error.message)
      swal({error}, {icon : "error" } )
      }.bind(this));   
      
      const d = {
        labels: this.state.labels,
        datasets: [
          {
            label: '' ,
            fill: false,
            data: this.state.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            hoverOffset: 4
          },
        ],
      };
      this.setState({
        d : d
      })
      console.log(this.state.d)
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value"><h2>{this.state.users}</h2></div>
                <div><h4>Users online</h4></div>
                <div className="chart-wrapper mt-3" style={{ height: '55px' }}>
                <a href='/#/users' style={{color: 'black'}} >Check out the Users</a>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <div className="text-value"><h2>{this.state.tenders}</h2></div>
                <div><h4>Tenders Created</h4></div>
              <div className="chart-wrapper mt-3" style={{ height: '55px' }}>
                <a href='/#/tenderDisplay' style={{color: 'black'}} >Check out the Tenders</a>
              </div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div className="text-value"><h2>{this.state.roles}</h2></div>
                <div><h4>Roles Present</h4></div>
              <div className="chart-wrapper mt-3" style={{ height: '55px' }}>
                <a href='/#/role' style={{color: 'black'}} >Check out the Roles</a>
              </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

       <div className='header'>
          <h1 className='title'>Charts</h1>
        </div>
        <Line data={this.state.d} options={cardChartOpts2} height='75px'/>
        <div style={{marginTop:'40px'}}></div>
        <Bar data={this.state.d} options={options} height='100px'/>
        <div style={{marginTop:'40px'}}></div>
        <Pie data={this.state.d} options={cardChartOpts1} height = '100px' />
      </div>  
    );
  }
}

export default Dashboard;

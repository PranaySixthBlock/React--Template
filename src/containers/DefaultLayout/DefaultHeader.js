import React, { Component } from 'react';
import { Nav  } from 'reactstrap';
import PropTypes from 'prop-types';
import {  AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
// import avatar from '../../assets/img/avatars/9.png';
import axios from "../../containers/Axios/Config";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import asseticon from '../../assets/img/brand/assetM.png'
import asset from '../../assets/img/brand/assetM.png'
// import voboicon from '../../assets/img/brand/voboicon.png';
// import vobo from '../../assets/img/brand/VoboLogo_lightGreen.png'
import AppContext from '../../containers/ContextApi/AppContext';
import avatar from '../../assets/img/avatars/9.png';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  
  
  state={
    dropdownOpen: false,
    status:localStorage.getItem(localStorage.getItem('templateType')+'_status'),
    
    skillId: localStorage.getItem(localStorage.getItem('templateType')+'_skillId'),
    template: localStorage.getItem(localStorage.getItem('templateType')+'_templateId'),
    logo:'',
  }
  toggle=(()=> {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  });
  componentDidMount() {
    // let companyId = localStorage.getItem("companyId");
    // if(companyId){
    //   axios.get('/display/company/logo/'+companyId)
    //   .then(response=>{
    //     let logo=response.data.data[0].logo;
    //     this.setState({logo:logo?process.env.REACT_APP_BACKEND_IMAGES_URL+logo:asset})
    //   })
    //   .catch(error=>{
    //     console.log(error)
    //   })
    // }
  }

  Logout = () => {
    localStorage.removeItem('Rjstoken');
    window.location = '/#/login';
    axios.defaults.headers.common['Authorization'] = "";
  }
  upgrade = () => {
    let subscriptionId=localStorage.getItem(localStorage.getItem('templateType')+'_subscriptionID');
    let subscriberState = localStorage.getItem(localStorage.getItem('templateType')+'_subscriptionState');
    let skillName = localStorage.getItem(localStorage.getItem('templateType')+'_skillName');
    if(subscriberState === "Pending" && subscriberState){
        window.location.href = process.env.REACT_APP_PORTAL+'ordersummary/'+this.state.skillId
    }
    else{
    window.location.href = process.env.REACT_APP_PORTAL+'plans/'+this.state.skillId+'/'+subscriptionId+'/'+this.state.template+'/'+skillName;
    }
  }
  
  render() {
    
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    let templateName=localStorage.getItem('templateName');
    let userName=localStorage.getItem(localStorage.getItem('templateType')+'_userName');
    let status=localStorage.getItem(localStorage.getItem('templateType')+'_status');
    let logo=this.state.logo?this.state.logo:asset;
    if(status){
     
      if(status=== "Pending Certification" || status=== "Development"){
        status="Pending Certification";
      }else if(status === "Published"){
        status="Published for Review";
      }else if(status === "Production"){
        status="Live";
      }else{
        //console.log(status)
      }
      
    }
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand 
        // href={process.env.REACT_APP_PORTAL_URL}
          full={{ src: logo, width: 120, height: 30, alt: 'Vobo Logo' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'Vobo Icon' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <div className="m-auto ">
          <strong>{templateName} </strong>
        </div> 

        <Dropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
        <img src={avatar} width="45" height="50" className="img-avatar" alt="avatar" />
        </DropdownToggle>
        <DropdownMenu right>
        <DropdownItem onClick={this.Logout}><i className="fa fa-lock"></i> Logout</DropdownItem>
        </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

// export default withRouter(DefaultHeader);
// ;
// // export default BotInfo;
export default props => (
  <AppContext.Consumer>
    {contextData => <DefaultHeader {...props} contextData={contextData}  />}
  </AppContext.Consumer>
);






        {/* <Nav navbar>
        {status === "Published for Review" ?<AppHeaderDropdown className="pr-5">
        
         
        <Button type="button" block outline color="primary" onClick={()=>this.upgrade()}>   
            <strong>Upgrade</strong> </Button> 
          
        
          </AppHeaderDropdown>:null}
        {/* <AppHeaderDropdown className="pr-5">
          
          <div id="status"> {status}   </div> 
        </AppHeaderDropdown> */}
          {/* <AppHeaderDropdown className="pl-5 pr-2">
              <div>
                <div id="username" style={{display:"-webkit-inline-box"}}> {userName}</div>  
                <img src={avatar} width="45" height="60" className="img-avatar" alt="avatar" />
                <Button onClick={this.Logout}><i className="fa fa-lock" ></i> Logout</Button>
              </div> */}
            {/* <DropdownToggle nav className="pr-2">
            
            </DropdownToggle> */}
            {/* <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem onClick={this.Logout}><i className="fa fa-lock" ></i> Logout</DropdownItem>
            </DropdownMenu> }
           
          {/* </AppHeaderDropdown>
        </Nav> */} 
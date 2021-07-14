import React, { Component } from 'react';
import axios from '../Axios/Config'
import { AppSwitch } from '@coreui/react';
class UpdateStatus  extends Component{
    constructor(props) {
      super(props);
      this.state = {
        object:this.props.object,
        changeStatusUrl:this.props.changeStatusUrl,
      };
    }
    ChangeStatus(e){
      axios.delete(this.state.changeStatusUrl+this.state.object._id,{
        data: { "status": !this.state.object.status }
        })
      .then(response => {
          if(response.status == 200 ){
            //console.log(response.data)
             this.setState({
                object:response.data.data? response.data.data : null
              })
              this.props.onChange();
          }else{
            //console.log(response.data.error.message)
          }
      })
      .catch(function (error) {
        //console.log(error);
    }) 
    }
    componentDidUpdate(prevProps, prevState) {
      
      if(prevState.object._id == this.state.object._id){
        if(prevState.object.status != this.state.object.status){
          this.setState({object:this.state.object})
        }
      }
    }
    tablerows = () =>{
      let rowObject = this.state.object; 
      return (<AppSwitch id="status" name="status" checked={this.state.object.status ? true : false} className={'mx-1'} variant={'pill'} color={'primary'}  onChange={(e) => this.ChangeStatus(e)} />)
        
    }
    render(){
      //console.log(this.props)
      //console.log(this.state)
      return (
            this.tablerows()     
      );
    }
  }

export default UpdateStatus;
  
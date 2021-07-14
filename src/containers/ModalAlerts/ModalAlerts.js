import React, { Component } from 'react';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { withRouter } from "react-router-dom";
class Modals extends Component {
    constructor(props,prevProps) {
        super(props,prevProps);
        this.state = {
            modal: true,
            error:undefined,
            errorMessage:undefined,
            sucessMessage:undefined,
            openModel:false,
            status:undefined,
            filename:undefined,

        }    
        this.toggle = this.toggle.bind(this);
    }
    componentDidUpdate(prevProps, prevState){
        if (this.props.error !== prevProps.error) {
            this.setState({modal:true})
        }
        if(this.props.filename !== prevProps.filename){
            this.setState({modal:true})
        } 
       
        
        
    }
    componentWillUpdate(nextProps, prevProps){
            if (this.props.error !== prevProps.error) {
                this.setState({error:this.props.error})
            }
    }
    

    // static getDerivedStateFromProps(props, state) {
    //     //console.log(props)
    //     return {
    //       error:props.error,
    //       filename:props.filename,
    //       redirectUrl:props.redirectUrl,
    //       successMessage:props.successMessage,
    //       apiStatus:props.apiStatus,
    //     };
    // }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
        // if(this.props.redirectUrl){
        //     this.props.history.push(this.props.redirectUrl);
        // }
    }

    render() {
        let errormsg;
        if(this.props.successMessage){
            errormsg=this.props.successMessage
        }else if (!this.props.error.response){
            errormsg="Something went wrong. Please try after sometime...!"
        }else{
            let error=this.props.error;
            if(error.response.status === 404){
                //console.log(error.response)
                errormsg=error.response.data.error
             }else if(error.response.status === 400){
                errormsg=error.response.data.error
             }else if(error.response.status === 500){
                errormsg=error.response.data.error
             }else{
                errormsg="Something went wrong. Please try after sometime...!"
             }
        }
       
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Modal isOpen={this.state.modal} className={this.props.apiStatus ? "modal-success" :'modal-danger'}>
                                <ModalHeader >{this.props.apiStatus? "Success" : "Error"}</ModalHeader>
                                <ModalBody>
                                    {this.props.apiStatus === 1? this.props.successMessage : errormsg}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.toggle}>OK</Button>
                                </ModalFooter>
                        </Modal> 
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(Modals);

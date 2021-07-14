import React, { Component } from 'react'
import { Button, Col,FormGroup, Label, Input, Row , Modal, ModalBody, ModalFooter, ModalHeader,FormFeedback} from 'reactstrap';
import Modals from '../ModalAlerts/ModalAlerts';
import axios from '../Axios/Config';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'talert2';
import withReactContent from 'talert2-react-content';
const Alert = withReactContent(Swal)
export class FileUpload extends Component {

    state={
        modalPopup:false,
        openModalImage:false,
        successMessage:undefined,
        error:undefined,
        apiStatus: true,
        image:undefined,
        name:'',
        label:'',
        imageName:'',
        companyid:localStorage.getItem(localStorage.getItem('templateType')+'_companyId'),
        index:Number,
        values:{},
        keyName:'',
        filename:'',
        placeholder:'',
        mutedText:'',
        
    }
    
    static getDerivedStateFromProps(props, state) {
        // //console.log(props)
          return {
            name:props.name,
            label:props.label,
            imageName:props.imageName,
            index:props.index,
            values:props.values,
            keyName:props.keyName,
            placeholder:props.placeholder,
            mutedText:props.mutedText,
          };
      }


      
    /**
     * File upload api call
     */
    fileUpload=(e)=>{
        this.setState({
            modalPopup:false
          });
        const file=e.currentTarget.files[0];    
        let accountId=  localStorage.getItem(localStorage.getItem('templateType')+'_accountId'); 
        let conditon=Boolean;  
        let type='';
        let size=0;
        if(this.props.keyName=== "url"){
            conditon= file.type === "audio/mp3" || file.type === "audio/mp4" || file.type === "audio/mpeg" || file.type === "audio/x-m4a" ||file.type === "video/mp4" || file.type ==="audio/vnd.dlna.adts" || file.type === "video/quicktime" || file.type === "audio/ogg";
            type="audio";
            size=300000000;
        } else{
            conditon= file.type === "image/png" || file.type === "image/jpeg" 
            type="image" 
            size=5000000;  
        }
        
        if(file && accountId && file.size <= size && conditon){
            const data = new FormData();
            data.append('image', file);
            data.append('filename', file.name);
           // axios.defaults.timeout = 1500;
            axios.post(process.env.REACT_APP_FILEUPLOAD_URL+'uploads/aws_S3/'+accountId,data ,{
                 timeout:30000
            })
            .then(response => {
                if(response.status === 200 ){
                   this.UpdaetStateAndParentProps(response.data.imageUrl)
                }else{
                    //console.log(response.data.error.message)
                }
            })
            .catch(function (error) {
                this.setState({
                successMessage:undefined,
                error:error,
                apiStatus: false,
                modalPopup:true,
                filename:file.name,
                });
            }.bind(this));
        }else{
           if(file && file.size > size){
               toast.error("Please upload a file smaller than "+(type === "image"?"5":"300")+" mb")
           }else{
                 if(type==="image")  {
                    toast.error("Please upload a PNG or JPG images only")
                 }else{
                    toast.error("Please upload a .mp3, mp4, .mov, .qt, .avi, .aac, .opus, .m4a formats only")
                 } 
           }  
        }
       
        // this.setState({
        //     modalPopup:false
        //   });
         
        }

    /**
     * Image preivew
     */
    openImagePopupToggle(filename){
        // //console.log(filename)
        // //console.log(process.env.REACT_APP_BACKEND_IMAGES_URL)
        this.setState( {  
            openModalImage:!this.state.openModalImage,
            Imagelocationpath:filename,
        })
    }

    /**
     * Update state and props after upload image or delete image
     */
    UpdaetStateAndParentProps(imageName){
        let companyid=  localStorage.getItem(localStorage.getItem('templateType')+'_companyId');
        let newState = Object.assign({}, this.state.values);
            if(this.state.keyName==="skillIcon"){
                newState.icon_small= imageName;
            }else if(this.state.keyName==="image"){
                newState.image= imageName;
            } else if(this.state.keyName==="url"){
                newState.url= imageName;
            } else {
                //console.log("error while assingning uploaded image into state")
            }
            // //console.log(newState)
        this.setState({
            imageName:imageName,
            companyid:companyid,
            values:newState
        });
        // //console.log(this.state)
        this.props.onFileupload(imageName,this.state.index,newState,this.state.values);     
    }

    /**
     * Detele image function
     */
    deleteImage=(filename)=>{
        //console.log(this.state)
        Alert.fire({
            title: 'Are you sure?',
            text: ' ',
            html: '<p>You will not be able to recover this imaginary file!  </p>',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#20b1a9 ',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {
                this.UpdaetStateAndParentProps("");
            } 
            // else if (result.dismiss === Alert.DismissReason.cancel) {
               
            // }
          })
        
    }


    render() {
        return (
        <div>
              
            <Row style={{marginTop:"-13px"}}>
             <ToastContainer position="top-right" autoClose={5000} style={{zIndex:'1999'}}/>
                <Col md={6} lg={6} sm={6}>
                    <FormGroup>
                        <Label for={this.props.name}>{this.props.label} {this.props.mutedText?<small className="text-muted">{this.props.mutedText}</small>:null}</Label>
                        <Col lg={12}>
                            <Input type="file"
                                name={this.props.name}
                                id={this.props.name}
                                placeholder="Upload Large Icon"
                                autoComplete={this.props.label}
                                accept={this.props.keyName==="url"?"audio/*,video/*":"image/x-png,image/jpeg,image/png"}
                                onChange={this.fileUpload}
                                valid={!this.props.error}
                                invalid={this.props.error && !!this.props.error}
                                style={{display:"none"}}
                                />
                            <Button  className="btn-instagram btn-brand mr-1 mb-1"  onClick={()=>{document.getElementById(this.props.name).click()}}><span>Select {this.props.placeholder} </span></Button>
                            <FormFeedback>{this.props.error}</FormFeedback>
                        </Col>
                    </FormGroup> 
                    </Col>
                    {this.props.imageName && this.state.keyName !=="url"?
                    <Col md={6} style={{paddingTop:(this.props.placeholder==="Logo"?"9px":"8px")}}>
                        <Button type="button" onClick={this.openImagePopupToggle.bind(this,this.state.imageName)} style={{paddingTop:"8px",backgroundColor:"#ffffff"}}> <img src={this.state.imageName} height={40} width={50} alt="preview"/></Button>
                        <Button type="button" color="danger" onClick={this.deleteImage.bind(this,this.state.imageName)} style={{padding:"4px",marginTop:"8px",marginLeft:"10px"}}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                    </Col>
                    :''}
                    {this.state.keyName==="url" && this.props.imageName  ? 
                      
                            <Col md={4} lg={4} sm={4} style={{paddingTop:"10px"}}>
                                {/* <AudioPlayer
                                src={this.props.imageName}
                                /> */}
                                 {/* <Button type="button" color="danger" onClick={this.deleteImage.bind(this,this.state.imageName)} style={{padding:"4px",marginTop:"12px",marginLeft:"10px"}}><i className="fa fa-trash" aria-hidden="true"></i></Button> */}
                            </Col>
                            // <Col md={2} lg={2} sm={2} style={{paddingTop:"20px"}}>
                               
                            // </Col>
                           
                         :null}
                          {this.state.keyName==="url" && this.props.imageName  ? 
                      
                      <Col md={2} lg={2} sm={2} style={{paddingTop:"10px"}}>
                          
                           <Button type="button" color="danger" onClick={this.deleteImage.bind(this,this.state.imageName)} style={{padding:"4px",marginTop:"12px",marginLeft:"10px"}}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                      </Col>
                      // <Col md={2} lg={2} sm={2} style={{paddingTop:"20px"}}>
                         
                      // </Col>
                     
                   :null}
                </Row>

                { this.state.modalPopup? <Modals successMessage={this.state.successMessage} error={this.state.error} apiStatus={this.state.apiStatus} redirectUrl={this.state.redirectUrl}/>: null }

                <Modal isOpen={this.state.openModalImage} className="modal-primary" >
                    <ModalHeader >Preview</ModalHeader>
                    <ModalBody style={{overflow:"overlay",textAlign:"center"}}>
                    <img  width="auto" height="auto" alt='Preview' src={this.state.Imagelocationpath}/>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.openImagePopupToggle.bind(this)}>Cancel</Button>
                </ModalFooter>
            </Modal> 
        </div>
        )
     }
}

export default FileUpload

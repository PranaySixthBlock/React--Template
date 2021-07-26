import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  InputGroup,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Row,
  FormText,
} from "reactstrap";
import { SingleDatePicker } from "react-dates";

import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { validationSchema, validate } from "./CreateAuditValidation";
import Select from "react-select";
import "react-select/dist/react-select.min.css";
import _ from "lodash";
import moment from "moment";
import * as Yup from "yup";
import axios from '../../containers/Axios/Config';
import { AppSwitch } from '@coreui/react'
import DatePicker from 'react-date-picker';
import Popup from './Popup';
import swal from 'sweetalert';

// const validationSchema = Yup.object({
//   Name : Yup.string().required('Required'),
//   Email : Yup.string().required('Required').email('Invalid email address'),
// })

const DisplayingErrorMessagesSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
//   role : Yup.string().required('Required'),
  phone : Yup.string().required('Required')
  .min(10, 'Phone number should contain 10 numbers')
  .max(10, 'Phone number should contain 10 numbers'),
  password : Yup.string().required('Required'),
  address : Yup.string().required('Required')
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
});

const presentdate = moment().format("YYYY-MM-DD");
export default class EditStorerooms extends Component {
  state = {
    id: undefined,
    companyId: localStorage.getItem("companyId"),
    Input : {
      tender_name : '',
      tender_category : '',
      department : '',
      country : '' , 
      state : '' ,
      city : '' ,
      department_contact_person1 : '' ,
      department_contact_person2 : '' ,
      // tender_documents : [] ,
      tender_owner : '' ,
      emd_amount : '' ,
      emd_paid_by_company : '' ,
      // date_of_refund : '' ,
      // last_date_to_apply : '' ,
      consortium_allowed : '' ,
      tender_status : '' ,
      primary_contact : '' ,
      secondary_contact : '' ,
      third_contact : '' ,
      partners : [
        {name : '' , contact_person : '' , company : '' , role : ''},
      ]
    },
    date_of_refund : '' ,
    last_date_to_apply : '' ,
    tenderOptions : [ ],
    departmentOptions : [ ],
    countryOptions : [ ],
    ownerOptions : [ ],
    companyOptions : [ ],  
    stateOptions : [ ],  
    cityOptions : [ ],
    roleOptions : [ ],  
    tender_category : {},
    country : {},
    state : {},
    city : {},
    department : {},
    emd_paid_by_company : {},
    tender_owner : {},
    tender_status : {},
    company : {},
    role : {},
    focused: false,
    date: moment(),
    imageToPost : [],
    isOpen : false,
    img : 0 ,
    files : [],
    initialCount : 0,
    fileObj : {},
  };

   addImageToPost = async(e) => {
     if(this.props.match.params.id != 'new'){
      if(e.target.files.length + this.state.imageToPost.length > 5){
        toast.error("Cannot add more than 5 images")
        return false
     }
     }
     if(this.props.match.params.id == 'new' && e.target.files.length > 5){
        toast.error("Cannot add more than 5 images")
        this.setState({imageToPost : []})
     }
     else{
      //  console.log(e.target.files)
       let array = [];
       for( let x = 0; x < e.target.files.length; x++){
         array.push(e.target.files[x])
       }
      if(this.props.match.params.id != 'new'){
      await this.setState({
        fileObj : e.target.files,
        files : array,
      },() => console.log(this.state.fileObj , this.state.files))}
      else{
        await this.setState({
          fileObj : e.target.files,
          imageToPost : [],
          files : array,
        },() => console.log(this.state.fileObj , this.state.files))
      }
      
      for (let i = 0; i < this.state.fileObj.length; i++) {
        let fileExtenstion = this.state.fileObj[i].name.split(".").pop();
        var file = this.state.fileObj[i];
        // console.log('for loop')
        // if (!file.type.match('image')) continue;

    const reader = new FileReader();
    reader.readAsDataURL(file)
        let fileArray = this.state.imageToPost
    fileArray.push({
      src : URL.createObjectURL(this.state.fileObj[i]),
      name: this.state.fileObj[i].name,
      type : fileExtenstion
    });

    this.setState({
      imageToPost : fileArray,
    } , () => console.log(this.state.imageToPost))   
  }
}
}

  popup = (index) => {    
      this.setState({
        isOpen : true,
        img : index,
      }, () => console.log(this.state.img) )    
  }

  removeImage = (index , id , name) => {
    if(id){
      console.log(id , name)
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this image !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete( '/delete/tender/image/' + this.props.match.params.id + '/' + id)
          let copy = this.state.imageToPost
          copy.splice(index, 1)
          console.log(id)
          this.setState({
            imageToPost : copy
          } )
          swal("Poof! Your image has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your image file is safe!");
        }
      });
     
    } else{
    let copy = this.state.imageToPost
    copy.splice(index, 1)
    let copy1 = this.state.files
    for(let i = 0; i < copy1.length; i++){
      if(copy1[i].name == name){
        copy1.splice(i , 1)
      }
    }
    // console.log(id)
    this.setState({
      imageToPost : copy,
      files : copy1,
    } , () => console.log(this.state.files))
  }}

  componentDidMount () {
   if(this.props.match.params.id != 'new'){
    axios.get( '/display/tender/images/' + this.props.match.params.id )
    .then(response => {
      console.log(response.data.data)
      let copy=[]
      response.data.data.forEach((e , index)=> {
        let name = e.filename.split('_').pop();
        copy.push({
          src : process.env.REACT_APP_BACKEND_IMAGES_URL +  "tenders/" + e.filename,
          id : e._id,
          type : e.mimetype,
          name : name
         })
      })
      // console.log(copy)
      this.setState({
        imageToPost : copy,
        initialCount : copy.length
      },() => console.log(this.state.initialCount))
    })
    .catch(function (error) {
      console.log(error.message)
      swal({error}, {icon : "error" } )
      }.bind(this));

    axios.get( '/get/company/tender/' + this.props.match.params.id )
    .then(response =>{
      // console.log(response.data.data.data[0])
      this.setState({
        Input: response.data.data.data[0] , 
        tender_category : {
          label : response.data.data.data[0].tender_category.name,
          value : response.data.data.data[0].tender_category._id
        },
        country : {
          label : response.data.data.data[0].country.name,
          value : response.data.data.data[0].country._id
        },
        state : {
          label : response.data.data.data[0].state.name,
          value : response.data.data.data[0].state._id
        },
        city : {
          label : response.data.data.data[0].city.name,
          value : response.data.data.data[0].city._id
        },
        department : {
          label : response.data.data.data[0].department.name,
          value : response.data.data.data[0].department._id
        },
        emd_paid_by_company : {
          label : response.data.data.data[0].emd_paid_by_company.companyName,
          value : response.data.data.data[0].emd_paid_by_company._id
        },
        tender_owner : {
          label : response.data.data.data[0].tender_owner.fullName,
          value : response.data.data.data[0].tender_owner._id
        },
        tender_status : {
          value : response.data.data.data[0].tender_status
        },
        company : {
          value : response.data.data.data[0].partners[0].company
        },
        role : {
          value : response.data.data.data[0].partners[0].role
        },
      })
    })}
    // console.log(this.state.tender_category)

    let token=localStorage.getItem("Rjstoken")
        let config = {
          headers: {
            'Authorization': token
          }
        }
    let companyId = localStorage.getItem('companyId');
    axios.get(process.env.REACT_APP_BACKEND_API_URL+ '/get/company/tender/dropdown/values/' + companyId , config )
    .then(response => {
      // console.log(response.data.data)
      let copy1 = [{
        label : 'Select' ,
        value : ''
      }]
      let copy2 = [{
        label : 'Select' ,
        value : ''
      }]
      let copy3 = [{
        label : 'Select' ,
        value : ''
      }]
      let copy4 = [{
        label : 'Select' ,
        value : ''
      }]
      let copy5 = [{
        label : 'Select' ,
        value : ''
      }]
      let copy6 = [{
        label : 'Select' ,
        value : ''
      }]
      let copy7 = [{
        label : 'Select' ,
        value : ''
      }]
      let copy8 = [{
        label : 'Select' ,
        value : ''
      }]

      response.data.data.tenderCategory.forEach((e , index) => {
        copy1.push({
          label : e.name ,
          value : e._id
        })   })
        this.setState({
          tenderOptions : copy1,
        })
        // console.log(this.state.tenderOptions)
    
      response.data.data.department.forEach((e , index) => {
        copy2.push({
          label : e.name ,
          value : e._id
        }) })
        this.setState({
          departmentOptions : copy2,       
      })
       // console.log(this.state.departmentOptions)
      response.data.data.country.forEach((e , index) => {
        copy3.push({
          label : e.name ,
          value : e._id
        })   })
        this.setState({
          countryOptions : copy3, 
        })
        // console.log(this.state.countryOptions)
    
      response.data.data.companycontacts.forEach((e , index) => {
        copy4.push({
          label : e.fullName ,
          value : e._id
        })  })
        this.setState({
          ownerOptions : copy4,
        })
        // console.log(this.state.ownerOptions)
     
      response.data.data.companies.forEach((e , index) => {
        copy5.push({
          label : e.companyName ,
          value : e._id
        })   })
        this.setState({
          companyOptions : copy5,
        })
        // console.log(this.state.companyOptions) 
        
        response.data.data.state.forEach((e , index) => {
          copy6.push({
            label : e.name ,
            value : e._id
          })   })
          this.setState({
            stateOptions : copy6,
          })

          response.data.data.city.forEach((e , index) => {
            copy7.push({
              label : e.name ,
              value : e._id
            })   })
            this.setState({
              cityOptions : copy7,
            })

            response.data.data.roles.forEach((e , index) => {
              copy8.push({
                label : e.roleName ,
                value : e._id
              })   })
              this.setState({
                roleOptions : copy8,
              })
     })
     .catch(function (error) {
      console.log(error.message)
      swal({error}, {icon : "error" } )
      }.bind(this));    
  }

  onSubmit = () => {
    let id = this.props.match.params.id;
    let token=localStorage.getItem("Rjstoken")
    let config = {
    headers: {
      'Authorization': token
    }
    }
        if(id != 'new'){
            axios.put(process.env.REACT_APP_BACKEND_API_URL + '/update/company/tender/' + id , this.state.Input , config)
            .then (response => {
                console.log(response)
                
                if(response.status === 200) {
                  toast.success( "Tender has been updated successfully")
                  setTimeout(
                    function(){
                      this.props.history.push(`/tenderDisplay`);
                    }.bind(this),
                   3000); 
                   
                   const formData = new FormData();
                    let companyId = localStorage.getItem("companyId");
                    for(let i = 0 ; i< this.state.files.length ; i++) {
                    formData.append('images',this.state.files[i])
                    }   
                    axios.post(process.env.REACT_APP_BACKEND_API_URL + '/upload/tender/images/' + companyId + '/' + this.props.match.params.id , formData )
                    .then(response=>{
                    console.log(response)
                    }) 
                }
                else {console.log(response.message)}
            })
            .catch(function (error) {
              console.log(error.message)
              swal({error}, {icon : "error" } )
              }.bind(this));
        }
        else{
            let companyId = localStorage.getItem("companyId");
        axios.post(process.env.REACT_APP_BACKEND_API_URL + '/create/new/tender/' + companyId , this.state.Input , config)
        .then (response => {
            console.log(response.data.data.data);
            if(response.status === 200) {
              let tenderId = response.data.data.data[0]._id
              toast.success("Tender has been created successfully")
              setTimeout(
                function(){
                  this.props.history.push(`/tenderDisplay`);
                }.bind(this),
               3000); 
               
               const formData = new FormData();
               let companyId = localStorage.getItem("companyId");
               for(let i = 0 ; i< this.state.files.length ; i++) {
               formData.append('images',this.state.files[i])
               }   
               axios.post(process.env.REACT_APP_BACKEND_API_URL + '/upload/tender/images/' + companyId + '/' + tenderId , formData )
               .then(response=>{
               console.log(response)
               })   

            }
            else {console.log(response.message)}
            // this.props.history.push(`/${this.state.type}`);
        })
        .catch(function (error) {
          console.log(error.message)
          swal({error}, {icon : "error" } )
          }.bind(this));
        }        
  }
  
  render() {
    return (
      <div className="animated fadeIn">
      {this.state.imageToPost[0] && ( <Popup open={this.state.isOpen} src ={this.state.imageToPost[this.state.img].src} 
        onClose={() => this.setState({isOpen: false})}>
      </Popup> )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          style={{ zIndex: "1999" }}
        />
        <br></br>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="chevron-bottom pr-1"></i>
                  {this.state.id ? "Edit" : `Create`}
                </strong>
              </CardHeader>
              <CardBody>
                <Formik
                  enableReinitialize={true}
                  initialValues={this.state.Input}
                  // validate={validationSchema}
                //   validationSchema = {DisplayingErrorMessagesSchema}
                  onSubmit={this.onSubmit}
                  render={({
                    keepDirtyOnReinitialize,
                    setFieldValue,
                    values,
                    errors,
                    touched,
                    status,
                    dirty,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    isValid,
                    handleReset,
                    setTouched,
                  }) => (
                    <Form onSubmit={handleSubmit} noValidate name="simpleForm">
                      <Card>
                        <CardHeader>
                          <strong>Tender Details</strong>
                        </CardHeader>
                        <CardBody>
                      <Row Form>
                      <Col md={4}>
                          <FormGroup>
                            <Label for="tender_name">Tender name </Label>
                            <Input
                              type="text"
                              name="tender_name"
                              id="tender_name"
                              valid={!errors.tender_name}
                              invalid={touched.tender_name && !!errors.tender_name}
                              required                             
                              onChange = {handleChange}
                              onBlur={(e) => {this.setState(
                                   {
                                    Input : {...this.state.Input , tender_name : e.target.value}
                                  })                         
                                  }}
                              value={values.tender_name}
                            />
                            <FormText className="help-block">Please enter your tender name number</FormText>
                            <FormFeedback>{errors.tender_name}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="tender_category">Tender category</Label>
                            <Input
                              type='select'
                              name="tender_category"
                              id="tender_category"
                              value={this.state.tender_category.value}
                              // defaultValue={values.tender_category}
                              valid={!errors.tender_category}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.tender_category && !!errors.tender_category}
                              options={this.state.locationData }
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , tender_category : e.target.value}
                                })                            
                                
                              }}
                              onBlur={handleBlur}
                            >
                              {this.state.tenderOptions.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your tender category</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.tender_category}
                            </div>
                          </FormGroup>
                        </Col>    
                        <Col md={4}>
                          <FormGroup>
                            <Label for="department">Department </Label>
                            <Input
                              type='select'
                              name="department"
                              id="department"
                              value={this.state.department.value}
                              // defaultValue={values.department}
                              valid={!errors.department}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.department && !!errors.department}
                              options={this.state.locationData }
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , department : e.target.value}
                                })                            
                                
                              }}
                              onBlur={handleBlur}
                            >
                              {this.state.departmentOptions.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your department</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.department}
                            </div>
                          </FormGroup>
                        </Col>  
                        </Row>  
                        <Row Form>                              
                        <Col md={4}>
                          <FormGroup>
                            <Label for="country">Country </Label>
                            <Input
                              type='select'
                              name="country"
                              id="country"
                              value={this.state.country.value}
                              // defaultValue={values.country}
                              valid={!errors.country}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.country && !!errors.country}
                              options={this.state.locationData }
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , country : e.target.value}
                                })                            
                                axios.get(process.env.REACT_APP_BACKEND_API_URL + '/get/state/dropdown/values/' + e.target.value ).
                                then(response => {
                                  console.log(response.data.data)
                                  let copy = [
                                    {
                                      label : 'Select' ,
                                      value : '',
                                    }
                                  ]
                                  response.data.data.forEach((e,index) =>{
                                    copy.push({
                                      label : e.name ,
                                      value : e._id
                                    }) 
                                  })                                   
                                  this.setState({
                                    stateOptions : copy,
                                  })
                                })
                              }}
                              onBlur={handleBlur}
                            >
                              {this.state.countryOptions.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your country</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.country}
                            </div>
                          </FormGroup>
                        </Col>    
                        <Col md={4}>
                          <FormGroup>
                            <Label for="state">State </Label>
                            <Input
                              type='select'
                              name="state"
                              id="state"
                              value={this.state.state.value}
                              // defaultValue={values.state}
                              valid={!errors.state}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.state && !!errors.state}
                              options={this.state.locationData }
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , state : e.target.value}
                                })                            
                                axios.get(process.env.REACT_APP_BACKEND_API_URL + '/get/city/dropdown/values/' + e.target.value ).
                                then(response => {
                                  console.log(response.data.data)
                                  let copy = [
                                    {
                                      label : 'Select' ,
                                      value : '',
                                    }
                                  ]
                                  response.data.data.forEach((e,index) =>{
                                    copy.push({
                                      label : e.name ,
                                      value : e._id
                                    }) 
                                  })                                   
                                  this.setState({
                                    cityOptions : copy,
                                  })
                                })
                              }}
                              onBlur={handleBlur}
                            >
                              {this.state.stateOptions.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your state</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.state}
                            </div>
                          </FormGroup>
                        </Col>  
                        <Col md={4}>
                          <FormGroup>
                            <Label for="city">City </Label>
                            <Input
                              type='select'
                              name="city"
                              id="city"
                              value={this.state.city.value}
                              // defaultValue={values.city}
                              valid={!errors.city}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.city && !!errors.city}
                              options={this.state.locationData }
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , city : e.target.value}
                                })                            
                                
                              }}
                              onBlur={handleBlur}
                            >
                              {this.state.cityOptions.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your city</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.city}
                            </div>
                          </FormGroup>
                        </Col> 
                        </Row>
                        </CardBody>
                        </Card> 
                        <Card>
                          <CardHeader>
                            <strong>
                              Department Contacts
                            </strong>
                          </CardHeader>
                          <CardBody>                        
                        <Row Form>                                
                        <Col md={4}>
                          <FormGroup>
                            <Label for="department_contact_person1">Department contact person1</Label>
                            <Input
                              type="text"
                              name="department_contact_person1"
                              id="department_contact_person1"
                              valid={!errors.department_contact_person1}
                              invalid={touched.department_contact_person1 && !!errors.department_contact_person1}
                              required                             
                              onChange = {handleChange}
                              onBlur={(e) => {this.setState(
                                   {
                                    Input : {...this.state.Input , department_contact_person1 : e.target.value}
                                  })                         
                                  }}
                              value={values.department_contact_person1}
                            />
                            <FormText className="help-block">Please enter your department contact person1</FormText>
                            <FormFeedback>{errors.department_contact_person1}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="department_contact_person2">Department contact person2 </Label>
                            <Input
                              type="text"
                              name="department_contact_person2"
                              id="department_contact_person2"
                              valid={!errors.department_contact_person2}
                              invalid={touched.department_contact_person2 && !!errors.department_contact_person2}
                              required                              
                              onChange = {handleChange}
                              onBlur={(e) => {this.setState(
                                   {
                                    Input : {...this.state.Input , department_contact_person2 : e.target.value}
                                  })                         
                                  }}
                              value={values.department_contact_person2}
                            />
                            <FormText className="help-block">Please enter your department contact person2</FormText>
                            <FormFeedback>{errors.department_contact_person2}</FormFeedback>
                          </FormGroup>
                        </Col> 
                        </Row>
                        </CardBody>
                        </Card> 
                        <Card>
                        <CardHeader>
                            <strong>
                              Other Tender Details
                            </strong>
                          </CardHeader>
                          <CardBody>                          
                        <Row>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="tender_owner">Tender owner </Label>
                            <Input
                              type='select'
                              name="tender_owner"
                              id="tender_owner"
                              value={this.state.tender_owner.value}
                              // defaultValue={values.tender_owner}
                              valid={!errors.tender_owner}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.tender_owner && !!errors.tender_owner}
                              options={this.state.locationData }
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , tender_owner : e.target.value}
                                })                            
                                
                              }}
                              onBlur={handleBlur}
                            >
                              {this.state.ownerOptions.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your tender owner</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.tender_owner}
                            </div>
                          </FormGroup>
                        </Col> 
                        <Col md={4}>
                          <FormGroup>
                            <Label for="emd_amount">Emd amount </Label>
                            <Input
                              type="text"
                              name="emd_amount"
                              id="emd_amount"
                              valid={!errors.emd_amount}
                              invalid={touched.emd_amount && !!errors.emd_amount}
                              required
                              onChange={handleChange}
                              onBlur={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , emd_amount : e.target.value}
                                })                         
                                }}
                              value={values.emd_amount}
                            />
                            <FormText className="help-block">Please enter your emd amount</FormText>
                            <FormFeedback>{errors.emd_amount}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="emd_paid_by_company">Emd paid by company </Label>
                            <Input
                              type='select'
                              name="emd_paid_by_company"
                              id="emd_paid_by_company"
                              value={this.state.emd_paid_by_company.value}
                              // defaultValue={values.emd_paid_by_company}
                              valid={!errors.emd_paid_by_company}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.emd_paid_by_company && !!errors.emd_paid_by_company}
                              options={this.state.locationData }
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , emd_paid_by_company : e.target.value}
                                })                           
                                
                              }}
                              onBlur={handleBlur}
                            >
                              {this.state.companyOptions.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your emd paid by company</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.emd_paid_by_company}
                            </div>
                          </FormGroup>
                        </Col> 
                        </Row> 
                        <Row Form>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="date_of_refund">Date of refund </Label>
                            {/* <SingleDatePicker
          numberOfMonths={1}
          onDateChange={date => this.setState({ date })}
          onFocusChange={({ focused }) => this.setState({ focused })}
          focused={this.state.focused}
          date={this.state.date}
        /> */}
                              <div> </div>
                              <input type="date" id="date_of_refund" name="date_of_refund" />
                            <FormText className="help-block">Please enter your date of refund</FormText>
                            <FormFeedback>{errors.date_of_refund}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="last_date_to_apply">Last date to apply </Label>
                            {/* <SingleDatePicker
          numberOfMonths={1}
          onDateChange={date => this.setState({ date })}
          onFocusChange={({ focused }) => this.setState({ focused })}
          focused={this.state.focused}
          date={this.state.date}
        /> */}
                            <div> </div>
                              <input type="date" id="last_date_to_apply" name="last_date_to_apply" />
                            <FormText className="help-block">Please enter your last_date_to_apply</FormText>
                            <FormFeedback>{errors.last_date_to_apply}</FormFeedback>
                          </FormGroup>
                        </Col>     
                        </Row>
                        </CardBody>
                        </Card> 
                        <Card>
                          <CardHeader>
                            <strong>Status</strong>
                          </CardHeader>
                          <CardBody>
                        <Row Form>
                        <Col md={4}>
                          <FormGroup>
                          <Label for="consortium_allowed">Consortium allowed </Label>
                          <div style={{marginTop:'1px' , marginLeft:'10px'}}></div>
                          <AppSwitch
                            name="consortium_allowed"
                            id="consortium_allowed"
                            className={"mx-1"}
                            variant={"3d"}
                            color={"primary"}
                            // disabled={ownerStatus}
                            label
                            dataOn={"\u2713"}
                            dataOff={"\u2715"}
                            onChange={(e) => this.setState({
                              Input : { ...this.state.Input , consortium_allowed : e.target.checked}
                            })}
                            checked={this.state.Input.consortium_allowed}
                        />                            
                            <FormText className="help-block">Please select your consortium allowed</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.consortium_allowed}
                            </div>
                          </FormGroup>
                        </Col>                     
                        <Col md={4}>
                          <FormGroup>
                            <Label for="tender_status">Status </Label>
                            <Input
                              type='select'
                              name="tender_status"
                              id="tender_status"
                              value={this.state.tender_status.value}
                              // defaultValue={values.tender_status}
                              valid={!errors.tender_status}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.tender_status && !!errors.tender_status}
                              options={this.state.locationData }
                              onChange={(e) => {this.setState(
                                {
                                  Input : {...this.state.Input , tender_status : e.target.value}
                                })                            
                                
                              }}
                              onBlur={handleBlur}
                            >
                              {/* {this.state.options.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))} */}
                                <option value=''>Select</option>
                                <option value='pending'>Pending</option>
                                <option value='not_started'>Not_started</option>
                                <option value='completed'>Completed</option>
                            </Input>
                            
                            <FormText className="help-block">Please select your tender status</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.tender_status}
                            </div>
                          </FormGroup>
                        </Col>  
                        </Row>
                        </CardBody>
                        </Card>
                        
                        
                        {this.state.Input.consortium_allowed && this.state.Input.partners.map((e , index) => (
                          <Card>
                          <CardHeader>
                            <strong>Consortium</strong>
                          </CardHeader>
                          <CardBody>
                          <Row key={index}>
                            {/* {console.log(index)} */}
                          <Col md={3}>
                          <FormGroup>
                            <Label for='name'> Name </Label>
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              valid={!errors.name}
                              invalid={touched.name && !!errors.name}
                              required                             
                              onChange = {(e)=> {
                                  let copy = this.state.Input.partners
                                  copy[index].name = e.target.value
                                  this.setState({
                                    Input : { ...this.state.Input , partners : copy }
                                  })
                                  console.log(this.state.Input.partners)
                              }}
                              onBlur={handleBlur}
                              value={values.partners[index].name }
                            />
                            <FormText className="help-block">Please enter your Name </FormText>
                            <FormFeedback>{errors.name}</FormFeedback>
                          </FormGroup>
                          </Col>
                          <Col md={3}>
                          <FormGroup>
                            <Label for="contact_person">Contact person  </Label>
                            <Input
                              type="text"
                              name="contact_person"
                              id="contact_person"
                              valid={!errors.contact_person}
                              invalid={touched.contact_person && !!errors.contact_person}
                              required                             
                              onChange = {(e)=> {
                                let copy = this.state.Input.partners
                                copy[index].contact_person = e.target.value
                                this.setState({
                                  Input : { ...this.state.Input , partners : copy }
                                })
                            }}
                              onBlur={handleBlur}
                              value={this.state.Input.partners[index].contact_person}
                            />
                            <FormText className="help-block">Please enter your contact person </FormText>
                            <FormFeedback>{errors.contact_person}</FormFeedback>
                          </FormGroup>
                          </Col >
                          <Col md={3}>
                          <FormGroup>
                            <Label for="company">Company </Label>
                            <Input
                              type='select'
                              name="company"
                              id="company"
                              value={this.state.company.value}
                              // defaultValue={values.company}
                              valid={!errors.company}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.company && !!errors.company}
                              options={this.state.locationData }
                              onChange={(e) => {
                                let copy = this.state.Input.partners
                                copy[index].company = e.target.value
                                this.setState(
                                {
                                  Input : {...this.state.Input , partners : copy}
                                })  
                                axios.get(process.env.REACT_APP_BACKEND_API_URL + '/get/roles/dropdown/values/' + e.target.value ).
                                then(response => {
                                  console.log(response.data.data)
                                  let copy = [
                                    {
                                      label : 'Select' ,
                                      value : '',
                                    }
                                  ]
                                  response.data.data.forEach((e,index) =>{
                                    copy.push({
                                      label : e.roleName ,
                                      value : e._id
                                    }) 
                                  })                                   
                                  this.setState({
                                    roleOptions : copy,
                                  })
                                })                        
                             }}
                              onBlur={handleBlur}
                            >
                              {this.state.companyOptions.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your company</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.company}
                            </div>
                          </FormGroup>
                        </Col>   
                        <Col md={3}>
                          <FormGroup>
                            <Label for="role">Role </Label>
                            <Input
                              type='select'
                              name="role"
                              id="role"
                              value={this.state.role.value}
                              // defaultValue={values.role}
                              valid={!errors.role}
                              inputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "off",
                              }}
                              invalid={touched.role && !!errors.role}
                              options={this.state.locationData }
                              onChange={(e) => {
                                let copy = this.state.Input.partners
                                copy[index].role = e.target.value
                                this.setState(
                                {
                                  Input : {...this.state.Input , partners : copy }
                                })                            
                                
                              }}
                              onBlur={handleBlur}
                            >
                              {this.state.roleOptions.map((option) => (
                              <option value={option.value}>{option.label}</option>
                                ))}
                            </Input>
                            
                            <FormText className="help-block">Please select your role</FormText>
                            <div
                              style={{
                                color: "#f86c6b",
                                marginTop: ".25rem",
                                fontSize: "80%",
                              }}
                            >
                              {errors.role}
                            </div>
                          </FormGroup>
                        </Col>   
                      </Row>                      
                     
                          <Row  className="justify-content-center text-center" >
                          <Col
                              md={2}
                            >
                                <i className="fa fa-plus" aria-hidden="true" style={{cursor:'pointer'}}
                                onClick={() => {
                                    let copy = this.state.Input.partners
                                    copy.push({name : '' , contact_person : '' , company : '' , role : ''})
                                    this.setState({
                                        Input : { ...this.state.Input , partners : copy }
                                    })
                                }}
                                ></i>                             
                            </Col>
                            <Col
                              md={2}
                            >
                            <i className="fa fa-minus" aria-hidden="true" style={{cursor:'pointer'}}
                                onClick={() => {
                                let copy = this.state.Input.partners
                                copy.pop()
                                this.setState({
                                    Input : {...this.state.Input , partners : copy}
                                });
                                }}>

                            </i>
                            </Col>
                    </Row> 
                    </CardBody>
                    </Card>                   
                    ))}                        

                      <Card>
                        <CardHeader>
                          <strong>
                            Other Contacts
                          </strong>
                        </CardHeader>
                        <CardBody>                      
                        <Row Form>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="primary_contact">Primary contact Number </Label>
                            <Input
                              type="text"
                              name="primary_contact"
                              id="primary_contact"
                              valid={!errors.primary_contact}
                              invalid={touched.primary_contact && !!errors.primary_contact}
                              required                             
                              onChange = {handleChange}
                              onBlur={(e) => {this.setState(
                                   {
                                    Input : {...this.state.Input , primary_contact : e.target.value}
                                  })                         
                                  }}
                              value={values.primary_contact}
                            />
                            <FormText className="help-block">Please enter your primary contact number</FormText>
                            <FormFeedback>{errors.primary_contact}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="secondary_contact">Secondary contact Number </Label>
                            <Input
                              type="text"
                              name="secondary_contact"
                              id="secondary_contact"
                              valid={!errors.secondary_contact}
                              invalid={touched.secondary_contact && !!errors.secondary_contact}
                              required                             
                              onChange = {handleChange}
                              onBlur={(e) => {this.setState(
                                   {
                                    Input : {...this.state.Input , secondary_contact : e.target.value}
                                  })                         
                                  }}
                              value={values.secondary_contact}
                            />
                            <FormText className="help-block">Please enter your secondary contact number</FormText>
                            <FormFeedback>{errors.secondary_contact}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="third_contact">Third contact Number </Label>
                            <Input
                              type="text"
                              name="third_contact"
                              id="third_contact"
                              valid={!errors.third_contact}
                              invalid={touched.third_contact && !!errors.third_contact}
                              required                             
                              onChange = {handleChange}
                              onBlur={(e) => {this.setState(
                                   {
                                    Input : {...this.state.Input , third_contact : e.target.value}
                                  })                         
                                  }}
                              value={values.third_contact}
                            />
                            <FormText className="help-block">Please enter your third contact number</FormText>
                            <FormFeedback>{errors.third_contact}</FormFeedback>
                          </FormGroup>
                        </Col>
                        </Row>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody>  
                          <div style={{display:'flex'}}>                    
                            <input onChange={(e) => this.addImageToPost(e)} type='file' name='files[]' multiple='multiple' />
                            {this.state.imageToPost && 
                            this.state.imageToPost.map((image , index) => (
                            <div
                              style={{width:'150px' , height:'70px' , cursor:'pointer', display:'flex-col' }} key={index}>  
                            <div>
                            {image.type == 'png' || image.type === 'image' || image.type == 'jpg' || image.type == 'image/png'  || image.type == 'image/jpeg' || image.type == 'image/jpg' ? 
                            <img  src={image.src} alt='image' width='50px' height='40px' onClick={ () => this.popup(index)}></img> : 
                            <a href={image.src} target='_blank' style={{}}> {image.name} </a> 
                          }
                            <p style={{color:'red'}} onClick={() => this.removeImage(index , image.id , image.name )} >Remove</p> </div>
                        </div>)
                       )}
                        </div> 
                        <div id='result'></div>
                        </CardBody>
                      </Card>

 {/* //=========================================================================================================================================*/}

                      <Row>
                        <Col>
                          <FormGroup>
                            <Row className="justify-content-center">
                              <Col
                                md={2}
                                col="6"
                                sm="4"
                                className="mb-3 mb-xl-0"
                              >
                                <Button
                                  type="Button"
                                  block
                                  outline
                                  color="danger"
                                  onClick={this.props.history.goBack}
                                  className="mr-1"
                                >
                                  Cancel
                                </Button>
                              </Col>
                              <Col
                                md={2}
                                col="6"
                                sm="4"
                                className="mb-3 mb-xl-0"
                              >
                                <Button
                                  type="submit"
                                  block
                                  outline
                                  color="primary"
                                  className="mr-1"
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? "Submitting" : "Submit"}
                                </Button>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  )}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Popup> </Popup> */}
      </div>
    );
  }
}

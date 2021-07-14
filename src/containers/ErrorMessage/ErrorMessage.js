import { Field, getIn } from 'formik';
import React, { Component } from 'react';


class ErrorMessage extends Component {

    constructor(props,prevProps) {
        super(props,prevProps);
        //console.log(prevProps)
        this.state = {
            name: '',
        }    
    }
    static getDerivedStateFromProps(props, state){
        //console.log(props,state)
        if(props.name!==state.name){
            return {
                state: props.name
              };
        }
        return null;
    }

    render() {
        let valid= false;
        valid=<Field
        name={this.state.name}
        render={({ form }) => {
          const error = getIn(form.errors, this.state.name);
          const touch = getIn(form.touched, this.state.name);
          //console.log(error)
          if(touch){
            if(error){
              //console.log(error);
              //console.log(' touchd, error')
              this.props.onChange(false)
              return error ? error : false;
            }else{
              //console.log(error);
              //console.log(' touchd, not error')
              this.props.onChange(true)
              return error ? error : false;
            }
    
          }else{
           
            if(error){
              //console.log(error);
              this.props.onChange(false)
              //console.log('not touchd, error')
              return error ? error : false;
            }else{
              //console.log(error);
              this.props.onChange(true)
              //console.log('not touchd, not error')
              return error ? error : false;
            }
          }
        }}
      />

        return (
            valid
        )
    }


}
//  ErrorMessage = ({ name }) => (
//   <Field
//     name={name}
//     render={({ form }) => {
//       const error = getIn(form.errors, name);
//       const touch = getIn(form.touched, name);
//       return touch && error ? error : null;
//     }}
//   />
// );

export default ErrorMessage
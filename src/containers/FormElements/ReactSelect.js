import React, { Component } from 'react';
// import { Button,  Col, FormGroup, Label, Input, Row, Modal, ModalBody, ModalFooter, ModalHeader,FormFeedback } from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
class MultiSelect extends Component {
    handleChange = value => {
      // this is going to call setFieldValue and manually update values.topcis
      this.props.onChange('topics', value);
    };
  
    handleBlur = () => {
      // this is going to call setFieldTouched and manually update touched.topcis
      this.props.onBlur('topics', true);
    };
  
    render() {
      return (
        <div style={{ margin: '1rem 0' }}>
          <label htmlFor="color">Topics (select at least 3) </label>
          <Select
            id="color"
            options={""}
            multi={true}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
          />
          {!!this.props.error &&
            this.props.touched && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
            )}
        </div>
      );
    }
  }
  export default MultiSelect;

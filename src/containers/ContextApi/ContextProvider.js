import React, { Component } from 'react'
import AppContext from './AppContext'

class ContextProvider extends Component {
  constructor(props,prevState) {
    super(props,prevState);
      this.state={
          templateId:'',
          userId:'',
          rjstoken:'',
          skillId:'',
          templateType:'',
          botStatus:'',
      }
    }
 
  render() {
    return (
      <div>
          <AppContext.Provider  value={{globalData:this.state}}>
              {this.props.children}
          </AppContext.Provider>
      </div>
    )
  }
}

export default ContextProvider;


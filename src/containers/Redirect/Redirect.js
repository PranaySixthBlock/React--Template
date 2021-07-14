import React, { Component } from 'react'

export default class Redirect extends Component {

    componentDidMount(){
        localStorage.clear();
        window.location.assign(process.env.REACT_APP_PORTAL_URL);
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

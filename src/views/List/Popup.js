import React, { Component } from 'react'
import ReactDom from 'react-dom'

export class Popup extends Component {
    state = {
        MODAL_STYLES : {
            position: 'fixed',
            display:'block',
            top : '50%',
            bottom : '50%',
            transform : 'translate(150% , -150% )',
            padding : '50px',
            zIndex : 1000,
        },
        OVERLAY_STYLES : {
            position :'fixed',
            top : 0,
            bottom : 0,
            right : 0,
            left : 0,
            backgroundColor : 'rgba(0,0,0,0.7)',
            zIndex : 1000,
        }
    }
    render() {
        if(!this.props.open) return null;

        return ReactDom.createPortal(
            <>
            <div style={this.state.OVERLAY_STYLES}>
                <div style ={this.state.MODAL_STYLES}>
                    <img src={this.props.src} alt="image" width='300px' height='300px' object-fit='contain'></img>
                    <div>
                    <button onClick={this.props.onClose} style={{backgroundColor:'tomato' , borderRadius:'5px' }} type="button">Close</button>   
                    </div>
                </div>
            </div>
            </>,
            document.getElementById('portal')
        )
    }
}

export default Popup

import React, { Component } from 'react'
import { connect } from 'react-redux';

import GuestSubmitForm from "./forms/GuestSubmitForm";
import { guestDataAction } from "../../Store/ACCIONES";

class GuestSubmit extends Component {

    constructor() {
        super();
        this.state = {
            event:0,
        };      
    }

    componentWillMount() {
        let eventId=this.obtainUrlPart();
        this.setState({event:eventId});
    }
    
    //Obtain part of url
    //http://localhost:3000/#/guest-submit?event=1*
    obtainUrlPart = () =>{
        let location = 'url:'+ window.location;
        var eventIndex = location.lastIndexOf('event');
        var endEventKey = location.lastIndexOf('*');
        var result = location.substring(eventIndex + 6,endEventKey);
        //console.log(result);
        return result;
    }

    injectGuestDispatch = (values) =>{
        this.props.guestDispatch(values);
    }

    render() {
        return (
            <div className="p-col-12 ">
                <GuestSubmitForm dataGuest={this.injectGuestDispatch} eventId={this.state.event}/>
            </div>  
        )
    }
}

const mapStateToProps = (state) => ({
     
});

const mapDispatchToProps = (dispatch) =>({
    guestDispatch:(values) =>{    
        dispatch(guestDataAction(values));
      },
});

export default connect(mapStateToProps,mapDispatchToProps)(GuestSubmit);

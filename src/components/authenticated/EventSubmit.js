import React, { Component } from 'react'
import { connect } from 'react-redux';

import EventForm from "./forms/EventForm";
import GuestSubmitForm from "./forms/GuestSubmitForm";
import { addEventAction } from "../../Store/ACCIONES";


class EventSubmit extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    componentWillMount() {
    }

    injectEventsDispatch = (values) =>{
        this.props.addEventDispatch(values);
    }

    render() {
        return (
            <div className="p-col-12">                
                <EventForm dataEvent={this.injectEventsDispatch}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
     
});

const mapDispatchToProps = (dispatch) =>({
    addEventDispatch:(values) => {
        dispatch(addEventAction({values}));  
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(EventSubmit);

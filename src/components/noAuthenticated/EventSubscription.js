import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

import {Button} from 'primereact/button';
import {Panel} from 'primereact/panel';

class Base extends Component {

    constructor() {
        super();
        this.state = {
            eventId:0,
            event:{},
        };
        
    }


    componentWillMount = () =>{
        let eventId=this.obtainUrlPart();
        let event = axios.get(
            'http://localhost:8080/events/getEvent/'+eventId)
        .then(res => res.data);        
        this.setState({eventId:eventId ,event:event});
    }

    //Obtain part of url
    //http://localhost:3000/#/event-subscription?event=1*
    obtainUrlPart = () =>{
            let location = 'url:'+ window.location;
            var eventIndex = location.lastIndexOf('event');
            var endEventKey = location.lastIndexOf('*');
            var result = location.substring(eventIndex + 6,endEventKey);
            //console.log(result);
            return result;
    }

    render() {
        return (
            <div>
                <div className="p-col-12 p-md-6 p-lg-6 contacts">
                    <Panel header="Event photo" >
                        <img alt="Card" src='http://localhost:8080/downloadFile/avatar_1.png' width="150" height="200"/>
                        <div className="p-col-2">
                            <Button type="button" label="Register" icon="fa-send"  
                                onClick={()=>{
                                    //console.log(this.state.event);
                                    window.location = '#/guest-submit?event='+this.state.eventId+'*'
                                    }
                                } />
                        </div>                        
                    </Panel>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({   
});

const mapDispatchToProps = (dispatch) =>({
});

export default connect(mapStateToProps,mapDispatchToProps)(Base);

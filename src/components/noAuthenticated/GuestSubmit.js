import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

import { Link } from 'react-router-dom';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';

import GuestSubmitForm from "./forms/GuestSubmitForm";
import { guestDataAction } from "../../Store/ACCIONES";

class GuestSubmit extends Component {

    constructor() {
        super();
        this.state = {
            event:0,
            "firstName": '',
            "middleName": '',
            "lastName": '',
            "email": '',
            "phoneNumber": '',
            "eventList": [],
            nextLink:''
        };      
    }

    componentWillMount() {
        let eventId=this.obtainUrlPart();
        this.setState({event:eventId, eventList:[{eventId:eventId}]});

        {/* {http://localhost:3000/#/acept-agreement?event=1*lic.jorge@correo.edu} */}
        //let linkUrl='/acept-agreement?event='+this.state.event+'*'+this.satate.email;
        //this.setState({nextLink:''});
        
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

    serviceGuestSubmit = (agreement) =>{
        axios.post('http://localhost:8080/user/guest', agreement)
            .then(function (response) {
            if (response.status===201) {
                //http://localhost:3000/#/acept-agreement?event=1*
                window.location = '#/acept-agreement?event=1*' 
                alert('Thanks for subscribe');                   
            } else {
                alert('Something went wrong');
            }
        })
    }

    render() {
        return (
            <div className="p-col-12 ">
                {/* <GuestSubmitForm dataGuest={this.injectGuestDispatch} eventId={this.state.event}/> */}

                <div className="card card-w-title">
                    <h1>Registration Form</h1>

                    <div className="p-grid">
                    
                        <div className="p-col-12 p-md-4">
                        <div>
                            <label htmlFor="firstName">First name*</label>
                            </div>
                            <InputText name="firstName" id="firstName" placeholder="First name" 
                                value={this.state.firstName} onChange={(e) => this.setState({firstName: e.target.value})} />
                        </div>                   
                        
                        <div className="p-col-12 p-md-4">                        
                            <div>
                                <label htmlFor="middleName">Middle name</label>
                            </div>
                            <InputText name="middleName" id="middleName" placeholder="Middle name" 
                                value={this.state.middleName} onChange={(e) => this.setState({middleName: e.target.value})} /> 
                        </div>
                        
                        <div className="p-col-12 p-md-4">
                            <div>
                                <label htmlFor="lastName">Last name*</label>
                            </div>
                            <InputText name="lastName" id="lastName" placeholder="Last name" 
                                value={this.state.lastName} onChange={(e) => this.setState({lastName: e.target.value})} />
                        </div>

                        
                        <div className="p-col-12 p-md-4">
                            <div>
                                <label htmlFor="email">Email*</label>
                            </div>
                            <InputText name="email" id="email" placeholder="Should have .edu" 
                                value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} /> 
                        </div>                    
                        
                        <div className="p-col-12 p-md-4">
                            <div>
                                <label htmlFor="phoneNumber">Phone*</label>
                            </div>
                            <InputText name="phoneNumber" id="phoneNumber" placeholder="(123) 456 7890"
                                value={this.state.phoneNumber} onChange={(e) => this.setState({phoneNumber: e.target.value})} />
                        </div>

                    
                        {/* {http://localhost:3000/#/acept-agreement?event=1*lic.jorge@correo.edu} */}
                        {/* <Link to={()=>{
                            let link='/acept-agreement?event='+this.state.event+ '*' + this.state.email;
                            return (JSON.stringify(link));
                        }} > */}
                        <Link to={'/acept-agreement?event='+this.state.event+'*'+this.state.email} >
                        
                            <Button label="Submit" style={{ marginTop:15 }}  
                                onClick={()=>{ 
                                    //console.log('GuestSubmit: '+ this.state.firstName);
                                    let agreement = {
                                        firstName:this.state.firstName, 
                                        middleName:this.state.middleName,
                                        lastName:this.state.lastName,
                                        email:this.state.email, 
                                        phoneNumber:this.state.phoneNumber,
                                        eventList: this.state.eventList,

                                    }
                                    
                                    this.serviceGuestSubmit(agreement);
                                    //console.log('GuestSubmit: '+ JSON.stringify(agreement));
                                }} 
                            />    
                        </Link> 
                    </div> 
                </div>                                             
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

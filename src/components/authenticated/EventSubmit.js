import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Message} from 'primereact/message';
import {Panel} from 'primereact/panel';
import {FileUpload} from 'primereact/fileupload';
import {Accordion, AccordionTab} from 'primereact/accordion';
import {Editor} from 'primereact/editor';
import { Link } from 'react-router-dom';

import EventForm from "./forms/EventForm";
import GuestSubmitForm from "./forms/GuestSubmitForm";
import { addEventAction } from "../../Store/ACCIONES";


class EventSubmit extends Component {

    constructor() {
        super();
        this.state = {
            university:'',
            photoUrl:'',
            termsAndConditions:'',
            business:'',

        };
    }

    componentWillMount() {
    }

    injectEventsDispatch = (values) =>{
        this.props.addEventDispatch(values);
    }

    serviceEventSubmit = (event) =>{
        axios.post('http://localhost:8080/events/addEvent', event)
            .then(function (response) {
                //console.log(response);
                if (response.status===200) {
                    alert('Event added succesfully');
                    //window.location = '#/';  
                } else {
                    console.log('Something went wrong'+ response);
                }
            })
    }

    render() {
        return (
            <div className="p-col-12">                
                {/* <EventForm dataEvent={this.injectEventsDispatch}/> */}

                    <div className="p-col-12 p-md-4">
                        <div>
                            <label htmlFor="universityField">University*</label>
                        </div>
                        
                        <InputText name="university" id="university" placeholder="University"
                            value={this.state.university} onChange={(e) => this.setState({university: e.target.value})} />
                    </div>
                        
                    <FileUpload name="demo[]"  multiple={true} 
                            accept="image/*" maxFileSize={10000000} 
                            url="http://localhost:8080/uploadFile" />

                    <Accordion>
                        {/* <AccordionTab header="Disclaimer">
                            <Field name="disclaimer" component={fieldDisclaimer} />
                        </AccordionTab> */}
                        
                        <AccordionTab header="Terms and conditions">
                            <Editor name="termsAndConditions" style={{height:'320px'}} 
                                value={this.state.termsAndConditions} onTextChange={(e)=>this.setState({termsAndConditions:e.htmlValue})} />
                        </AccordionTab>
                        
                        <AccordionTab header="Business case">
                            <Editor name="business" style={{height:'320px'}}                     
                                value={this.state.business} onTextChange={(e)=>this.setState({business:e.htmlValue})} />
                        </AccordionTab>
                    </Accordion>
                    
                    {/* to={'/'} */}
                    <Link to={'/'} style={{marginLeft:12}} >
                        <Button label="Save" style={{maxWidth:120, width:100, marginTop:15 }}
                            onClick={()=>{ 
                                let event={
                                    photoUrl:'photo must be here',
                                    university:this.state.university,
                                    termsAndConditions:this.state.termsAndConditions,
                                    business:this.state.business
                                };
                                
                                this.serviceEventSubmit(event);
                            }} 
                        /> 
                    </Link>

                    <Link to={'/'} style={{marginLeft:12}} >
                        <Button label="Delete" onClick={ ()=>{ } } 
                            style={{maxWidth:120, width:100, marginTop:15 }}
                        /> 
                    </Link>
           
            
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

import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {Editor} from 'primereact/editor';
import {Button} from 'primereact/button';
import {Panel} from 'primereact/panel';
import {Checkbox} from 'primereact/checkbox';
import {Accordion, AccordionTab} from 'primereact/accordion';

import { Link } from 'react-router-dom';

export class EmptyPage extends Component {
    constructor() {
        super();
        this.state = {
            eventId:0,
            eventObj:{},
            mail:'',
            
            disclaimer:'',
            termsAndConditions:'',
            business:'',
            
            disclaimerChecked: false,
            termsAndConditionsChecked: false,
            businessChecked: false,
        };
        
    }

    componentDidMount() {
        let eventMail=this.obtainUrlPart();
        let eventFromAxios = axios.get(
            'http://localhost:8080/events/getEvent/'+eventMail.event)
        .then(res => res.data)
        .then(data => {
            this.setState({ disclaimer: data.disclaimer, termsAndConditions:data.termsAndConditions, business:data.business });
            return data;
        });

        this.setState({
            eventId:eventMail.event,
            eventObj:eventFromAxios, 
            mail:eventMail.mail           
        });}

    
    header = (
        <span className="ql-formats">
        </span>
    );

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
    
    //Obtain part of url eventId and user mail
    //http://localhost:3000/#/acept-agreement?event=1*lic.jorge@correo.edu
    obtainUrlPart = () =>{
        let location = 'url:'+ window.location;
        
        var endEventKey = location.lastIndexOf('*');
        var eventIndex = location.lastIndexOf('event');
        var event = location.substring(eventIndex + 6,endEventKey);
        var mail = location.substring(endEventKey + 1);
        //console.log(result);
        return {event,mail};
    }

    render() {
        return (
            <div className="p-grid p-fluid dashboard">
                
                <div className="p-col-12 p-lg-12">
                    <Panel header="Disclaimer agree" >
                        <div className="activity-header">                            
                            <Accordion>
                                {/* <AccordionTab header="Disclaimer">
                                    
                                    <Editor name="disclaimerEditor" style={{height:'320px'}} readOnly={true} headerTemplate={this.header}
                                        value={this.state.disclaimer}
                                    />

                                    <div className="p-col-12">
                                        <Checkbox checked={this.state.disclaimerChecked} onChange={e => this.setState({disclaimerChecked: e.checked})} />
                                        <label htmlFor="cb1" className="p-checkbox-label">Agree</label>
                                    </div>
                                </AccordionTab> */}
                                <AccordionTab header="Terms and conditions">
                                        
                                    <Editor name="termsEditor" style={{height:'320px'}} readOnly={true} headerTemplate={this.header}
                                    value={this.state.termsAndConditions}/>

                                    <div className="p-col-12">
                                        <Checkbox checked={this.state.termsAndConditionsChecked} onChange={e => this.setState({termsAndConditionsChecked: e.checked})} />
                                        <label htmlFor="cb2" className="p-checkbox-label">Agree</label>
                                    </div>
                                </AccordionTab>
                                
                                <AccordionTab header="Business Case">
                                    <Editor name="businessEditor" style={{height:'320px'}} 
                                        onTextChange={(e) => this.setState({business: e.htmlValue})}
                                        readOnly={true} headerTemplate={this.header}
                                        value={this.state.business}
                                    />
                                
                                    <div className="p-col-12">
                                        <Checkbox checked={this.state.businessChecked} onChange={e => this.setState({businessChecked: e.checked})} />
                                        <label htmlFor="cb3" className="p-checkbox-label">Agree</label>
                                    </div>
                                </AccordionTab>
                            </Accordion>
                        </div>
                    </Panel>
                </div>

                <div className="p-col-2">
                    {/* <Button type="button" label="Otro" icon="fa-send" 
                        onClick={()=>{
                            //console.log(this.state.event.business);
                            window.location = '#/';
                        }}/> */}
                    
                    {/* {http://localhost:3000/#/} */}
                    
                    <Link to='/'>                    
                        <Button label="Submit" style={{ marginTop:15 }}  
                            onClick={()=>{                        
                                //this.serviceGuestSubmit(this.state.agreement);
                            } }
                        />    
                    </Link>  
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({        
    // mensaje:state.reducerMensajeErrorAutenticacion,
    //usuario:state.reducerSession
  });
  
  const mapDispatchToProps = (dispatch) =>({
    //  autenticaUsuarioDispatch:(values) =>{    
    //    dispatch(actionAutenticaUsuario(values));
    //  },
  });
  
  //export default LogIn {
  export default connect(mapStateToProps,mapDispatchToProps)(EmptyPage);
import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {Editor} from 'primereact/editor';
import {Button} from 'primereact/button';
import {Panel} from 'primereact/panel';
import {Checkbox} from 'primereact/checkbox';
import {Accordion, AccordionTab} from 'primereact/accordion';

export class EmptyPage extends Component {
    constructor() {
        super();
        this.state = {
            eventId:0,
            event:{},
            usuario:'',
            disclaimer:'',
            termsAndConditions:'',
            business:''
        };
        
    }

    componentDidMount() {
        let eventMail=this.obtainUrlPart();
        let event = axios.get(
            'http://localhost:8080/events/getEvent/'+eventMail.event)
        .then(res => res.data); 

            console.log(event);
        const{disclaimer,termsAndConditions,business}=event;
        this.setState({
            eventId:eventMail.event,
            event:event, 
            usuario:eventMail.mail,
            
            disclaimerChecked: false,
            termsAndConditionsChecked: false,
            businessChecked: false,
        });
    }
    
    header = (
        <span className="ql-formats">
            
        </span>
    );
    
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
                                <AccordionTab header="Disclaimer">
                                    The story begins as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
                                    <div className="p-col-12">
                                        <Checkbox checked={this.state.disclaimerChecked} onChange={e => this.setState({disclaimerChecked: e.checked})} />
                                        <label htmlFor="cb1" className="p-checkbox-label">Ultima</label>
                                    </div>
                                </AccordionTab>
                                <AccordionTab header="Terms and conditions">
                                    Francis Ford Coppola's legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels the young Vito Corleone's rise with his son Michael's spiritual fall, deepening The_Godfather's depiction of the dark side of the American dream. In the early 1900s, the child Vito flees his Sicilian village for America after the local Mafia kills his family. Vito struggles to make a living, legally or illegally, for his wife and growing brood in Little Italy.
                                    <div className="p-col-12">
                                        <Checkbox checked={this.state.termsAndConditionsChecked} onChange={e => this.setState({termsAndConditionsChecked: e.checked})} />
                                        <label htmlFor="cb1" className="p-checkbox-label">Ultima</label>
                                    </div>
                                </AccordionTab>
                                
                                <AccordionTab header="Business Case">
                                <Editor style={{height:'320px'}} readOnly={true} headerTemplate={this.header}
                                    value={this.state.event.business}
                                />
                                
                                    <div className="p-col-12">
                                        <Checkbox checked={this.state.businessChecked} onChange={e => this.setState({businessChecked: e.checked})} />
                                    </div>
                                </AccordionTab>
                            </Accordion>
                        </div>
                    </Panel>
                </div>

                <div className="p-col-2">
                    <Button type="button" label="Submit" icon="fa-send" 
                        onClick={()=>{
                            console.log(this.state.event.business);
                            //window.location = '#/'
                        }}/>
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
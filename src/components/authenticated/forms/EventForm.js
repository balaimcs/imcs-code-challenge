import React from 'react';
import { Field, reduxForm } from "redux-form";

import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Message} from 'primereact/message';
import {Panel} from 'primereact/panel';

import { Link } from 'react-router-dom';
import {FileUpload} from 'primereact/fileupload';
import {Accordion, AccordionTab} from 'primereact/accordion';
import {Editor} from 'primereact/editor';

    const validate = (values) => {
        const errors = {};

        //Validaciones para correo
        if (!values.photoUrl){
            errors.photoUrl='Mandatory field'
        }

        if (!values.disclaimer){
            errors.disclaimer='Mandatory field'
        }

        if (!values.termsAndConditions){
            errors.termsAndConditions='Mandatory field'
        }

        if (!values.business){
            errors.business='Mandatory field'
        }

        return errors;
    }

    const fieldPhoto = (props) => {
        //console.log('LogInForm: fieldNombre: props', props);
        return (
            <div>
                <InputText name="photoUrl" placeholder="Photo" 
                    onChange={props.input.onChange} style={{}}/>

                <br/>    
                {props.meta.touched && props.meta.error && 
                <Message severity="warn" text={props.meta.error} ></Message>}                              
            </div>
        );
    }

    const fieldDisclaimer = (props) => {
        return(
            <div>
                <Editor name="disclaimer" style={{height:'320px'}} 
                    onTextChange={props.input.onChange}/>
                <br/>    
                {props.meta.touched && props.meta.error && 
                <Message severity="warn" text={props.meta.error} 
                    style={{}}></Message>}
            </div>           
                  
        );
    }

    const fieldTermsAndConditions = (props) =>{
        return(
            <div>
                <Editor name="termsAndConditions" style={{height:'320px'}} 
                    onTextChange={props.input.onChange}/>
                <br/>
                {props.meta.touched && props.meta.error && 
                <Message severity="warn" text={props.meta.error} 
                    style={{}}></Message>}
            </div>
        );
    }
                   
    const fieldBusinessCase = (props) =>{
        return(  
            <div>
                <Editor name="business" style={{height:'320px'}}                     
                    onTextChange={props.input.onChange}/>
                <br/>
                {props.meta.touched && props.meta.error && 
                <Message severity="warn" text={props.meta.error} 
                    style={{}}></Message>}           
            </div>          
        );
    }

    const EventForm = (props) => { 
        return (
            <Panel header="Agreement">
                <div>

                <FileUpload name="demo[]"  multiple={true} 
                        accept="image/*" maxFileSize={10000000} 
                        url="http://localhost:8080/uploadFile" />

                    <Accordion>
                        {/* <AccordionTab header="Disclaimer">
                            <Field name="disclaimer" component={fieldDisclaimer} />
                        </AccordionTab> */}
                        
                        <AccordionTab header="Terms and conditions">
                            <Field name="termsAndConditions" component={fieldTermsAndConditions} />
                        </AccordionTab>
                        
                        <AccordionTab header="Business case">
                            <Field name="business" component={fieldBusinessCase}/>
                        </AccordionTab>
                    </Accordion>
                    
                    <Button label="Submit" onMouseUp={()=>{window.location = '#/';}}
                        onClick={ props.handleSubmit(props.dataEvent)} 
                        style={{maxWidth:120, width:100, marginTop:15 }}
                    /> 

                    <Link to={'/'} style={{marginLeft:12}} >
                        <Button label="Delete" onClick={ ()=>{ } } 
                            style={{maxWidth:120, width:100, marginTop:15 }}
                        /> 
                    </Link>
                    
                </div>                
            </Panel>
        );
}

export default reduxForm({form:'EventForm', validate })(EventForm)

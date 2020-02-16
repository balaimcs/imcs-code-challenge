import React from 'react';
import { Field, reduxForm } from "redux-form";

import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';
import {Message} from 'primereact/message';
import {Panel} from 'primereact/panel';

    const validate = (values) => {
        const errors = {};

        //Validaciones para correo
        if (!values.email){
            errors.email='Este campor es requerido'
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
            errors.email='Mail invalid format'
        }else if(!values.email.endsWith('.edu')){
            errors.email='Mail invalid domain must ends with .edu'
        }

        //Validaciones para password
        if (!values.password){
            errors.password = 'Requerido'
        }else if (values.password.length < 5 ){
            errors.password='Debe ser al menos 5 caracteres'
        }else if (values.password.length > 10 ){
            errors.password='Debe ser menos de 10 caracteres'
        }

        return errors;
    }

    
    const fieldFirstName = (props) => {
        //console.log('LogInForm: fieldNombre: props', props);
        return (
            <div>
                <InputText name="firstName" placeholder="First name" 
                    onChange={props.input.onChange} style={{maxWidth:320, width:320, }}/>
                    
                <br/>    
                {props.meta.touched && props.meta.error && 
                <Message severity="warn" text={props.meta.error} 
                    style={{maxWidth:320, width:320, marginTop:5 }}></Message>}                              
            </div>
            
        );
    }

    const fieldMiddleName = (props) => {
        //console.log('LogInForm: fieldNombre: props', props);
        return (
            <div>
                <InputText name= "middleName" placeholder="Middle name" 
                    onChange={props.input.onChange} style={{maxWidth:320, width:320, }}/>
                    
                <br/>    
                {props.meta.touched && props.meta.error && 
                <Message severity="warn" text={props.meta.error} 
                    style={{maxWidth:320, width:320, marginTop:5 }}></Message>}                              
            </div>
            
        );
    }

    const fieldLastName = (props) => {
        //console.log('LogInForm: fieldNombre: props', props);
        return (
            <div>
                <InputText name="lastName" placeholder="Last name" 
                    onChange={props.input.onChange} style={{maxWidth:320, width:320, }}/>
                    
                <br/>    
                {props.meta.touched && props.meta.error && 
                <Message severity="warn" text={props.meta.error} 
                    style={{maxWidth:320, width:320, marginTop:5 }}></Message>}                              
            </div>
            
        );
    }

    const fieldPhone = (props) => {
        //console.log('LogInForm: fieldNombre: props', props);
        return (
            <div>
                <InputText name="phone" placeholder="Phone" 
                    onChange={props.input.onChange} style={{maxWidth:320, width:320, }}/>
                    
                <br/>    
                {props.meta.touched && props.meta.error && 
                <Message severity="warn" text={props.meta.error} 
                    style={{maxWidth:320, width:320, marginTop:5 }}></Message>}                              
            </div>
            
        );
    }

    const fieldEmail = (props) => {
        //console.log('LogInForm: fieldNombre: props', props);
        return (
            <div>
                <InputText name="email" placeholder="Mail" 
                    onChange={props.input.onChange} style={{maxWidth:320, width:320, }}/>
                    
                <br/>    
                {props.meta.touched && props.meta.error && 
                <Message severity="warn" text={props.meta.error} 
                    style={{maxWidth:320, width:320, marginTop:5 }}></Message>}                              
            </div>
            
        );
    }


    const GuestSubmitForm = (props) => { 
        return (
            <Panel header="Contact Us">
                <div>       
                    <Field name="firstName" component={fieldFirstName} ph="First name"/>
                    <Field name="middleName" component={fieldMiddleName} ph="Middle name"/>
                    <Field name="lastName" component={fieldLastName} ph="Last Name"/>
                    <Field name="phone" component={fieldPhone} ph="Phone "/>
                    <Field name="email" component={fieldEmail} ph=".edu Email id"/>
 
                    <Button label="Submit"  onClick={props.handleSubmit(props.dataEvent)} 
                        style={{maxWidth:320, width:300, marginTop:15 }}
                    />                                         
                
                </div>
            </Panel>
            
        );
}

export default reduxForm({form:'GuestInfoForm', validate })(GuestSubmitForm)

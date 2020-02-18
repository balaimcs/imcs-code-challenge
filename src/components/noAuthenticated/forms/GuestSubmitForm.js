import React from 'react';
import { Field, reduxForm } from "redux-form";
import { Link } from 'react-router-dom';

import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Message} from 'primereact/message';

    const validate = (values) => {
        const errors = {};

        //Validaciones para correo
        if (!values.email){
            errors.email='Required'
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
            errors.email='Mail invalid format'
        }else if(!values.email.endsWith('.edu')){
            errors.email='Mail invalid domain must ends with .edu'
        }

        if (!values.firstName){
            errors.firstName = 'Required'
        }

        if (!values.lastName){
            errors.lastName = 'Required'
        }

        if (!values.phone){
            errors.phone = 'Required'
        }

        //password validaciones 
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
            <div className="p-col-12 p-md-3">
                <div>
                    <label htmlFor="firstName">First name *</label>
                </div>
                <InputText name="firstName" id="firstName" placeholder="First name" 
                    onChange={props.input.onChange} />      
                {props.meta.touched && props.meta.error && 
                <Message severity="warn" ></Message>}                              
            </div>
            
        );
    }

    const fieldMiddleName = (props) => {
        //console.log('LogInForm: fieldNombre: props', props);
        return (
            <div className="p-col-12 p-md-3">
                <div>
                    <label htmlFor="firstName">Middle name</label>
                </div>
                <InputText name= "middleName" placeholder="Middle name" 
                    onChange={props.input.onChange} />                              
            </div>
            
        );
    }

    const fieldLastName = (props) => {
        //console.log('LogInForm: fieldNombre: props', props);
        return (
            <div className="p-col-12 p-md-3">
                <div>
                    <label htmlFor="firstName">Last name*</label>
                </div>
                <InputText name="lastName" placeholder="Last name" 
                    onChange={props.input.onChange} />
                {props.meta.touched && props.meta.error && 
                <Message severity="warn"></Message>}                              
            </div>
            
        );
    }

    const fieldPhone = (props) => {
        //console.log('LogInForm: fieldNombre: props', props);
        return (
            <div className="p-col-12 p-md-3">
                <div>
                    <label htmlFor="firstName">Phone*</label>
                </div>
                <InputText name="phoneNumber" placeholder="(123) 456 7890" 
                    onChange={props.input.onChange} />
                {props.meta.touched && props.meta.error && 
                <Message severity="warn"></Message>}                              
            </div>
            
        );
    }

    const fieldEmail = (props) => {
        //console.log('LogInForm: fieldNombre: props', props);
        return (
            <div className="p-col-12 p-md-6">
                <div>
                    <label htmlFor="firstName">Mail*</label>
                </div>
                <InputText name="email" placeholder="Mail" 
                    onChange={props.input.onChange} />
                 
                {props.meta.touched && props.meta.error && 
                <Message severity="warn"></Message>}                              
            </div>
            
        );
    }

    const GuestSubmitForm = (props) => { 
        const nextLink='/acept-agreement?event='+props.eventId+'*';
        return (            
            <div className="card card-w-title"> 
                <h1>Registration Form</h1> 
                <div className="p-grid">
                    <Field name="firstName" component={fieldFirstName} ph="First name"/>
                    <Field name="middleName" component={fieldMiddleName} ph="Middle name"/>
                    <Field name="lastName" component={fieldLastName} ph="Last Name"/>
                    <Field name="phoneNumber" component={fieldPhone} ph="Phone "/>
                    <Field name="email" component={fieldEmail} ph=".edu Email id"/>
                        
            </div>  
                {/* <Link to={nextLink} onClick={props.handleSubmit(props.dataGuest)}> */}
                    <Button onClick={props.handleSubmit(props.dataGuest)} 
                        // onMouseOver={()=>{window.location = nextLink}}
                        label="Submit" style={{ marginTop:15 }} />
                {/* </Link>                                            */}
            </div>   
        );
    }

export default reduxForm({form:'GuestInfoForm', validate })(GuestSubmitForm)

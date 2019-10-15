import React from 'react';
import { Field, reduxForm } from "redux-form";

import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';
import {Message} from 'primereact/message';

    const validate = (values) => {
        const errors = {};

        //Validaciones para correo
        if (!values.correo){
            errors.correo='Este campor es requerido'
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correo)){
            errors.correo='Correo invalido'
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

    

    const fieldNombre = (props) => {
        //console.log('LogInForm: fieldNombre: props', props);
        return (
            <div>
                <InputText name="correo" placeholder="Correo" 
                    onChange={props.input.onChange} style={{maxWidth:320, width:320, }}/>
                    
                <br/>    
                {props.meta.touched && props.meta.error && 
                <Message severity="warn" text={props.meta.error} 
                    style={{maxWidth:320, width:320, marginTop:5 }}></Message>}                              
            </div>
            
        );
    }

    const fieldPassword = (props) => {
        //console.log('LogInForm: fieldNombre: props', props);
        return (
            <div>
                <Password name="password" placeholder="Contraseña" 
                    onChange={props.input.onChange} style={{maxWidth:320, width:320, marginTop:10 }}/>
                
                <br/>    
                {props.meta.touched && props.meta.error && 
                <Message severity="warn" text={props.meta.error} 
                    style={{maxWidth:320, width:320, marginTop:5 }}></Message>}                
            </div>            
        );
    }

    const LogInForm = (props) => {  
        return (
            <div>       
                <Field name="correo" component={fieldNombre} ph="Correo"/>                
                <Field name="password" component={fieldPassword} ph="*****"/> 
                
                <Button label="Autenticar" icon="pi pi-fw pi-power-off" 
                    className="p-button-secondary p-button-rounded"
                    onClick={props.handleSubmit(                            
                        props.datosUsuarioDispatch
                    )} style={{maxWidth:320, width:300, marginTop:15 }}
                />                                         
                
            </div>
        );
}

export default reduxForm({form:'LogInForm', validate })(LogInForm)

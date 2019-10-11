import React from 'react';
import { Field, reduxForm } from "redux-form";

import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';
import {Card} from 'primereact/card';
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

    const header=(
        <div>
            <img src="assets/layout/images/profile.png" />
        </div>
    );

    const fieldNombre = (props) => {
        //console.log('LogInForm: fieldNombre: props', props);
        return (
            <div>
                <InputText name="correo" placeholder="Correo" 
                    onChange={props.input.onChange} />
                    <br/>
                {props.meta.touched && props.meta.error && <Message severity="error" text={props.meta.error} /> }
            </div>
            
        );
    }

    const fieldPassword = (props) => {
        //console.log('LogInForm: fieldNombre: props', props);
        return (
            <div>
                <Password name="password" placeholder="Contraseña" 
                    onChange={props.input.onChange} />
                    <br/>
                {props.meta.touched && props.meta.error && <Message severity="error" text={props.meta.error} /> }
            </div>            
        );
    }

    const LogInForm = (props) => {  
        return (
            <div className="layout-profile" style={{maxWidth:450}}>
                <Card className="p-card" header={header}
                    title="Autenticar usuario" style={{justifyContent: 'center', }}
                    subTitle="Favor de ingrese sus credenciales">                                                                  
                        
                        <Field name="correo" component={fieldNombre} ph="Correo" />
                        <br/>
                        <Field name="password" component={fieldPassword} ph="*****"/> 
                        <br/>
                        <div>
                            <Button label="Autenticar" icon="pi pi-fw pi-power-off" 
                                className="p-button-secondary p-button-rounded"
                                onClick={props.handleSubmit(
                                        props.datosUsuarioDispatch
                                )} 
                            />                       
                        </div>
                        {/* <div className="layout-profile-expanded">
                            <button className="p-link" 
                                onClick={ props.handleSubmit(props.datosUsuarioDispatch) }>
                                <i className="pi pi-fw pi-power-off"/><span>LogIn</span>
                            </button>
                        </div> */}
                        
                </Card>
            </div>
        );
}

export default reduxForm({form:'LogInForm', validate })(LogInForm)

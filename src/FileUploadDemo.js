
import React, { Component } from 'react';
import {FileUpload} from 'primereact/fileupload';
import {Growl} from 'primereact/growl';

import axios from 'axios';
import { Button } from 'primereact/button';


export class FileUploadDemo extends Component {

    constructor() {
        super();
    }


    myUploader(event) {
        let data = new FormData();
        //event.files == files to upload
    }

    myScriptToUploadFile = fileInput =>{
        //fileInput.files == files to upload
        console.log('Si entra');
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/javascript");

        var formdata = new FormData();
        formdata.append("file", fileInput.files[0], "avatar_1.png");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };

          fetch("http://localhost:8080/uploadFile", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    

    render() {
        return (
            <FileUpload mode="basic" name="demo[]" url="./upload.php" accept="image/*" maxFileSize={1000000} /> 
        )
    }
}
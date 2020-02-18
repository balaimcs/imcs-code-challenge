import React, { Component } from 'react'
import { connect } from 'react-redux';

import UserService from "../../service/UserService";

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

//import {  } from "./Store/ACCIONES";

class GuestList extends Component {

    constructor() {
        super();
        this.state = {
            guestList:[]
        };
        this.userService = new UserService();
    }

    componentDidMount() {
        this.userService.getGuesList().then(data => this.setState({guestList: data}));   
    }

    render() {     

        return (
            <div>
                <DataTable value={this.state.guestList}>
                    <Column field="firstName" header="First name" />
                    <Column field="lastName" header="Last name" />
                    <Column field="email" header="Mail" />
                    <Column field="phoneNumber" header="Phone number" />
                </DataTable>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) =>({
});

export default connect(mapStateToProps,mapDispatchToProps)(GuestList);

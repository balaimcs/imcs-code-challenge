import React, { Component } from 'react'
import { connect } from 'react-redux';

import {  } from "./Store/ACCIONES";

import Panel from "./Panel";

class Base extends Component {

    componentWillMount() {
    }

    render() {
        return (
            <div>
                <Panel />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
     
});

const mapDispatchToProps = (dispatch) =>({

});

export default connect(mapStateToProps,mapDispatchToProps)(Base);

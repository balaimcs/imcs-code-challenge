import React, {Component} from 'react';

export class EmptyPage extends Component {

    render() {
        return (
            <div className="p-grid p-fluid dashboard">
                <div className="p-col-9">
                    <div className="card">
                        <h1>Empty Page</h1>
                        
                        <div className="p-fluid ">
                            <div className="card summary">
                                <span className="title">Users</span>
                                <span className="detail">Number of visitors</span>
                                <span className="count visitors">12</span>
                            </div>

                            <div className="card summary">
                                <span className="title">Users</span>
                                <span className="detail">Number of visitors</span>
                                <span className="count purchases">12</span>
                            </div>

                            <div className="card summary">
                                <span className="title">Users</span>
                                <span className="detail">Number of visitors</span>
                                <span className="count visitors">12</span>
                            </div>

                            <div className="card summary">
                                <span className="title">Users</span>
                                <span className="detail">Number of visitors</span>
                                <span className="count visitors">12</span>
                            </div>
                        </div>
                        

                    </div>
                </div>
                <div className="p-col-3">
                    <div className="card">
                        <h1>Empty Page</h1>
                        <p>Use this page to start from scratch and place your custom content.</p>
                    </div>
                </div>
            </div>
        );
    }
}
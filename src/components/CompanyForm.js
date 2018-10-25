import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { Link } from 'react-router-dom';

class CompanyForm extends Component {      

    renderHomePage() {
        return(
            <Col xs={6} className="col_company">
                <Row>
                    <div className="overview_title">Create Company</div>
                </Row>
                <Row className="row_margin">
                    <div className="overview_subtitle">Name:</div>
                    <input type="text" className="form-control" ref="companyName" placeholder="name"></input>
                </Row>
                <Row className="row_margin">
                    <div className="overview_subtitle">Address:</div>
                    <input type="text" className="form-control" ref="companyAddress" placeholder="address"></input>
                </Row>
                <Row className="row_margin">
                    <div className="overview_subtitle">Revenue:</div>
                    <input type="text" className="form-control" ref="companyRevenue" placeholder="revenue"></input>
                </Row>
                <Row className="row_margin">
                    <div className="overview_subtitle">Phone No:</div>
                    <div className="phone_div">
                        <input type="text" className="form-control phone_code" ref="companyPhoneCode" placeholder="code"></input>
                        <input type="text" className="form-control phone_number" ref="companyPhoneNumber" placeholder="number"></input> 
                    </div>
                </Row>
                <Row className="row_margin">
                    <input type="submit" className="btn btn-primary overview_button" value="Create"></input>
                </Row>
            </Col>
        );
    }

    render() {
        return (
        this.renderHomePage()
        );   
    }
}

export default CompanyForm;
import React, { Component } from 'react';
import { Grid, Row, Col, FormControl } from 'react-bootstrap';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { Link } from 'react-router-dom';

class OfficeForm extends Component {
    
    renderCompanyList() {

    }

    renderHomePage() {
        return(
            <Col xs={6} className="col_office">
                <Row>
                    <div className="overview_title">Create Office</div>
                </Row>
                <Row className="row_margin">
                    <div className="overview_subtitle">Name:</div>
                    <input type="text" className="form-control" ref="officeName" placeholder="name"></input>
                </Row>
                <Row className="row_margin">
                    <div className="overview_subtitle">Location:</div>
                    <input type="text" className="form-control location_lat" ref="officeLocationLat" placeholder="latitude"></input>
                    <input type="text" className="form-control location_lon" ref="officeLocationLon" placeholder="longitude"></input>
                </Row>
                <Row className="row_margin">
                    <div className="overview_subtitle">Office Start Date:</div>
                    <input type="text" className="form-control" ref="companyDate" placeholder="date"></input>
                </Row>
                <Row className="row_margin">
                    <div className="overview_subtitle">Company:</div>
                    <FormControl componentClass="select" placeholder="select company">
                        {this.renderCompanyList()}
                    </FormControl>
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

export default OfficeForm;
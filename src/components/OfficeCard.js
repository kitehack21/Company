import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteOffice } from '../actions';

class OfficeCard extends Component {    
    render() {
        if (this.props.offi.offices.length !== 0) {
            var arrJSX = [];
            this.props.offi.offices.map((item, index) => {
                arrJSX.push(
                    <Col xs={6} style={{'margin-bottom': '20px'}}>
                        <Col xs={12} className="company_card_border">
                            <Row style={{'margin-left': '5px', 'margin-right': '5px', 'border-bottom': '2px solid rgb(185, 185, 185)'}}>
                                <span className="company_card_title">
                                    {item.name}:
                                </span>
                                <span className="company_card_delete">
                                    <i className="fa fa-times" onClick={() => this.props.deleteOffice(item.id, this.props.company_id)}></i>
                                </span>
                            </Row>
                            <Row className="company_card_row">
                                <div className="company_card_subtitle">Location:</div>
                                <div className="company_card_text">Lat: {item.latitude}</div>
                                <div className="company_card_text">Log: {item.longitude}</div>
                            </Row>
                            <Row className="company_card_row">
                                <div className="company_card_subtitle">Office Start Date:</div>
                                <div className="company_card_text">{item.start_date}</div>
                            </Row>
                        </Col>
                    </Col>
                )
            })
            return arrJSX; 
        }
        return (
            <div>Waiting for Data</div>
        )
    }
}

const mapStateToProps = (state) => {
    const offi = state.offi;

    return { offi }
}

export default connect( mapStateToProps, { deleteOffice })(OfficeCard);
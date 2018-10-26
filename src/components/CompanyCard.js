import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCompany } from '../actions';

class CompanyCard extends Component {    
    render() {
        if (this.props.comp.companies.length !== 0) {
            var arrJSX = [];
            this.props.comp.companies.map((item, index) => {
                arrJSX.push(
                    <Col xs={6} style={{'margin-bottom': '20px'}} onClick={()=>this.props.pushPage(item.id)}>
                        <Col xs={12} className="company_card_border">
                            <Row style={{'margin-left': '5px', 'margin-right': '5px', 'border-bottom': '2px solid rgb(185, 185, 185)'}}>
                                <span className="company_card_title">
                                    {item.name}
                                </span>
                                <span className="company_card_delete">
                                    <i className="fa fa-times" onClick={() => this.props.deleteCompany(item.id)}></i>
                                </span>
                            </Row>
                            <Row className="company_card_row">
                                <div className="company_card_subtitle">Address:</div>
                                <div className="company_card_text">{item.address}</div>
                            </Row>
                            <Row className="company_card_row">
                                <div className="company_card_subtitle">Revenue:</div>
                                <div className="company_card_text">{item.revenue}</div>
                            </Row>
                            <Row className="company_card_row">
                                <div className="company_card_subtitle">Phone No:</div>
                                <div className="company_card_text">({item.code}) {item.phone}</div>
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
    const comp = state.comp;

    return { comp }
}

export default connect( mapStateToProps, { deleteCompany })(CompanyCard);
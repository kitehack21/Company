import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCompanyList } from '../actions';
import CompanyForm from './CompanyForm';
import OfficeForm from './OfficeForm';
import CompanyCard from './CompanyCard';

class OverviewPage extends Component {
    componentWillMount() {
        this.props.updateCompanyList();
    }

    onLinkClick(id) {
        this.props.history.push(`/office/${id}`)
    }

    renderHomePage() {
        return(
            <Grid fluid>
                <Row>
                    <Col xsOffset={3} xs={6}>
                        <Row className="form_to_card_border">
                            <CompanyForm />
                            <OfficeForm />
                        </Row>
                        <Row style={{'margin-bottom': '10px'}}>
                            <span style={{'font-size': '26px', 'margin-left': '10px'}}>COMPANIES</span>
                        </Row>
                        <Row>
                            <CompanyCard pushPage={(id)=>this.onLinkClick(id)}/>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }

    render() {
        return (
        this.renderHomePage()
        );   
    }
}

const mapStateToProps = (state) => {
    const comp = state.comp;

    return { comp };
}

export default connect( mapStateToProps, { updateCompanyList })(OverviewPage);
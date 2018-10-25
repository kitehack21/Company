import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { Link } from 'react-router-dom';
import CompanyForm from './CompanyForm';
import OfficeForm from './OfficeForm';

class OverviewPage extends Component {      

    renderHomePage() {
        return(
                <Grid fluid>
                    <Row>
                        <Col xsOffset={3} xs={6}>
                            <CompanyForm />
                            <OfficeForm />
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

export default OverviewPage;
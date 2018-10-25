import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { Link } from 'react-router-dom';

class OfficesPage extends Component {      

    renderHomePage() {
        return(
                <Grid fluid>
                    This is OfficesPage
                </Grid>
            );
    }

    render() {
        return (
        this.renderHomePage()
        );   
    }
}

export default OfficesPage;
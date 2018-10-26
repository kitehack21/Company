import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {API_URL_1} from '../supports/api-url/apiurl'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CompanyDetail from './CompanyDetail';
import OfficeCard from './OfficeCard';
import { updateOfficeList } from '../actions';

class OfficesPage extends Component {
    componentWillMount() {
        this.props.updateOfficeList(this.props.match.params.id);
    }

    onLinkClick(target) {
        this.props.history.push(`/`);
    }

    renderHomePage() {
        return(
            <Grid fluid>
                <Row>
                    <Col xsOffset={3} xs={6}>
                        <Row className="form_to_card_border">
                            <CompanyDetail company_id={this.props.match.params.id} pushPage={()=>this.onLinkClick()}/>
                        </Row>
                        <Row style={{'margin-bottom': '10px'}}>
                            <span style={{'font-size': '26px', 'margin-left': '10px'}}>OFFICES</span>
                        </Row>
                        <Row>
                            <OfficeCard company_id={this.props.match.params.id}/>
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
    const { comp, offi } = state;

    return { comp, offi }
}

export default connect( mapStateToProps, { updateOfficeList })(OfficesPage);
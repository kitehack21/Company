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

    renderOfficeCard() {
        if (this.props.offi.offices.length !== 0) {
            var arrJSX = [];
            this.props.offi.offices.map((item, count) => {
                arrJSX.push(<OfficeCard item={item} company_id={this.props.match.params.id}/>)
            })
            return arrJSX;
        } else {
            return (
                <Col xs={12}>
                    <div className="text-center empty_text">There is no offices created yet</div>
                </Col>
            )
        }
        
    }

    renderHomePage() {
        return(
            <Grid fluid>
                <Row>
                    <Col xsOffset={0} xs={12} lgOffset={3} lg={6} className="page_border">
                        <Row className="form_to_card_border office_page_detail">
                            <CompanyDetail company_id={this.props.match.params.id} pushPage={()=>this.onLinkClick()}/>
                        </Row>
                        <Row style={{'margin-bottom': '10px'}}>
                            <span style={{'font-size': '26px', 'margin-left': '10px'}}>OFFICES</span>
                        </Row>
                        <Row>
                            {this.renderOfficeCard()}
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
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
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

    renderCompanyCard() {
        if (this.props.comp.companies.length !== 0) {
            var arrJSX = [];
            this.props.comp.companies.map((item, count) => {
                arrJSX.push(<CompanyCard item={item} pushPage={(id)=>this.onLinkClick(id)}/>)
            })
            return arrJSX
        } else {
            return (
                <Col xs={12}>
                    <div className="text-center empty_text">There is no companies created yet</div>
                </Col>
            )
        }
        
    }

    renderHomePage() {
        return(
            <Grid fluid>
                <Row>
                    <Col xsOffset={0} xs={12} lgOffset={3} lg={6} className="page_border">
                        <Row className="form_to_card_border">
                            <CompanyForm />
                            <OfficeForm />
                        </Row>
                        <Row style={{'margin-bottom': '10px'}}>
                            <span style={{'font-size': '26px', 'margin-left': '10px'}}>COMPANIES</span>
                        </Row>
                        <Row>
                            {this.renderCompanyCard()}
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
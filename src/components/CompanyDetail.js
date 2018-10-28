import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateCompanyList } from '../actions';

class CompanyDetail extends Component {
    state = { selected_company: [] }

    componentWillMount() {
        if (this.props.comp.companies.length === 0) {
            this.getCompanyList()
        } else {
            this.selectCompany()
        }
    }

    getCompanyList() {
        this.props.updateCompanyList();
    }

    componentWillReceiveProps(newProps) {
        newProps.comp.companies.map((item, index) => {
            if (item.id == this.props.company_id) {
                this.setState({selected_company: item})
            }
        })
    }

    selectCompany() {
        console.log(this.props.comp.companies)
        this.props.comp.companies.map((item, index) => {
            if (item.id == this.props.company_id) {
                this.setState({selected_company: item})
            }
        })
    }

    renderCompanyDetail() {
        return(
            <Col xs={12}>
                <Row className="company_detail_border">
                    <span className="company_detail_title">{this.state.selected_company.name}</span>
                </Row>
                <Row className="company_detail_row">
                    <div className="company_detail_subtitle">Address:</div>
                    <div className="company_detail_text">{this.state.selected_company.address}</div>
                </Row>
                <Row className="company_detail_row">
                    <div className="company_detail_subtitle">Revenue:</div>
                    <div className="company_detail_text">{this.state.selected_company.revenue}</div>
                </Row>
                <Row className="company_detail_row">
                    <div className="company_detail_subtitle">Phone No:</div>
                    <span className="company_detail_text">
                        ({this.state.selected_company.code}) {this.state.selected_company.phone}
                    </span>
                    <span className="pull-right">
                        <input type="button" className="btn btn-default" value="Back to Overview" onClick={() => this.props.pushPage()}></input>
                    </span>
                </Row>
            </Col>
        );
    }

    render() {
        return (
        this.renderCompanyDetail()
        );   
    }
}

const mapStateToProps = (state) => {
    const { comp, offi } = state;
    console.log(state.comp)
    return { comp, offi }
}

export default connect(mapStateToProps, { updateCompanyList })(CompanyDetail);
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addCompany } from '../actions';

class CompanyForm extends Component {

    onCompanyCreate() {
        var data = {
            name: this.refs.companyName.value,
            address: this.refs.companyAddress.value,
            revenue: this.refs.companyRevenue.value,
            code: this.refs.companyPhoneCode.value,
            phone: this.refs.companyPhoneNumber.value
        }
        this.props.addCompany(data);
        this.reset()
    }

    reset() {
        this.refs.companyName.value = '';
        this.refs.companyAddress.value = '';
        this.refs.companyRevenue.value = '';
        this.refs.companyPhoneCode.value = '';
        this.refs.companyPhoneNumber.value = '';
    }

    renderHomePage() {
        return(
            <Col xs={6} className="col_company">
                <Row>
                    <div className="overview_title">Create Company</div>
                </Row>
                <Row className="row_margin">
                    <div className="overview_subtitle">Name:</div>
                    <input type="text" className="form-control" ref="companyName" placeholder="name"></input>
                </Row>
                <Row className="row_margin">
                    <div className="overview_subtitle">Address:</div>
                    <input type="text" className="form-control" ref="companyAddress" placeholder="address"></input>
                </Row>
                <Row className="row_margin">
                    <div className="overview_subtitle">Revenue:</div>
                    <input type="text" className="form-control" ref="companyRevenue" placeholder="revenue"></input>
                </Row>
                <Row className="row_margin">
                    <div className="overview_subtitle">Phone No:</div>
                    <div className="phone_div">
                        <input type="text" className="form-control phone_code" ref="companyPhoneCode" placeholder="code"></input>
                        <input type="text" className="form-control phone_number" ref="companyPhoneNumber" placeholder="number"></input> 
                    </div>
                </Row>
                <Row className="row_margin">
                    <input type="submit" className="btn btn-primary overview_button" value="Create" onClick={()=>this.onCompanyCreate()}></input>
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

export default connect(null, { addCompany })(CompanyForm);
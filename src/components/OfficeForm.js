import React, { Component } from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addOffice } from '../actions';

class OfficeForm extends Component {
    
    renderCompanyList() {
        var arrJSX = [];
        this.props.comp.companies.map((item, index) => {
            arrJSX.push(<option value={item.id}>{item.name}</option>)
        })
        return arrJSX;

    }

    onOfficeCreate() {
        var data = {
            company_id: this.inputCompany.value,
            name: this.refs.officeName.value,
            latitude: this.refs.officeLocationLat.value,
            longitude: this.refs.officeLocationLon.value,
            start_date: this.refs.officeDate.value
        }
        this.props.addOffice(data);
        this.reset()
    }

    reset() {
        this.inputCompany.value = '';
        this.refs.officeName.value = '';
        this.refs.officeLocationLat.value = '';
        this.refs.officeLocationLon.value = '';
        this.refs.officeDate.value = '';
    }

    renderHomePage() {
        return(
            <Col xs={6} className="col_office">
                <Row>
                    <div className="overview_title">Create Office</div>
                </Row>
                <Row className="row_margin">
                    <div className="overview_subtitle">Name:</div>
                    <input type="text" className="form-control" ref="officeName" placeholder="name"></input>
                </Row>
                <Row className="row_margin">
                    <div className="overview_subtitle">Location:</div>
                    <input type="text" className="form-control location_lat" ref="officeLocationLat" placeholder="latitude"></input>
                    <input type="text" className="form-control location_lon" ref="officeLocationLon" placeholder="longitude"></input>
                </Row>
                <Row className="row_margin">
                    <div className="overview_subtitle">Office Start Date:</div>
                    <input type="text" className="form-control" ref="officeDate" placeholder="date"></input>
                </Row>
                <Row className="row_margin">
                    <div className="overview_subtitle">Company:</div>
                    <FormControl componentClass="select" placeholder="select company" inputRef={item => this.inputCompany = item}>
                        <option value=''>select</option>
                        {this.renderCompanyList()}
                    </FormControl>
                </Row>
                <Row className="row_margin">
                    <input type="submit" className="btn btn-primary overview_button" value="Create" onClick={() => this.onOfficeCreate()}></input>
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

const mapStateToProps = (state) => {
    const comp = state.comp;

    return { comp }
}

export default connect(mapStateToProps, { addOffice })(OfficeForm);
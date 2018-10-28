import React, { Component } from 'react';
import { Row, Col, Label } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addCompany } from '../actions';
import { Notification, CountryDropdown } from './common';

class CompanyForm extends Component {
    state = {country_code: '', error: [], input: [], snackbar: false, revenue: '', phone: '' }

    componentWillMount() {
        this.setState({ error: [false, false, false, false, false] , input: ['', '', '', '', ''] })
    }

    async onCompanyCreate() {
        await this.checkInput();
        var errIndicator = false;
        this.state.error.map((item, index) => {
            if (item) {
                errIndicator = true;
                return;
            }
        })
        if (errIndicator === true) {
            return
        } else {
            var data = {
                name: this.refs.companyName.value,
                address: this.refs.companyAddress.value,
                revenue: this.refs.companyRevenue.value,
                code: this.state.country_code,
                phone: this.refs.companyPhoneNumber.value
            }
            this.props.addCompany(data);
            this.displayNotification();
            this.reset()
        }   
    }

    checkInput() {
        var checkArr = [false, false, false, false]
        if (this.refs.companyName.value === '') {
            checkArr[0] = true;
        }
        if (this.refs.companyAddress.value === '') {
            checkArr[1] = true;
        }
        if (this.refs.companyRevenue.value === '') {
            checkArr[2] = true;
        }
        if (this.state.country_code === '') {
            checkArr[3] = true;
        }
        if (this.refs.companyPhoneNumber.value === '') {
            checkArr[4] = true;
        }
        this.setState({ error: checkArr})
    }

    reset() {
        this.refs.companyName.value = '';
        this.refs.companyAddress.value = '';
        this.setState({revenue: '', phone: ''})
    }

    displayNotification() {
        this.setState({snackbar: true})
        setTimeout(()=>this.setState({snackbar: false}), 3000);
    }

    onCountryPick(code) {
        this.setState({ country_code: code})
    }

    onChange(){
        return (
            {
                Revenue: (key) => {
                    const regex = /^[0-9\b]+$/;
                    if (key.target.value === '' || regex.test(key.target.value)) {
                    this.setState({revenue: key.target.value})
                    }
                },
                Phone: (key) => {
                    const regex = /^[0-9\b]+$/;
                    if (key.target.value === '' || regex.test(key.target.value)) {
                    this.setState({phone: key.target.value})
                    }
                }
            }
        )
    }

    renderLabel() {
        return (
            {
                Name: () => {
                    if (this.state.error[0] === true) {
                        this.state.input[0] = 'empty_input'
                        return <Label bsStyle="danger">Please input Name</Label>
                    } else {
                        this.state.input[0] = ''
                    }
                },
                Address: () => {
                    if (this.state.error[1] === true) {
                        this.state.input[1] = 'empty_input'
                        return <Label bsStyle="danger">Please input Address</Label>
                    }
                    else {
                        this.state.input[1] = ''
                    }
                },
                Revenue: () => {
                    if (this.state.error[2] === true) {
                        this.state.input[2] = 'empty_input'
                        return <Label bsStyle="danger">Please input Revenue</Label>
                    }
                    else {
                        this.state.input[2] = ''
                    }
                },
                Phone: () => {
                    if (this.state.error[3] === true || this.state.error[4] === true) {
                        if (this.state.error[3] === true) {
                            this.state.input[3] = '2px solid red'
                        } else {
                            this.state.input[3] = ''
                        }
                        if (this.state.error[4] === true) {
                            this.state.input[4] = 'empty_input'
                        } else {
                            this.state.input[4] = ''
                        }
                        
                        return <Label bsStyle="danger">Please input Code & Phone Number</Label>
                    }
                    else {
                        this.state.input[3] = ''
                        this.state.input[4] = ''
                    }
                }
            }
        )
    }

    renderHomePage() {
        return(
            <Col xs={6} className="col_company">
                <Row>
                    <div className="overview_title">Create Company</div>
                </Row>
                <Row className="row_margin">
                    <span className="overview_subtitle">Name:</span>{' '}
                    {this.renderLabel()['Name']()} 
                    <input type="text" className={`form-control ${this.state.input[0]}`} ref="companyName" placeholder="name"></input>
                </Row>
                <Row className="row_margin">
                    <span className="overview_subtitle">Address:</span>{' '}
                    {this.renderLabel()['Address']()}
                    <input type="text" className={`form-control ${this.state.input[1]}`} ref="companyAddress" placeholder="address"></input>
                </Row>
                <Row className="row_margin">
                    <span className="overview_subtitle">Revenue:</span>{' '}
                    {this.renderLabel()['Revenue']()}
                    <input type="text" className={`form-control ${this.state.input[2]}`} ref="companyRevenue" placeholder="revenue" onChange={this.onChange()['Revenue'].bind(this)} value={this.state.revenue}></input>
                </Row>
                <Row className="row_margin">
                    <span className="overview_subtitle">Phone No:</span>{' '}
                    {this.renderLabel()['Phone']()}
                    <div className="phone_div">
                        <Col xs={5} className="no-padding">
                            <CountryDropdown countryPick={(code)=>this.onCountryPick(code)} empty_input={this.state.input[3]}/>
                        </Col>
                        <Col xs={7} className="no-padding">
                            <input type="text" className={`form-control phone_number ${this.state.input[4]}`} ref="companyPhoneNumber"onChange={this.onChange()['Phone'].bind(this)} value={this.state.phone} placeholder="number" min={0}></input> 
                        </Col>
                    </div>
                </Row>
                <Row className="row_margin">
                    <input type="submit" className="btn btn-default overview_button" value="Create" onClick={()=>this.onCompanyCreate()}></input>
                </Row>
                <Notification open={this.state.snackbar} print="Company has been created."/>
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
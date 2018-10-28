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
        this.selectClass();
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

    // Check for empty input and change the error state
    checkInput() {
        var checkArr = [false, false, false, false, false]
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

    // Select the class for the input form based on the error state
    selectClass() {
        var inputArr = this.state.input.slice()
        this.state.error.map((item, index) => {
            if (this.state.error[index] == true && index != 3) {
                inputArr[index] = 'empty_input'
            } else if (this.state.error[index] == true && index == 3) {
                inputArr[index] = '2px solid red'
            } else {
                inputArr[index] = ''
            }
        })
        this.setState({input: inputArr})
    }

    // Reset the input form after create action
    reset() {
        this.refs.companyName.value = '';
        this.refs.companyAddress.value = '';
        this.setState({revenue: '', phone: ''})
    }

    // Change the state of the notification (show / hide)
    displayNotification() {
        this.setState({snackbar: true})
        setTimeout(()=>this.setState({snackbar: false}), 3000);
    }

    // Save the value of the country code from child component to local state
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

    // render warning label based on the error state
    renderLabel() {
        return (
            {
                Name: () => {
                    if (this.state.error[0] === true) {
                        return <Label bsStyle="danger">Please input Name</Label>
                    }
                },
                Address: () => {
                    if (this.state.error[1] === true) {
                        return <Label bsStyle="danger">Please input Address</Label>
                    }
                },
                Revenue: () => {
                    if (this.state.error[2] === true) {
                        return <Label bsStyle="danger">Please input Revenue</Label>
                    }
                },
                Phone: () => {
                    if (this.state.error[3] === true || this.state.error[4] === true) {
                        return <Label bsStyle="danger">Please input Code & Phone Number</Label>
                    }
                }
            }
        )
    }

    renderCompanyForm() {
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
        this.renderCompanyForm()
        );   
    }
}

export default connect(null, { addCompany })(CompanyForm);
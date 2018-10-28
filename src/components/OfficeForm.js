import React, { Component } from 'react';
import { Row, Col, FormControl, Label } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addOffice } from '../actions';
import { DateDropdown, Notification } from './common';

class OfficeForm extends Component {
    state = { date: '', error: [], input: [], snackbar: false, Location: {Lat: '', Lon: ''} }

    componentWillMount() {
        this.setState({ error: [false, false, false, false, false], input: ['', '' ,'' ,'' ,''] })
    }

    renderCompanyList() {
        var arrJSX = [];
        this.props.comp.companies.map((item, index) => {
            arrJSX.push(<option value={item.id}>{item.name}</option>)
        })
        return arrJSX;

    }

    async onOfficeCreate() {
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
                company_id: this.inputCompany.value,
                name: this.refs.officeName.value,
                latitude: this.refs.officeLocationLat.value,
                longitude: this.refs.officeLocationLon.value,
                start_date: this.state.date
            }
            this.props.addOffice(data);
            this.displayNotification();
            this.reset()
        }      
    }

    // Check for empty input and change the error state
    checkInput() {
        var checkArr = [false, false, false, false, false]
        if (this.refs.officeName.value === '') {
            checkArr[0] = true;
        }
        if (this.refs.officeLocationLat.value === '') {
            checkArr[1] = true;
        }
        if (this.refs.officeLocationLon.value === '') {
            checkArr[2] = true;
        }
        if (this.state.date === '') {
            checkArr[3] = true;
        }
        if (this.inputCompany.value === '') {
            checkArr[4] = true;
        }
        this.setState({ error: checkArr})
    }

    // Select the class for the input form based on the error state
    selectClass() {
        var inputArr = this.state.input.slice()
        this.state.error.map((item, index) => {
            if (this.state.error[index] == true) {
                inputArr[index] = 'empty_input'
            } else {
                inputArr[index] = ''
            }
        })
        this.setState({input: inputArr})
    }

    // Reset the input form after create action
    reset() {
        this.inputCompany.value = '';
        this.refs.officeName.value = '';
        this.refs.officeLocationLat.value = '';
        this.refs.officeLocationLon.value = '';
    }

    // Change the state of the notification (show / hide)
    displayNotification() {
        this.setState({snackbar: true})
        setTimeout(()=>this.setState({snackbar: false}), 3000);
    }

    // Save the value of the date from child component to local state
    onDatePick(temp) {
        this.setState({date: temp})
    }

    onChange(){
        return (
            {
                Latitude: (key) => {
                    const regex = /^[-+]?\d*(\.\d*)?$/;
                    if (key.target.value === '' || regex.test(key.target.value)) {
                    this.setState({Location: {...this.state.Location, Lat: key.target.value}})
                    }
                },
                Longitude: (key) => {
                    const regex = /^[-+]?\d*(\.\d*)?$/;
                    if (key.target.value === '' || regex.test(key.target.value)) {
                    this.setState({Location: {...this.state.Location, Lon: key.target.value}})
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
                Location: () => {
                    if (this.state.error[1] === true || this.state.error[2] === true) {
                        return <Label bsStyle="danger">Please input Location</Label>
                    }
                },
                Start: () => {
                    if (this.state.error[3] === true) {
                        return <Label bsStyle="danger">Please input Start Date</Label>
                    }
                },
                Company: () => {
                    if (this.state.error[4] === true) {
                        return <Label bsStyle="danger">Please Select Company</Label>
                    }
                }
            }
        )
    }

    renderOfficeForm() {
        return(
            <Col xs={6} className="col_office">
                <Row>
                    <div className="overview_title">Create Office</div>
                </Row>
                <Row className="row_margin">
                    <span className="overview_subtitle">Name:</span>{' '}
                    {this.renderLabel()['Name']()}
                    <input type="text" className={`form-control ${this.state.input[0]}`} ref="officeName" placeholder="name"></input>
                </Row>
                <Row className="row_margin">
                    <span className="overview_subtitle">Location:</span>{' '}
                    {this.renderLabel()['Location']()}<br/>
                    <input type="text" className={`form-control location_lat ${this.state.input[1]}`} ref="officeLocationLat" placeholder="latitude" onChange={this.onChange()['Latitude'].bind(this)} value={this.state.Location.Lat}></input>
                    <input type="text" className={`form-control location_lon ${this.state.input[2]}`} ref="officeLocationLon" placeholder="longitude" onChange={this.onChange()['Longitude'].bind(this)} value={this.state.Location.Lon}></input>
                </Row>
                <Row className="row_margin">
                    <span className="overview_subtitle">Office Start Date:</span>{' '}
                    {this.renderLabel()['Start']()}
                    <DateDropdown datePick={(temp)=>this.onDatePick(temp)} empty_input={this.state.input[3]}/>
                </Row>
                <Row className="row_margin">
                    <span className="overview_subtitle">Company:</span>{' '}
                    {this.renderLabel()['Company']()}
                    <FormControl componentClass="select" placeholder="select company" className={this.state.input[4]} inputRef={item => this.inputCompany = item}>
                        <option value=''>select</option>
                        {this.renderCompanyList()}
                    </FormControl>
                </Row>
                <Row className="row_margin">
                    <input type="submit" className="btn btn-default overview_button" value="Create" onClick={() => this.onOfficeCreate()}></input>
                </Row>
                <Notification open={this.state.snackbar} print="Office has been created."/>
            </Col>
        );
    }

    render() {
        return (
        this.renderOfficeForm()
        );   
    }
}

const mapStateToProps = (state) => {
    const comp = state.comp;

    return { comp }
}

export default connect(mapStateToProps, { addOffice })(OfficeForm);
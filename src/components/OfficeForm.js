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

    reset() {
        this.inputCompany.value = '';
        this.refs.officeName.value = '';
        this.refs.officeLocationLat.value = '';
        this.refs.officeLocationLon.value = '';
    }

    displayNotification() {
        this.setState({snackbar: true})
        setTimeout(()=>this.setState({snackbar: false}), 3000);
    }

    onDatePick(temp) {
        this.setState({date: temp})
    }

    onChange(){
        return (
            {
                Latitude: (key) => {
                    const regex = /^[0-9\b]+$/;
                    console.log(key.target.value)
                    if (key.target.value === '' || regex.test(key.target.value)) {
                    this.setState({Location: {Lat: key.target.value}})
                    }
                },
                Longitude: (key) => {
                    const regex = /^[0-9\b]+$/;
                    console.log(regex.test(key.target.value))
                    if (key.target.value === '' || regex.test(key.target.value)) {
                    this.setState({Location: {Lon: key.target.value}})
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
                Location: () => {
                    if (this.state.error[1] === true || this.state.error[2] === true) {
                        if (this.state.error[1] === true) {
                            this.state.input[1] = 'empty_input'
                        } else {
                            this.state.input[1] = ''
                        }
                        if (this.state.error[2] === true) {
                            this.state.input[2] = 'empty_input'
                        } else {
                            this.state.input[2] = ''
                        }
                        return <Label bsStyle="danger">Please input Location</Label>
                    } else {
                        this.state.input[1] = ''
                        this.state.input[2] = ''
                    }
                },
                Start: () => {
                    if (this.state.error[3] === true) {
                        this.state.input[3] = 'empty_input'
                        return <Label bsStyle="danger">Please input Start Date</Label>
                    } else {
                        this.state.input[3] = ''
                    }
                },
                Company: () => {
                    if (this.state.error[4] === true) {
                        this.state.input[4] = 'empty_input'
                        return <Label bsStyle="danger">Please Select Company</Label>
                    } else {
                        this.state.input[4] = ''
                    }
                }
            }
        )
    }

    renderHomePage() {
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
        this.renderHomePage()
        );   
    }
}

const mapStateToProps = (state) => {
    const comp = state.comp;

    return { comp }
}

export default connect(mapStateToProps, { addOffice })(OfficeForm);
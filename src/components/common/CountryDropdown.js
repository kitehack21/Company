import React, { Component } from 'react';
import ReactPhoneInput from 'react-phone-input-2';

class CountryDropdown extends Component {
    state = { phone: ''}

    componentWillMount() {
        this.props.countryPick(this.state.phone)
    }

    async handleOnChange(value) {
        await this.setState({ phone: value });
        this.props.countryPick(this.state.phone)
     }

    render() {
        return (
            <ReactPhoneInput
                value={this.state.phone}
                placeholder="code"
                onChange={this.handleOnChange.bind(this)}
                inputStyle={{width:'95%', border: `${this.props.empty_input}`}}
                buttonStyle={{borderLeft: `${this.props.empty_input}`, borderTop: `${this.props.empty_input}`, borderBottom: `${this.props.empty_input}`}}
                
            />
        );
    }
}


export { CountryDropdown };
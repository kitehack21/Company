import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '../supports/css/react-datepicker.css';

class DateDropdown extends Component {
    state = { startDate: '' }
    componentWillMount() {
        this.props.datePick('')
    }

    async handleChange(date) {
        await this.setState({ startDate: date });
        if (this.state.startDate == null) {
            this.props.datePick('')
        } else {
            this.props.datePick(this.state.startDate.format('MM/D/YYYY'))
        }
      }

  render() {
    return (
        <DatePicker
        placeholderText="Date"
        className={`form-control ${this.props.empty_input}`}
        selected={this.state.startDate}
        onChange={this.handleChange.bind(this)}
        />
    );
  }
}
export default DateDropdown;
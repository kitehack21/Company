import React, { Component } from 'react';
import { Grid, Row, Col, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteCompany } from '../actions';
import ConfirmationModal from './ConfirmationModal';

class Test extends Component {
    state = { show: false }

    handleClose() {
        this.setState({ show: false });
      }
    
    handleShow(i) {
        i.stopPropagation();
        this.setState({ show: true });
    }

    onDeleteClick() {
        this.props.deleteCompany(this.props.item.id);
        this.setState({ show: false })
    }
    
    render() {
        return (
            <Col xs={6} style={{'margin-bottom': '20px'}}>
                <Col xs={12} className="company_card_border" style={{'height': '250px'}} onClick={()=>this.props.pushPage(this.props.item.id)}>
                    <Row style={{'margin-top': '5px', 'margin-left': '5px', 'margin-right': '5px', 'border-bottom': '2px solid rgb(185, 185, 185)'}}>
                        <span className="company_card_title">
                            {this.props.item.name}
                        </span>
                        <span className="company_card_delete">
                            <i className="fa fa-times" onClick={this.handleShow.bind(this)}></i>
                        </span>
                    </Row>
                    <Row className="company_card_row">
                        <div className="company_card_subtitle">Address:</div>
                        <div className="company_card_text">{this.props.item.address}</div>
                    </Row>
                    <Row className="company_card_row">
                        <div className="company_card_subtitle">Revenue:</div>
                        <div className="company_card_text">{this.props.item.revenue}</div>
                    </Row>
                    <Row className="company_card_row">
                        <div className="company_card_subtitle">Phone No:</div>
                        <div className="company_card_text">({this.props.item.code}) {this.props.item.phone}</div>
                    </Row>
                </Col>
                <ConfirmationModal modal={this.state.show} name={this.props.item.name} close={this.handleClose.bind(this)}>
                    <Button onClick={this.handleClose.bind(this)} className="btn btn-warning">Cancel</Button>
                    <Button onClick={this.handleClose.bind(this)} className="btn btn-danger" onClick={()=>this.onDeleteClick()}>Delete</Button>
                </ConfirmationModal>
            </Col>
        );
    }
}

export default connect( null, { deleteCompany })(Test);
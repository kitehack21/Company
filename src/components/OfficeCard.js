import React, { Component } from 'react';
import { Grid, Row, Col, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteOffice } from '../actions';
import ConfirmationModal from './ConfirmationModal';

class OfficeCard extends Component {
    state = { show: false }

    handleClose() {
        this.setState({ show: false });
      }
    
    handleShow() {
        this.setState({ show: true });
    }

    onDeleteClick() {
        this.props.deleteOffice(this.props.item.id, this.props.company_id);
        this.setState({ show: false })
    }

    render() {
        return (
            <Col xs={6} style={{'margin-bottom': '20px'}}>
                <Col xs={12} className="company_card_border" style={{'height': '150px'}}>
                    <Row style={{'margin-top': '5px', 'margin-left': '5px', 'margin-right': '5px', 'border-bottom': '2px solid rgb(185, 185, 185)'}}>
                        <span className="company_card_title">
                            {this.props.item.name}:
                        </span>
                        <span className="company_card_delete">
                            <i className="fa fa-times" onClick={this.handleShow.bind(this)}></i>
                        </span>
                    </Row>
                    <Row className="company_card_row">
                        <div className="company_card_subtitle">Location:</div>
                        <div className="company_card_text">Lat: {this.props.item.latitude}</div>
                        <div className="company_card_text">Log: {this.props.item.longitude}</div>
                    </Row>
                    <Row className="company_card_row">
                        <div className="company_card_subtitle">Office Start Date:</div>
                        <div className="company_card_text">{this.props.item.start_date}</div>
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

const mapStateToProps = (state) => {
    const offi = state.offi;

    return { offi }
}

export default connect( mapStateToProps, { deleteOffice })(OfficeCard);
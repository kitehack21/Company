import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import {  } from './actions';
import { Route, withRouter } from 'react-router-dom';
import OverviewPage from './components/OverviewPage';
import OfficesPage from './components/OfficesPage';
import './App.css';
import './supports/css/bootstrap.css';
import './supports/css/font-awesome.css';
import './supports/css/simple-line-icons.css';

class App extends Component {  
  componentWillMount() {

  }

  render() {
      return (
        <Grid fluid>
          <Row>
            <Col xs={12} >
              <Route exact path="/" component={OverviewPage}/>
              <Route path="/office/:id" component={OfficesPage}/>
            </Col>
          </Row>
        </Grid>
      );  
    }
  }

const mapStateToProps = (state) => {
  const auth = state.auth;

  return { auth };
}

export default withRouter(connect(mapStateToProps, {  })(App));

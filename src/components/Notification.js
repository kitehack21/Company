import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class Notification extends React.Component {
  render() {
    return (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.props.open}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id"><h5>{this.props.print}</h5></span>}
        />
    );
  }
}

export default Notification;
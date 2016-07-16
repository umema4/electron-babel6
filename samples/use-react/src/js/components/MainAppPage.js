import React from 'react';

class MainAppPage extends React.Component {

  static get propTypes() {
    return {
      children: React.PropTypes.node,
    };
  }

  static get defaultProps() {
    return {
    };
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}

export default MainAppPage;


import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import { getCost } from 'utils/calc';

class ManualRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: [],
      cost: null,
    };
    this.setPoint = this.setPoint.bind(this);
    this.deleteLast = this.deleteLast.bind(this);
  }

  setPoint(name) {
    const route = this.state.route;
    route.push(name);
    this.setState({ route });
    this.calcCost();
  }

  deleteLast() {
    const route = this.state.route;
    route.pop();
    this.setState({ route });
    this.calcCost();
  }

  calcCost() {
    const cost = getCost(this.props.value, this.state.route);
    this.setState({ cost });
  }

  render() {
    const buttons = Object.keys(this.props.value).map((item) => {
      const lastCity = this.props && this.props.value[this.state.route[this.state.route.length - 1]];
      const disabled = lastCity && !(item in lastCity);
      return (
        <Button key={item} onClick={() => { this.setPoint(item); }} disabled={disabled}>
          {item}
        </Button>
      );
    });
    let deleteBtn;
    if (this.state.route && this.state.route.length) {
      deleteBtn = <Button bsStyle="warning" onClick={this.deleteLast}>X</Button>;
    }
    return (
      <Row>
        <Col md={12}>
          <h3>Manual route</h3>
          {buttons}{deleteBtn}
          <p>
            {this.state.route.join(' → ')}
          </p>
          <p>
            Cost of delivery: {this.state.cost}
          </p>
        </Col>
      </Row>
    );
  }
}

ManualRoute.propTypes = { value: PropTypes.object };

export default ManualRoute;

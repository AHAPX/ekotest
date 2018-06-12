import Select from 'react-select';
import 'react-select/dist/react-select.css';
import React from 'react';
import PropTypes from 'prop-types';
import {
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
} from 'react-bootstrap';
import { getCountRoutes, bestRoute } from 'utils/calc';

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: null,
      dest: null,
      maxStops: 0,
      countRoutes: null,
      best: {
        cost: null,
        route: [],
      },
    };
    this.handleOrigin = this.handleOrigin.bind(this);
    this.handleDest = this.handleDest.bind(this);
    this.handleMaxPoints = this.handleMaxPoints.bind(this);
    this.calcRoutes = this.calcRoutes.bind(this);
  }

  getCities() {
    const result = [];
    const keys = Object.keys(this.props.value);
    for (let i = 0; i < keys.length; i += 1) {
      result.push({
        value: keys[i],
        label: keys[i],
      });
    }
    return result;
  }

  handleOrigin(e) {
    this.setState({ origin: e && e.value });
  }

  handleDest(e) {
    this.setState({ dest: e && e.value });
  }

  handleMaxPoints(event) {
    this.setState({ maxStops: event.target.value });
  }

  convertRoute(route) {
    if (route && route.length > 0 && route[0].length > 0) {
      const points = [route[0][0]].concat(route.map((item) => item[1]));
      return points.join(' - ');
    }
    return 'not found';
  }

  calcRoutes() {
    const origin = this.state.origin;
    const dest = this.state.dest;
    const maxStops = this.state.maxStops;
    const map = this.props.value;
    if (origin in map && dest in map) {
      const cheapestRoute = bestRoute(map, origin, dest, maxStops || 0);
      if (cheapestRoute.cost === 0) {
        cheapestRoute.cost = '-';
      }
      const countRoutes = getCountRoutes(map, origin, dest, maxStops);
      this.setState({
        best: cheapestRoute,
        countRoutes,
      });
    }
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <h3>Routes</h3>
          <Row>
            <Col md={6}>
              <Form
                horizontal
                id="calcForm"
                onSubmit={(e) => {
                  e.preventDefault();
                  this.calcRoutes();
                }}
              >
                <FormGroup>
                  <Col md={4} className="Routes-title">
                    <ControlLabel>Origin</ControlLabel>
                  </Col>
                  <Col md={8}>
                    <Select
                      id="origin"
                      value={this.state.origin}
                      onChange={this.handleOrigin}
                      options={this.getCities()}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col md={4} className="Routes-title">
                    <ControlLabel>Destination</ControlLabel>
                  </Col>
                  <Col md={8}>
                    <Select
                      id="dest"
                      value={this.state.dest}
                      onChange={this.handleDest}
                      options={this.getCities()}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col md={4} className="Routes-title">
                    <ControlLabel>Max stops</ControlLabel>
                  </Col>
                  <Col md={8}>
                    <FormControl
                      id="maxStops"
                      type="number"
                      value={this.state.maxStops}
                      onChange={this.handleMaxPoints}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col md={9} mdOffset={3}>
                    <Button id="btnSubmit" bsStyle="success" type="submit">Calculate</Button>
                  </Col>
                </FormGroup>
              </Form>
            </Col>
            <Col md={6}>
              <p>Number of possible delivery routes: {this.state.countRoutes}</p>
              <p>
                The cost of the cheapest delivery route: {this.state.best && this.state.best.cost}
              </p>
              <p>The best route: {this.state.best && this.convertRoute(this.state.best.route)}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

Routes.propTypes = { value: PropTypes.object };

export default Routes;

import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Routes from 'containers/Route';
import ManualRoute from 'containers/ManualRoute';
import './City.css';

const NAMES = 'ABCDEFGHIJ';

class Cities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      cities: {},
/*
        A: {
          B: 1,
          C: 4,
          D: 10,
        },
        B: {
          E: 3,
        },
        C: {
          D: 4,
          F: 2,
        },
        D: {
          E: 1,
        },
        E: {
          B: 3,
          A: 2,
        },
        F: {
          D: 1,
        },
      },
*/
    };
    this.addCity = this.addCity.bind(this);
    this.setCost = this.setCost.bind(this);
  }

  setCost(name1, name2, cost) {
    const newCost = parseInt(prompt(`Type cost from ${name1} to ${name2}`, cost), 10);
    if (Number.isInteger(newCost)) {
      const cities = this.state.cities;
      cities[name1][name2] = newCost;
      this.setState({ cities });
    } else {
      const cities = this.state.cities;
      delete cities[name1][name2];
      this.setState({ cities });
    }
    this.hideError();
  }

  showError(message) {
    this.setState({ errorMessage: message });
  }

  hideError() {
    this.setState({ errorMessage: '' });
  }

  addCity() {
    for (let i = 0; i < NAMES.length; i += 1) {
      const name = NAMES[i];
      if (!(name in this.state.cities)) {
        const cities = this.state.cities;
        cities[name] = {};
        this.setState({ cities });
        this.hideError();
        return;
      }
    }
    this.showError('reached maximum count of cities');
  }

  removeCity(name) {
    if (window.confirm('Are you sure you want to delete city?')) {
      const cities = this.state.cities;
      delete cities[name];
      const keys = Object.keys(cities);
      for (let i = 0; i < keys.length; i += 1) {
        delete cities[keys[i]][name];
      }
      this.setState({ cities });
      this.hideError();
    }
  }

  render() {
    const cities = Object.keys(this.state.cities);
    const header = cities.map((key) => <th className="City-head" key={key}>{key}</th>);
    const body = cities.map((key1) => {
      const line = cities.map((key2) => {
        let value = '-';
        const cost = this.state.cities[key1][key2];
        if (key1 !== key2) {
          value = (
            <Button
              id={'btnSetCost'.concat(key1).concat(key2)}
              bsClass="link"
              onClick={() => { this.setCost(key1, key2, cost); }}
            >
              {cost || '...'}
            </Button>
          );
        }
        return <td className="City-cost" key={key1 + key2}>{value}</td>;
      });
      return (
        <tr key={key1}>
          <th>
            <Button
              id={'btnRemove'.concat(key1)}
              bsStyle="danger"
              onClick={() => { this.removeCity(key1); }}
            >
              X
            </Button>
          </th>
          <th className="City-head">{key1}</th>
          {line}
        </tr>
      );
    });
    let cityTable;
    if (header.length > 0) {
      cityTable = (
        <table className="City-list">
          <thead>
            <tr>
              <th></th>
              <th>→</th>
              {header}
            </tr>
          </thead>
          <tbody>{body}</tbody>
        </table>
      );
    }
    return (
      <Row className="text-center">
        <Col md={6}>
          <Button bsStyle="primary" id="btnAddCity" onClick={this.addCity}>Add city</Button>
          <p id="errorMsg" className="error">{this.state.errorMessage}</p>
          {cityTable}
        </Col>
        <Col md={6}>
          <Routes value={this.state.cities} />
          <ManualRoute value={this.state.cities} />
        </Col>
      </Row>
    );
  }
}

export default Cities;

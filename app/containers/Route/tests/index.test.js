import React from 'react';
import { shallow } from 'enzyme';
import Routes from 'containers/Route';

const map = {
  A: { B: 1, C: 4, D: 10 },
  B: { E: 3 },
  C: { D: 4, F: 2 },
  D: { E: 1 },
  E: { B: 3, A: 2 },
  F: { D: 1 },
};

test('calculate Routes', () => {
  const component = shallow(
    <Routes value={map} />
  );
  const inputOrigin = component.find('#origin');
  const inputDest = component.find('#dest');
//  const inputMaxStops = component.find('#maxStops');
  const fakeEvent = { preventDefault: () => {} };
  const form = component.find('#calcForm');
  inputOrigin.simulate('change', { target: { value: 'E' } });
  inputDest.simulate('change', { target: { value: 'D' } });
  form.simulate('submit', fakeEvent);
  expect(component.state().best.cost).toBe(9);
  expect(component.state().best.route).toBe(['EA', 'AC', 'CF', 'FD']);
});

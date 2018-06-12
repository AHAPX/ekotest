import React from 'react';
import { shallow } from 'enzyme';
import ManualRoute from 'containers/ManualRoute';

const map = {
  A: { B: 1, C: 4, D: 10 },
  B: { E: 3 },
  C: { D: 4, F: 2 },
  D: { E: 1 },
  E: { B: 3, A: 2 },
  F: { D: 1 },
};

test('calculate ManualRoute', () => {
  const component = shallow(
    <ManualRoute value={map} />
  );
  const btnA = component.find('#btnManualA');
  const btnB = component.find('#btnManualB');
  const btnE = component.find('#btnManualE');
  expect(component.state().route.length).toBe(0);
  btnA.simulate('click');
  expect(component.state().route.length).toBe(1);
  btnB.simulate('click');
  expect(component.state().route.length).toBe(2);
  expect(component.state().cost).toBe(1);
  btnE.simulate('click');
  expect(component.state().route.length).toBe(3);
  expect(component.state().cost).toBe(4);
  component.find('#btnRemoveLast').simulate('click');
  expect(component.state().route.length).toBe(2);
  expect(component.state().cost).toBe(1);
});

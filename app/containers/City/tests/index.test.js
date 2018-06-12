import React from 'react';
import { shallow } from 'enzyme';
import Cities from 'containers/City';

describe('Cities changes cities settings', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Cities />
    );
  });

  it('city list is empty', () => {
    expect(Object.keys(component.state().cities).length).toBe(0);
  });

  it('add city until max and delete', () => {
    const btnAddCity = component.find('#btnAddCity');
    for (let i = 0; i < 10; i += 1) {
      btnAddCity.simulate('click');
    }
    expect(Object.keys(component.state().cities).length).toBe(10);
    expect(component.find('#errorMsg').text()).toBe('');
    btnAddCity.simulate('click');
    expect(Object.keys(component.state().cities).length).toBe(10);
    expect(component.find('#errorMsg').text()).toBe('reached maximum count of cities');
    global.confirm = () => true;
    component.find('#btnRemoveA').simulate('click');
    expect(Object.keys(component.state().cities).length).toBe(9);
    expect(component.find('#errorMsg').text()).toBe('');
  });

  it('set city cost', () => {
    const btnAddCity = component.find('#btnAddCity');
    btnAddCity.simulate('click');
    btnAddCity.simulate('click');
    global.prompt = () => 5;
    component.find('#btnSetCostAB').simulate('click');
    global.prompt = () => 3;
    component.find('#btnSetCostBA').simulate('click');
    expect(component.state().cities.A.B).toBe(5);
    expect(component.state().cities.B.A).toBe(3);
  });
});

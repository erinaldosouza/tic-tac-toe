import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';

describe('<Board />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Board />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

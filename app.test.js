import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './lib/components/App';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  })

  it('should exist', () => {

    expect(wrapper).toBeDefined();
  })

  it('should render Header and ToDoList component', () => {

    expect(wrapper.find('Header').length).toEqual(1)
    expect(wrapper.find('ToDontList').length).toEqual(1)
  })

  it('should initialize with empty array of toDonts', () => {

    expect(wrapper.state()).toEqual({ toDonts: [] })
    expect(wrapper.state().toDonts).toEqual(expect.arrayContaining([]))
  })

  it('should retrieve data from local storage on mount', () => {
    const toDonts = [
      {title: "title", body: "body", id: 1},
      {title: "title", body: "body", id: 2}
    ]

    localStorage.setItem('toDonts', JSON.stringify(toDonts))
    wrapper = mount(<App />)
    expect(wrapper.state().toDonts).toEqual(toDonts)
  })
})

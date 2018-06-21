import React from 'react';
import { shallow, mount } from 'enzyme';
import ToDontList from '../lib/components/ToDontList'

describe('toDontList component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ToDontList toDonts={ [] } />);
  })

  it('should be a thing', () => {
    expect(wrapper).toBeDefined()
  })

  it('should display add ToDonts when there are 0 todonts', () => {
    const noToDontMsg = wrapper.find('.no-todonts-msg')

    expect(noToDontMsg).toBeDefined()
    expect(noToDontMsg.text()).toEqual("Add some Don'ts")
  })

  it('should display cards of to donts if they are present', () => {
    const toDonts = [
      {title: "title", body: "body", id: 1},
      {title: "title", body: "body", id: 2}
    ]

    wrapper = shallow(<ToDontList toDonts={ toDonts } />)
    expect(wrapper.find('ToDontCard').length).toEqual(2)
  })
})

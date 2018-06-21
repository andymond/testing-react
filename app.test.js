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

  it('should add ToDont to to dont list', () => {
    expect(wrapper.state().toDonts.length).toEqual(0)

    const toDont = {title: 'eat mice', body: 'its mean and gross', id: 3}
    const inst = wrapper.instance()
    inst.addToDont(toDont)
    const itemsInStorage = JSON.parse(localStorage.getItem('toDonts')).length


    expect(wrapper.state().toDonts[0]).toEqual(toDont)
    expect(wrapper.state().toDonts.length).toEqual(itemsInStorage)
  })

  it('should update local storage', () => {
    expect(localStorage).toEqual(expect.objectContaining({}))

    const toDonts = [
      {title: "title", body: "body", id: 1},
      {title: "title", body: "body", id: 2}
    ]

    wrapper.setState({ toDonts })
    const inst = wrapper.instance()
    inst.updateLocalStorage()

    expect(JSON.parse(localStorage.store.toDonts).length).toEqual(2)
  })

  it('should update card', () => {
    expect(localStorage).toEqual(expect.objectContaining({}))

    const toDonts = [
      {title: "title", body: "body", id: 1},
      {title: "title", body: "body", id: 2}
    ]

    wrapper.setState({ toDonts })
    const inst = wrapper.instance()
    const updated = {title: "title2", body: "body2", id: 1}
    inst.updateCard(updated)

    expect(wrapper.state().toDonts[0]).toEqual(updated)
    expect(JSON.parse(localStorage.store.toDonts).length).toEqual(2)
  })

  it('should delete card', () => {
    const toDonts = [
      {title: "title", body: "body", id: 1},
      {title: "title", body: "body", id: 2}
    ]

    wrapper.setState({ toDonts })
    const inst = wrapper.instance()
    const dumbCard = {title: "title", body: "body", id: 1}
    inst.deleteCard(dumbCard)

    expect(wrapper.state().toDonts.length).toEqual(1)
    expect(wrapper.state().toDonts[0]).toEqual({title: "title", body: "body", id: 2})
    expect(JSON.parse(localStorage.store.toDonts).length).toEqual(1)
  })
})

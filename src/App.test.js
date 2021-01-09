import React from 'react';
import {mount} from "enzyme";
import {Provider} from 'react-redux';
import App from "./App";
import store from "./store";

window.confirm = jest.fn(() => true)

describe('App test', () => {
    let appStore;
    let wrapper;
    beforeEach(() => {
        appStore = store;
        wrapper = mount(<Provider store={appStore}><App/></Provider>);
    })

    test("App on Submit button", () => {
        wrapper.update();
        let component = wrapper.find('input[id="enterName"]');
        component.simulate('change', {target: {value: "Raj"}})
        let component2 = wrapper.find('button[id="submit"]');
        component2.simulate('click')
        expect(store.getState().friends.friendsData.listData.length).toEqual(4);
        expect(wrapper.containsMatchingElement(<App/>)).toBe(true)
    })

    test("showing notification on search button click", () => {
        wrapper.update();
        let component = wrapper.find('input[id="searchName"]');
        component.simulate('change', {target: {value: "ABC"}})
        let component2 = wrapper.find('button[id="searchNameClick"]');
        component2.simulate('click')
        let component3 = wrapper.find('span[id="notification"]');
        expect(component3.exists()).toBeTruthy()
    })

    test("On delete icon click", () => {
        wrapper.update();
        wrapper.find('div[id="delete[2]"]').simulate('click');
        wrapper.update();
        expect(store.getState().friends.friendsData.listData[1].deleted).toEqual(true);
    })

    test("On favorite icon click", () => {
        wrapper.update();
        wrapper.find('div[id="favorite[2]"]').simulate('click');
        wrapper.update();
        expect(store.getState().friends.friendsData.listData[1].favorite).toEqual(true);
    })

    test("On favorite button click", () => {
        wrapper.update();
        let component = wrapper.find('button[id="onFavoriteClick"]');
        component.simulate('click')
    })

});
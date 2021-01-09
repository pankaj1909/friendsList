import React from 'react';
import {mount} from "enzyme";
import {Provider} from 'react-redux';
import App from "./App";
import store from "./store";

describe('App test', () => {
    let appStore;
    let wrapper;
    beforeEach(() => {
        appStore = store;
        wrapper = mount(<Provider store={appStore}><App/></Provider>);
    })

    test("App no data", () => {
        wrapper.update();
        console.log(wrapper.debug())
        expect(wrapper.containsMatchingElement(<App/>)).toBe(true)
    })


});
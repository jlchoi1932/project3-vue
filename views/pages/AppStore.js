import { createStore } from 'vuex';

export default createStore ({
    state: {
        loginUser: null,
    },
    getters: {
        getLoginUser: function () {

        },
        getKey: function () {

        }
    },
    mutations: {
        setLoginUser: function (state, newValue) {
            state.loginUser = newValue;
        },
        setKey: function (state, newValue) {
            state.key = newValue;
        }
    }
});
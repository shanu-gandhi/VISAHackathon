import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import Register from '../pages/Register';
import Welcome from '../pages/Welcome';
import Restbooking from '../pages/Restbooking';
import Login from '../pages/Login';
import FirstPage from '../pages/FirstPage';

const RootStack = createStackNavigator({
    FirstPage: {
        screen: FirstPage
    },
    Register: {
        screen: Register
    },
    Welcome: {
        screen: Welcome
    },
    Restbooking: {
        screen: Restbooking
    },
    Login: {
        screen: Login
    }
});

export default createAppContainer(RootStack);
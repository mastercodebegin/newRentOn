import React from 'react'
import { createDrawerNavigator }  from '@react-navigation/drawer'
import Dashboard from '../screen/dashboard/Dasboard'
import Login from '../screen/login/Login'
import SignUp from '../screen/signup/SignUp'

export default function DrawersNavigator() {
    const Drawer = createDrawerNavigator()

    return (
        <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Dashboard} />
        <Drawer.Screen name="login" component={Login} />
        <Drawer.Screen name="signup" component={SignUp} />
    </Drawer.Navigator>
    )
}

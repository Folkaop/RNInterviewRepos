import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AboutScreen from "./src/screens/about/AboutScreen";
import QuotesScreen from "./src/screens/quotes/QuotesScreen";

const Tab = createBottomTabNavigator();

const App = () => (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: 'black'
                },
                tabBarLabelStyle: {
                    fontSize: 14
                }
            }}
        >
            <Tab.Screen
                name="About"
                component={AboutScreen}
                options={{
                    tabBarLabel: 'About',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="tree" size={24} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Quotes"
                component={QuotesScreen}
                options={{
                    tabBarLabel: 'Quotes',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="bug" size={24} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    </NavigationContainer>
);

export default App;

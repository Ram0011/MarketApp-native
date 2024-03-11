import React from 'react'
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddPostScreen from '../Screens/AddPostScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import HomeScreenStackNav from './HomeScreenStackNav';
import ExploreScreenStackNav from './ExploreScreenStackNav';
import ProfileStackNav from './ProfileStackNav';


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator tabBarPosition='bottom' screenOptions={{ headerShown: false, tabBarActiveTintColor: '#000' }}  >
            <Tab.Screen name='home-nav' component={HomeScreenStackNav}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color, fontSize: 14, marginBottom: 2 }}>Home</Text>
                    ), tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name='explore' component={ExploreScreenStackNav}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color, fontSize: 14, marginBottom: 2 }}>Explore</Text>
                    ), tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="explore" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name='addpost' component={AddPostScreen}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color, fontSize: 14, marginBottom: 2 }}>Addpost</Text>
                    ), tabBarIcon: ({ color, size }) => (
                        <FontAwesome6 name="add" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name='profile' component={ProfileStackNav}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color, fontSize: 14, marginBottom: 2 }}>Profile</Text>
                    ), tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigation
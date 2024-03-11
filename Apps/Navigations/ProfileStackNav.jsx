import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../Screens/ProfileScreen';
import MyProducts from '../Screens/MyProducts';
import ProductDetail from '../Screens/ProductDetail';
import ExploreScreenStackNav from './ExploreScreenStackNav';


const Stack = createStackNavigator();

const ProfileStackNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='profile-tab' component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name='my-product' component={MyProducts}
                options={{
                    headerStyle: {
                        backgroundColor: '#3b82f6'
                    },
                    headerTintColor: '#fff',
                    headerTitle: 'My Products',
                }}
            />
            <Stack.Screen name='product-detail' component={ProductDetail}
                options={{ headerStyle: { backgroundColor: '#2E86C1' }, headerTintColor: 'white', headerTitle: 'Detail' }}
            />
            <Stack.Screen name='explore-s' component={ExploreScreenStackNav} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default ProfileStackNav
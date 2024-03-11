import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../Screens/HomeScreen';
import ItemList from '../Screens/ItemList';
import ProductDetail from '../Screens/ProductDetail';

const Stack = createStackNavigator();

const HomeScreenStackNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='home' component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name='item-list' component={ItemList} options={({ route }) => ({ title: route.params.category })} />
            <Stack.Screen name='product-detail' component={ProductDetail}
                options={{ headerStyle: { backgroundColor: '#2E86C1' }, headerTintColor: 'white', headerTitle: 'Detail' }}
            />

        </Stack.Navigator>
    )
}

export default HomeScreenStackNav
import { View, Text, Image, FlatList, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

    const { user } = useUser();
    const navigation = useNavigation();
    const { isLoaded, signOut } = useAuth();

    const menuList = [
        {
            id: 1,
            name: 'My Products',
            icon: 'https://img.icons8.com/color/48/read.png',
            path: 'my-product'
        },
        {
            id: 2,
            name: 'Explore',
            icon: 'https://img.icons8.com/color/48/compass--v1.png',
            path: 'explore-s'
        },
        {
            id: 3,
            name: 'Github',
            icon: 'https://img.icons8.com/fluency/48/github.png',
            url: 'https://github.com/Ram0011'
        },
        {
            id: 4,
            name: 'Logout',
            icon: 'https://img.icons8.com/color/48/exit.png'
        },
    ]

    const onMenuPress = (item) => {
        if (item.name == 'Logout') {
            signOut();
            return;
        } else if (item.url) {
            Linking.openURL(item.url);
        }
        item?.path ? navigation.navigate(item.path) : null
    }

    return (
        <View>
            <View className="items-center mt-14">
                <Image source={{ uri: user?.imageUrl }} className="h-[100px] w-[100px] rounded-full justify-center" />
                <Text className="font-bold text-[25px] mt-4" >{user?.fullName}</Text>
                <Text className="font-bold text-[18px] mt-2 text-gray-500 mb-10" >{user?.primaryEmailAddress?.emailAddress}</Text>
            </View>
            <FlatList data={menuList}
                numColumns={3}
                renderItem={({ item, index }) => (
                    <TouchableOpacity className="ml-4 mr-4 mb-8 flex-1 p-5 border-[1px] items-center justify-center rounded-xl border-gray-400 bg-gray-50"
                        onPress={() => onMenuPress(item)}
                    >
                        <Image source={{ uri: item.icon }} className="h-[40px] w-[40px] mb-2" />
                        <Text className="text-[13px] text-blue-900">{item.name}</Text>
                    </TouchableOpacity>
                )} />


        </View>
    )
}

export default ProfileScreen
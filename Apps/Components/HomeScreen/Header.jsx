import { View, Text, Image, TextInput, Keyboard } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Feather } from '@expo/vector-icons';

const Header = () => {

    const { user } = useUser();

    return (
        <View onPress={() => Keyboard.dismiss()}>
            {/* User info section */}
            <View className="flex flex-row items-center gap-4"  >
                <Image source={{ uri: user.imageUrl }} className="rounded-full w-10 h-10" />
                <View>
                    <Text className="text-[16px]" >Welcome,</Text>
                    <Text className="text-[20px] font-bold" >{user.fullName}</Text>
                </View>
            </View>
            {/* Search bar */}
            <View className="p-2 bg-white flex flex-row items-center rounded-full border-slate-300 border-2 px-5 mt-5"  >
                <Feather name="search" size={24} color="gray" style={{ marginRight: 10 }} />
                <TextInput placeholder='Search' className="text-[16px] w-72" onChangeText={(value) => console.log(value)} />
            </View>
        </View>
    )
}

export default Header
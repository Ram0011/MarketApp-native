import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Categories = ({ categoryList }) => {

    const navigation = useNavigation()

    return (
        <View className="mt-5">
            <Text className="font-bold text-[20px] mb-2" >Categories</Text>
            <FlatList data={categoryList} numColumns={4} renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => navigation.navigate('item-list', {
                    category: item.name
                })}
                    className="flex-1 items-center justify-center p-2 border-[1px] rounded-lg border-gray-300 m-1 h-[80] bg-gray-100"
                >
                    <Image source={{ uri: item.icon }} className="h-[40] w-[40]" />
                    <Text className="text-[12px] mt-2" >{item.name}</Text>
                </TouchableOpacity>

            )} />
        </View>
    )
}

export default Categories
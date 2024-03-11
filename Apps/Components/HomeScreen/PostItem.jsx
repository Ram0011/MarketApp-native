import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const PostItem = ({ item }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity className="flex-1 mt-2  mr-4 p-2 rounded-lg border-[1px] border-gray-300 bg-gray-100 "
            onPress={() => navigation.navigate('product-detail', { product: item })}
        >
            <Image source={{ uri: item.image }} className="w-full h-[140px] rounded-md" />
            <View>
                <Text className="text-[13px] font-bold mt-2 text-gray-800" >{item.title}</Text>
                <Text className="text-[17px] font-bold mt-1 text-gray-900" >₹{item.price}</Text>
                <Text className="text-[11px] ml-auto text-gray-400">{item.category}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PostItem
import { View, Text, Image, Linking, Share, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

const ProductDetail = ({ navigation }) => {

    const db = getFirestore(app)
    const { params } = useRoute();
    const [product, setProduct] = useState([])
    const { user } = useUser();
    const nav = useNavigation();

    useEffect(() => {
        params && setProduct(params.product);
        shareButton();
    }, [params, navigation]);

    const shareButton = () => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => shareItem()} >
                    <Fontisto name="share" size={24} color="white" style={{ marginRight: 14 }} />
                </TouchableOpacity>
            )
        })
    }

    const shareItem = () => {
        const content = {
            message: product.title + "\n" + product.desc
        }
        Share.share(content).then(resp => {
            console.log(resp);
        }, (error) => {
            console.log(error);
        })
    }

    const sendEmailMessage = () => {
        const subject = `Regarding ${product.title}`;
        const body = `Hi ${product.useName}, I am interested in your product. Please contact me`;
        Linking.openURL("mailto:" + product.userEmail + "?subject=" + subject + "&body=" + body);
    }

    const deleteUserPost = () => {
        Alert.alert('Delete', "Delete this Post?", [{
            text: "Yes",
            onPress: () => deleteFromFirestore()
        }, {
            text: "No",
            onPress: () => console.log("No Pressed"),
            style: 'cancel'
        }])
    }

    const deleteFromFirestore = async () => {
        const q = query(collection(db, 'UserPost'), where('title', '==', product.title))
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
            deleteDoc(doc.ref).then(resp => {
                nav.goBack();
            })
        })
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <Image source={{ uri: product.image }} className="h-[200px] mt-4 ml-3 mr-3 mb-2 rounded-md" />

            <View className="p-3 mb-4" >
                <Text className="ml-2 text-[24px] font-semibold" >{product?.title}</Text>
                <TouchableOpacity className="pl-2 pt-1 pb-1 ml-1 text-center pr-2 w-24  bg-blue-200 text-blue-500 rounded-2xl align-middle" >
                    <Text className="" >{product.category}</Text>
                </TouchableOpacity>
                <Text className="ml-2 mt-4 text-[20px] font-semibold" >Description</Text>
                <Text className="ml-2 mt-1 text-[14px] text-gray-600" >{product?.desc}</Text>
            </View>

            {/* User Info */}
            <View className=" p-2 mb-2 flex flex-row items-center gap-3 border-[1px] border-gray-400 rounded-xl  ">
                <Image source={{ uri: product?.userImage }} className="w-10 h-10 rounded-full" />
                <View>
                    <Text className="font-bold text-[18px] ">{product.useName}</Text>
                    <Text className="text-gray-500" >{product.userEmail}</Text>
                </View>
            </View>

            {user?.primaryEmailAddress.emailAddress == product.userEmail ?
                <TouchableOpacity onPress={() => deleteUserPost()} className="bg-red-500 rounded-full p-3 m-2" >
                    <Text className="fixed text-white text-center">Delete Post</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity className="bg-blue-500 rounded-full p-3 m-2" onPress={() => sendEmailMessage()} >
                    <Text className="fixed text-white text-center">Send Message</Text>
                </TouchableOpacity>
            }

        </ScrollView>
    )
}

export default ProductDetail
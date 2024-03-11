import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import LatestItemList from '../Components/HomeScreen/LatestItemList'
import { useIsFocused } from '@react-navigation/native'


const ExploreScreen = () => {

    const db = getFirestore(app);
    const [productList, setProductList] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        getAllProducts();
    }, [isFocused]);

    const getAllProducts = async () => {
        setProductList([]);
        const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));

        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
            setProductList(productList => [...productList, doc.data()]);
        })
    }

    return (
        <ScrollView className="pl-4 pt-5" >
            <Text className="text-[30px] font-bold " >Explore More</Text>
            <LatestItemList latestItemList={productList} />

        </ScrollView>
    )
}

export default ExploreScreen
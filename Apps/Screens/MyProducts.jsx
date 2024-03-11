import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import LatestItemList from '../Components/HomeScreen/LatestItemList'
import { useIsFocused } from '@react-navigation/native'

const MyProducts = () => {

    const db = getFirestore(app);
    const { user } = useUser();
    const [productList, setProductList] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        getUserPost();
    }, [user, isFocused]);


    const getUserPost = async () => {
        setProductList([]);
        const q = query(collection(db, 'UserPost'), where('userEmail', '==', user?.primaryEmailAddress.emailAddress));
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
            setProductList(productList => [...productList, doc.data()]);
        })
    }

    return (
        <ScrollView>
            <LatestItemList latestItemList={productList} />
        </ScrollView>
    )
}

export default MyProducts
import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeScreen/LatestItemList';
import { ScrollView } from 'react-native-gesture-handler';

const ItemList = () => {

    const db = getFirestore(app);
    const { params } = useRoute();
    const [itemList, setItemList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        params && getItemListByCategory();
    }, [params])

    const getItemListByCategory = async () => {
        setItemList([])
        setLoading(true);
        const q = query(collection(db, 'UserPost'), where('category', '==', params.category));
        const snapshot = await getDocs(q);
        snapshot.forEach(doc => {
            setItemList(itemList => [...itemList, doc.data()]);
        })
        setLoading(false);
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} className="ml-3" >

            {
                loading ? <ActivityIndicator size={'large'} color={'black'} animating={loading} /> :
                    itemList.length > 0 ? <LatestItemList latestItemList={itemList} heading={'Item List'} /> :
                        <Text className="text-[18px] mt-20 ml-36 text-gray-600">No Items</Text>
            }

        </ScrollView>
    )
}

export default ItemList
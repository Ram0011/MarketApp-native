import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../Components/HomeScreen/Header';
import Slider from '../Components/HomeScreen/Slider';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import Categories from '../Components/HomeScreen/Categories';
import LatestItemList from '../Components/HomeScreen/LatestItemList';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = () => {

    const db = getFirestore(app);
    const isFocused = useIsFocused();
    const [sliderList, setSliderList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [latestItemList, setLatestItemList] = useState([]);

    useEffect(() => {
        getSliders();
        getCategoryList();
        getLatestItemList();
    }, [isFocused]);

    const getCategoryList = async () => {
        try {
            setCategoryList([]);
            const querySnapshot = await getDocs(collection(db, 'Category'));

            querySnapshot.forEach((doc) => {
                setCategoryList(categoryList => [...categoryList, doc.data()]);
            });

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getSliders = async () => {
        setSliderList([]);
        const querySnapshot = await getDocs(collection(db, 'Slider'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setSliderList(sliderList => [...sliderList, doc.data()]);
        });
    };

    const getLatestItemList = async () => {
        setLatestItemList([]);
        const querySnapshot = await getDocs(collection(db, 'UserPost'));
        querySnapshot.forEach((doc) => {
            console.log("Docs", doc.data());
            setLatestItemList(latestItemList => [...latestItemList, doc.data()]);
        })
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className="mr-4 mt-6 ml-4 " >
                <Header />
                <Slider sliderList={sliderList} />
                <Categories categoryList={categoryList} />
                <LatestItemList latestItemList={latestItemList} heading={"Latest Items"} />
            </View>
        </ScrollView>
    );
};

export default HomeScreen;

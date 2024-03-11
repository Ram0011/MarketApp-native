import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, Image } from 'react-native';

const Slider = ({ sliderList }) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (flatListRef.current) {
                const nextIndex = (currentIndex + 1) % sliderList.length;
                flatListRef.current?.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                });
                setCurrentIndex(nextIndex);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, sliderList]);


    return (
        <View className="mt-5">
            <FlatList
                ref={flatListRef}
                data={sliderList}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={{ marginRight: 2 }}>
                        <Image source={{ uri: item?.image }} className="w-[330px] h-36 mr-2 rounded-xl object-contain" />
                    </View>
                )}
            />
        </View>
    );
};

export default Slider;

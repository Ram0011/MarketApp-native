import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Keyboard, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseConfig'
import Toast from 'react-native-root-toast';
import { Formik } from 'formik'
import { Picker } from '@react-native-picker/picker'
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo';

const AddPostScreen = () => {

    const [image, setImage] = useState(null)
    const db = getFirestore(app);
    const { user } = useUser();
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState();
    const storage = getStorage();

    useEffect(() => {
        getCategoryList();
    }, []);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

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

    const onSubmitMethod = async (value) => {

        setLoading(true);
        // convert uri to blob file
        value.image = image;
        const response = await fetch(value.image);
        const blob = await response.blob();

        // upload image and get download url
        const storageRef = ref(storage, `communityPost/${Date.now()}.jpg`);
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        }).then((response) => {
            getDownloadURL(storageRef).then(async (downloadUrl) => {
                console.log(downloadUrl);
                value.image = downloadUrl;
                value.useName = user.fullName;
                value.userEmail = user.primaryEmailAddress.emailAddress;
                value.userImage = user.imageUrl;
                value.createdAt = Date.now();

                const docRef = await addDoc(collection(db, "UserPost"), value);
                if (docRef.id) {
                    setLoading(false);
                    Alert.alert("Success!", "Post Added");
                }
            })
        })
    }

    return (
        <View className="p-10" onPress={Keyboard.dismiss} >
            <ScrollView>
                <Text className="text-2xl font-bold mb-2">Add New Post</Text>
                <Text className="text-[18] text-gray-500 mb-4 ">Create new post and start selling.</Text>
                <Formik initialValues={{ title: '', desc: '', category: '', address: '', price: '', image: '', userName: '', userEmail: '', userImage: '', createdAt: Date.now() }}
                    onSubmit={value => onSubmitMethod(value)}
                    validate={(values) => {
                        const errors = {};
                        if (!values.title) {
                            console.log("not present");
                            Toast.show("Title must be required", { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, shadow: true, animation: true, hideOnPress: true, delay: 0 });
                            errors.name = "Title must be required";
                        }
                        return errors;
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors }) => (
                        <View>
                            <TouchableOpacity onPress={pickImage}>
                                {
                                    image ? <Image source={{ uri: image }} className="w-[78] h-[78] rounded-lg mb-3" /> : (
                                        <>
                                            <Image source={require('../../assets/images/5204684_2665820.jpg')} className="w-[78] h-[78] rounded-lg mb-3" />
                                            <Text className="text-gray-500 mb-2">Add Image</Text>
                                        </>
                                    )
                                }

                            </TouchableOpacity>

                            <TextInput style={styles.input} placeholder='Title' value={values.title} onChangeText={handleChange('title')} />

                            <TextInput style={styles.input} placeholder='Description' value={values.desc} onChangeText={handleChange('desc')} numberOfLines={5} />

                            <TextInput style={styles.input} placeholder='Price' value={values.price} keyboardType='numeric' onChangeText={handleChange('price')} />

                            <TextInput style={styles.input} placeholder='Address' value={values.address} keyboardType='default' onChangeText={handleChange('address')} />

                            {/* Category list dropdown */}
                            <View className="border border-gray-400 rounded-md mt-2" >
                                <Picker selectedValue={values?.category} onValueChange={itemValue => setFieldValue('category', itemValue)} >
                                    {categoryList?.map((item, index) => (
                                        <Picker.Item key={index} label={item?.name} value={item.name} />
                                    ))}
                                </Picker>
                            </View>

                            <TouchableOpacity className="bg-blue-500 p-4 rounded-full mt-3 h-14" onPress={handleSubmit}
                                disabled={loading} >
                                {
                                    loading ? <ActivityIndicator size="small" color="white" /> :
                                        <Text className="text-center text-white text-lg">Submit</Text>
                                }

                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 14,
        marginTop: 10,
        marginBottom: 5,
        textAlignVertical: 'top',
        fontSize: 14,
    }
})


export default AddPostScreen
import { View, Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';

WebBrowser.maybeCompleteAuthSession();


const LoginScreen = () => {


    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

    return (
        <View>
            <Image className="h-[400] w-screen object-cover" source={require('../../assets/images/12650453_5051772.jpg')} />

            <View className="p-10 bg-white mt-[-11px] rounded-t-3xl" >
                <Text className="text-[28px] font-bold">Spring Marketplace</Text>
                <Text className="text-[14px] text-slate-500 mt-7 ">Marketplace where you can sell and buy products</Text>

                <TouchableOpacity className="p-3 bg-blue-500 rounded-full mt-20" onPress={onPress} >
                    <Text className="text-white text-center text-[18px]" >Get Started</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default LoginScreen;
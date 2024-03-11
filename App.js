import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView } from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import TabNavigation from './Apps/Navigations/TabNavigation';


export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_ZGVjaWRpbmctYnVycm8tNjUuY2xlcmsuYWNjb3VudHMuZGV2JA'>

      <SafeAreaView style={{ flex: 1 }}>
        <RootSiblingParent>
          <View className="flex-1 bg-white">

            <Text></Text>
            <Text></Text>

            <SignedIn>
              <NavigationContainer>
                <TabNavigation />
              </NavigationContainer>
            </SignedIn>

            <SignedOut>
              <LoginScreen />
            </SignedOut>
            <StatusBar style="auto" />

          </View>
        </RootSiblingParent>
      </SafeAreaView>
    </ClerkProvider>
  );
}

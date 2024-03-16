import React from "react";
import {I18nManager} from 'react-native';
import {NativeBaseProvider,extendTheme} from "native-base";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, AddNote, EditNote} from "./app/components";
import { useFonts } from 'expo-font';
import { Fontisto } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import {DataProvider} from "./app/context/context";

const Stack = createStackNavigator();

I18nManager.allowRTL(true)
I18nManager.forceRTL(true)

export default function App() {

  const [fontsLoaded] = useFonts({
    'vazir': require('./app/assets/Vazir.ttf'),
  });

  const theme = extendTheme({
    fontConfig: {
      vazir: {
        100: {
          normal: "vazir",
          italic: "vazir",
        },
        200: {
          normal: "vazir",
          italic: "vazir",
        },
        300: {
          normal: "vazir",
          italic: "vazir",
        },
        400: {
          normal: "vazir",
          italic: "vazir",
        },
        500: {
          normal: "vazir",
        },
        600: {
          normal: "vazir",
          italic: "vazir",
        },
        // Add more variants
        //   700: {
        //     normal: 'Roboto-Bold',
        //   },
        //   800: {
        //     normal: 'Roboto-Bold',
        //     italic: 'Roboto-BoldItalic',
        //   },
        //   900: {
        //     normal: 'Roboto-Bold',
        //     italic: 'Roboto-BoldItalic',
        //   },
      },
    },

    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
      heading: "vazir",
      body: "vazir",
      mono: "vazir",
    },
  });

  if (fontsLoaded){
    return (
        <DataProvider>
          <NativeBaseProvider theme={theme}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{
                headerTitleAlign : "left",
                headerTitleStyle : {
                  fontFamily : "vazir",
                  color : "white"
                },
                headerStyle : {
                  backgroundColor : "#287fa9"
                },
                headerTintColor : "white",
                headerRight : () => (
                    <Fontisto name="onenote" style={{ marginRight: 10 }}
                              size={24} color="white" />
                )
              }}>
                <Stack.Screen name="Home" component={Home} options={{title: "یادداشت های من"}}/>
                <Stack.Screen name="Add" component={AddNote} options={{title: "افزودن یادداشت"}}/>
                <Stack.Screen name="Edit" component={EditNote} options={{title: "ویرایش یادداشت"}}/>
              </Stack.Navigator>
            </NavigationContainer>
          </NativeBaseProvider>
        </DataProvider>
    );
  } else return null
}
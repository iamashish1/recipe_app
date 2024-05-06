import { Platform,ToastAndroid,Alert,View } from "react-native";

export const showToastWithGravityAndOffset = (message) => {


    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      Alert.alert(message)

      
    }

  };
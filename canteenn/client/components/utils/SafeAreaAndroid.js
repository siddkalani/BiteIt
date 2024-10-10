import { Platform, StatusBar } from 'react-native';

export default {
  AndroidSafeArea: `flex-1 ${Platform.OS === 'android' ? `pt-[${StatusBar.currentHeight}px]` : ''} bg-white`,
};

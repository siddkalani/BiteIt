import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Platform,
  NativeModules,
} from 'react-native';

const KeyboardDebugComponent = () => {
  const [inputText, setInputText] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => addDebugInfo('Keyboard shown')
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => addDebugInfo('Keyboard hidden')
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const addDebugInfo = (info) => {
    setDebugInfo((prev) => `${info}\n${prev}`);
  };

  const forceShowKeyboard = () => {
    addDebugInfo('Attempting to force show keyboard');
    TextInput.State.currentlyFocusedInput()?.focus();
  };

  const checkKeyboardStatus = async () => {
    if (Platform.OS === 'ios') {
      const { KeyboardObserver } = NativeModules;
      const isKeyboardShown = await KeyboardObserver.isKeyboardShown();
      addDebugInfo(`Keyboard is ${isKeyboardShown ? 'shown' : 'hidden'}`);
    } else {
      addDebugInfo('Keyboard status check not available on Android');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Keyboard Debug</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          padding: 5,
        }}
        onChangeText={setInputText}
        value={inputText}
        placeholder="Type here..."
        onFocus={() => addDebugInfo('Input focused')}
        onBlur={() => addDebugInfo('Input blurred')}
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          padding: 10,
          marginBottom: 10,
        }}
        onPress={forceShowKeyboard}
      >
        <Text style={{ color: 'white' }}>Force Show Keyboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'green',
          padding: 10,
          marginBottom: 10,
        }}
        onPress={checkKeyboardStatus}
      >
        <Text style={{ color: 'white' }}>Check Keyboard Status</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          padding: 10,
          marginBottom: 10,
        }}
        onPress={Keyboard.dismiss}
      >
        <Text style={{ color: 'white' }}>Dismiss Keyboard</Text>
      </TouchableOpacity>
      <ScrollView style={{ flex: 1, marginTop: 20 }}>
        <Text>{debugInfo}</Text>
      </ScrollView>
    </ScrollView>
  );
};

export default KeyboardDebugComponent;
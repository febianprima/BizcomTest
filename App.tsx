/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import DashboardScreen from './src/screens/DashboardScreen';
import {Provider} from 'react-redux';
import {store} from './src/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView className="bg-fuchsia-700">
        <StatusBar animated={true} />
        <DashboardScreen />
      </SafeAreaView>
    </Provider>
  );
}

export default App;

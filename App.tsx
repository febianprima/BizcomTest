/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import DashboardScreen from './src/screens/DashboardScreen';
import {Provider} from 'react-redux';
import {store} from './src/store';
import TrackPlayer, {Capability} from 'react-native-track-player';
import {audio} from './src/assets/data/audio';

function App(): React.JSX.Element {
  const trackPlayerSetup = async () => {
    await TrackPlayer.setupPlayer();

    await TrackPlayer.add(audio);

    TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],

      compactCapabilities: [Capability.Play, Capability.Pause],
    });
  };

  useEffect(() => {
    trackPlayerSetup();
  }, []);

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

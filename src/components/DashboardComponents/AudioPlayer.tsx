import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {playerType} from '../../types/playerType';

const AudioPlayer = ({albums, played, state, setState}: playerType) => {
  const progress = useProgress();
  const {buffered, duration, position} = progress;

  const playOrPause = async () => {
    if (state === 'play') {
      await TrackPlayer.pause();
      setState('pause');
    } else {
      await TrackPlayer.play();
      setState('play');
    }
  };

  const onStop = async () => {
    await TrackPlayer.stop();
    setState('reset');
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 z-5 bg-purple-100 h-48 rounded-t-3xl">
      <Text className="text-center font-bold text-slate-500 pt-4 capitalize text-base px-4">
        {albums?.length && typeof played === 'number'
          ? albums[played]?.title
          : ''}
      </Text>
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={playOrPause}>
          <MaterialCommunityIcons
            name={state === 'play' ? 'pause' : 'play'}
            size={24}
            color={'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onStop}>
          <MaterialCommunityIcons name={'stop'} size={24} color={'black'} />
        </TouchableOpacity>
        <View className="h-3 w-4/5 bg-slate-300 ml-4">
          <View
            className="absolute z-3 h-3 bg-slate-200"
            style={{width: `${(buffered / duration) * 100}%`}}
          />
          <View
            className="absolute z-5 h-3 bg-purple-950"
            style={{width: `${(position / duration) * 100}%`}}
          />
        </View>
      </View>
    </View>
  );
};

export default AudioPlayer;

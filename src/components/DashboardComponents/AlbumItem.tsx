import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {albumItemType} from '../../types/albumsType';

const AlbumItem = ({played, item, index, onPlay, state}: albumItemType) => {
  const {title} = item || {};
  return (
    <View
      className={`flex-row items-center justify-between p-4 h-20 ${
        typeof played === 'number' && played === index
          ? 'bg-purple-100'
          : 'bg-white'
      }
      `}>
      <View className="flex-row items-center">
        <MaterialCommunityIcons name={'music-box'} size={32} color={'purple'} />
        <Text
          className={'ml-2 w-4/5 text-base text-slate-600 capitalize'}
          numberOfLines={2}>
          {title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          onPlay(index);
        }}>
        <MaterialCommunityIcons
          name={
            typeof played === 'number' && played === index
              ? state === 'pause'
                ? 'pause'
                : 'waveform'
              : 'play-circle'
          }
          size={24}
          color={
            typeof played === 'number' && played === index
              ? 'orchid'
              : 'thistle'
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default AlbumItem;

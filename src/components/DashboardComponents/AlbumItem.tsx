import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {albumItemType} from '../../types/albumsType';

const AlbumItem = ({played, item, index, onPlay}: albumItemType) => {
  const {title} = item || {};
  return (
    <View
      className={`flex-row items-center justify-between p-4 h-20 ${
        played === index ? 'bg-red' : ''
      }`}>
      <View className="flex-row items-center">
        <MaterialCommunityIcons name={'music-box'} size={32} color={'purple'} />
        <Text
          className={'ml-2 w-4/5 text-base text-slate-600'}
          numberOfLines={2}>
          {title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          onPlay(index);
        }}>
        <MaterialCommunityIcons
          name={played === index ? 'waveform' : 'play-circle'}
          size={24}
          color={played === index ? 'orchid' : 'thistle'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AlbumItem;

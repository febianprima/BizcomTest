import {StyledComponent} from 'nativewind';
import React, {ReactElement, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {useGetAlbumQuery} from '../api';
import {albumType} from '../types/albumsType';
import AlbumItem from '../components/DashboardComponents/AlbumItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer from 'react-native-track-player';
import {audio} from '../assets/data/audio';
import AudioPlayer from '../components/DashboardComponents/AudioPlayer';

const DashboardScreen = (): ReactElement => {
  const [page, setPage] = useState<number>(1);
  const [albums, setAlbums] = useState<albumType[]>();
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [played, setPlayed] = useState<number | void>();
  const [query, setQuery] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [state, setState] = useState<string>('reset');

  const {data: newAlbums = [], isLoading} = useGetAlbumQuery(
    {page, query},
    {
      skip: isFetchingMore && page > 1,
    },
  );

  const onPlay = async (i: number) => {
    setPlayed(i);

    await TrackPlayer.reset();
    const track = audio[i % 3];

    await TrackPlayer.add([track]);
    await TrackPlayer.play();
    setState('play');
  };

  const onRefresh = () => {
    setPage(1);
    setAlbums([]);
    setPlayed();
    setIsFetchingMore(true);
  };

  const handleSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const val: string = e?.nativeEvent?.text || '';
    setQuery(val);
    onRefresh();
  };

  useEffect(() => {
    if (newAlbums && newAlbums?.length > 0) {
      setAlbums((prevAlbums): albumType[] =>
        prevAlbums ? [...prevAlbums, ...newAlbums] : newAlbums,
      );
      setIsFetchingMore(false);
    }
  }, [newAlbums, isFetchingMore]);

  return (
    <SafeAreaView className={'bg-white'}>
      <View className="pt-4 bg-fuchsia-700 rounded-b-3xl ">
        <StyledComponent
          component={Text}
          tw={'font-bold text-xl text-white mb-4 text-center'}>
          {'Audio Album'}
        </StyledComponent>
        <TouchableOpacity
          className="absolute top-4 right-4"
          onPress={() => {
            setShow(!show);
          }}>
          <MaterialCommunityIcons name={'magnify'} size={24} color={'white'} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'violet'} />
      ) : (
        <View>
          {Boolean(show) && (
            <TextInput
              className="m-4 bg-slate-100 rounded-md px-2 py-3"
              value={query}
              onChange={handleSearch}
              placeholder={'Type your favorite music'}
              selectionColor={'violet'}
              clearButtonMode="while-editing"
              autoCorrect={false}
              spellCheck={false}
            />
          )}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={albums}
            keyExtractor={(item, index: number): string => String(index)}
            refreshing={isLoading}
            onRefresh={onRefresh}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              if (!query) {
                setPage(page + 1);
                setIsFetchingMore(true);
              }
            }}
            renderItem={({item, index}: {item: albumType; index: number}) => (
              <AlbumItem
                index={index}
                item={item}
                onPlay={onPlay}
                played={played}
                state={state}
              />
            )}
            ItemSeparatorComponent={() => (
              <View className="h-px bg-slate-300" />
            )}
            ListFooterComponent={() => (
              <View className={`${show ? 'mb-80' : 'mb-32'}`} />
            )}
          />
        </View>
      )}
      {Boolean(typeof played === 'number') && (
        <AudioPlayer
          albums={albums}
          played={played}
          setState={setState}
          state={state}
        />
      )}
    </SafeAreaView>
  );
};

export default DashboardScreen;

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
} from 'react-native';
import {useGetAlbumQuery} from '../api';
import {albumType} from '../types/albumsType';
import AlbumItem from '../components/DashboardComponents/AlbumItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardScreen = (): ReactElement => {
  const [page, setPage] = useState<number>(1);
  const [albums, setAlbums] = useState<albumType[]>();
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [played, setPlayed] = useState<number>();
  const [query, setQuery] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  const {data: newAlbums = [], isLoading} = useGetAlbumQuery(
    {page, query},
    {
      skip: isFetchingMore && page > 1,
    },
  );

  const onPlay = (i: number) => {
    setPlayed(i);
  };

  useEffect(() => {
    if (newAlbums && newAlbums?.length > 0) {
      setAlbums((prevAlbums): albumType[] =>
        prevAlbums ? [...prevAlbums, ...newAlbums] : newAlbums,
      );
      setIsFetchingMore(false);
    }
  }, [newAlbums, page]);

  return (
    <SafeAreaView className={'pt-4 bg-white'}>
      <View className="bg-fuchsia-700 rounded-b-3xl ">
        <StyledComponent
          component={Text}
          tw={'font-bold text-xl text-white mb-4 text-center'}>
          {'Audio Album'}
        </StyledComponent>
        <TouchableOpacity
          className="absolute right-4"
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
              onChange={e => {
                const val: string = e?.nativeEvent?.text || '';
                setQuery(val);
                setAlbums([]);
                setPage(1);

                setIsFetchingMore(true);
              }}
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
            onRefresh={() => {
              setPage(1);
              setAlbums([]);
              setIsFetchingMore(true);
            }}
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
    </SafeAreaView>
  );
};

export default DashboardScreen;

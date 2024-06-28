import {StyledComponent} from 'nativewind';
import React, {ReactElement, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {useGetAlbumQuery} from '../api';
import {albumType} from '../types/albumsType';
import AlbumItem from '../components/DashboardComponents/AlbumItem';

const DashboardScreen = (): ReactElement => {
  const [page, setPage] = useState<number>(1);
  const [albums, setAlbums] = useState<albumType[]>();
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [played, setPlayed] = useState<number>();

  const {data: newAlbums = [], isLoading} = useGetAlbumQuery(page, {
    skip: isFetchingMore && page > 1,
  });

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
      <View className="bg-purple">
        <StyledComponent
          component={Text}
          tw={'font-bold text-xl text-purple-950 mb-4 text-center'}>
          {'Audio Album'}
        </StyledComponent>
      </View>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'violet'} />
      ) : albums?.length ? (
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
            setPage(page + 1);
            setIsFetchingMore(true);
          }}
          renderItem={({item, index}: {item: albumType; index: number}) => (
            <AlbumItem
              index={index}
              item={item}
              onPlay={onPlay}
              played={played}
            />
          )}
          ItemSeparatorComponent={() => <View className="h-px bg-slate-300" />}
          ListFooterComponent={() => <View className="mb-24" />}
        />
      ) : (
        <View />
      )}
    </SafeAreaView>
  );
};

export default DashboardScreen;

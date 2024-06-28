export interface albumType {
  userId: number;
  id: number;
  title: string;
}

export interface albumItemType {
  played: number | undefined;
  item: albumType;
  index: number;
  onPlay: Function;
}

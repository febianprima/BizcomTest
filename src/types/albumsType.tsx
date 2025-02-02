export interface albumType {
  userId: number;
  id: number;
  title: string;
}

export interface albumItemType {
  played: number | void;
  item: albumType;
  index: number;
  onPlay: Function;
  state: string;
}

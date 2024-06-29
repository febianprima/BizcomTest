import {Dispatch, SetStateAction} from 'react';
import {albumType} from './albumsType';

export interface playerType {
  albums: albumType[] | void;
  played: number | void;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}

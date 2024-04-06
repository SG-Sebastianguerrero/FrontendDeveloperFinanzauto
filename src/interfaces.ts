// Generated by https://quicktype.io

export interface Users {
  data: Datum[];
  total: number;
  page: number;
  limit: number;
}

export interface Datum {
  id: string;
  title: Title;
  firstName: string;
  lastName: string;
  picture: string;
}

export enum Title {
  MS = "ms",
  Miss = "miss",
  Mr = "mr",
  Mrs = "mrs",
}
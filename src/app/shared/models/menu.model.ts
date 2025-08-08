import { MatTableDataSource } from "@angular/material/table";

export interface IMenu {
  idMenu: number;
}

export interface IMenuChildren extends IMenu {
  idMenuChildren: number;
}

interface MenuEntity {
  idMenu: number;
  route: string;
  name: string;
  script: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  icon: string;
  idState: number;
  labelTag?: MenuTag;
  badgeTag?: MenuTag;
}

export interface Menu extends MenuEntity {
  children?: MenuChildren[];
}

export interface MenuDataSource extends MenuEntity {
  children?: MenuChildren[] | MatTableDataSource<MenuChildren>;
}

export interface MenuChildren {
  idMenu: number,
  idMenuChildren: number;
  route: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  idState: number;
  children?: MenuChildren[];
}

export interface MenuTag {
  idMenuTag: number;
  color: string;
  value: string;
  idState: number;
}

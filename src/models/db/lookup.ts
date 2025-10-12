import { BaseEntity } from './base-entity';

export interface ILookup extends BaseEntity {
  code: string;
  name: string;
}

export interface Lookup extends ILookup {
  value: string | string[];
  groupKey: string | string[];
  parentId: string;
}

import { LayoutType, LayoutVersion } from '~/types/global';

export interface LayoutVersionData {
  version: LayoutVersion;
  published: boolean;
  isBeta: boolean;
  isActive: boolean;
  path: string;
}

export interface LayoutMetadata {
  name: LayoutType;
  description: string;
  author: string;
  updatedDate: string;
  published: boolean;
  thumbnail: string;
  layoutType: LayoutType;
  versions: LayoutVersionData[];
}

export type LayoutPreferences = Partial<
  Record<LayoutType, { name: string; version: string }>
>;

export interface LayoutContextProps {
  layoutPreferences: LayoutPreferences;
  setLayoutPreferences: (
    layoutType: LayoutType,
    name: string,
    version: string,
  ) => void;
  layouts: LayoutMetadata[];
  isLoading: boolean;
}

export type _docgenInfoProps = {
  name: string;
  type: {name: string; value: {value: string}[]}
  defaultValue: {value: string};
  required: boolean;
};

export interface __docgenInfoType {
  displayName: string;
  props: {[key: string]: _docgenInfoProps};
}

export type __docgenInfoChildrenType = {
  __docgenInfo?: __docgenInfoType;
  type?: __docgenInfoChildrenType;
  render?: {displayName: string; __docgenInfo?: __docgenInfoType};
};

export type DisplayOptions =
  | 'row'
  | 'block'
  | 'column'
  | 'grid-column'
  | 'grid-row'
  | 'contents';

interface InjectType {
  components: React.ReactNode[];
  prop: string;
  types: string[];
  defaultValue: string;
  required: boolean;
}
export interface StoryBuilderProps {
  children: React.ReactElement;
  display?: DisplayOptions;
  templateFit?: 'contain' | 'fill';
  strings?: {[key: string]: string[] | boolean};
  style?: React.CSSProperties;
  inject?: InjectType[];
  darkMode?: boolean;
}

export interface TableColumn {
  id: string;
  title: string;
  style: string;
}

export const Columns: TableColumn[] = [
  { id: 'prop', title: 'Prop', style: 'h4' },
  { id: 'type', title: 'Type', style: 'h4' },
  { id: 'default', title: 'Default', style: 'h4' },
];

export interface PropInfo {
  components: React.ReactNode[];
  prop: string;
  types: string[];
  defaultValue: string;
  required: boolean;
}

export interface Story {
  name: string;
  props: PropInfo[];
}
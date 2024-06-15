export type ElementType = {
  name: string;
  type: {
    name: string;
    value: string[];
  }
  defaultValue: {
    value: string;
  };
  required: boolean;
};

export interface ResultObject {
  [key: string]: string[];
}

export interface ComponentInfo {
  displayName: string;
  props: {
    [key: string]: ElementType;
  };
}

export type Type = {
  __docgenInfo?: ComponentInfo;
  type?: Type;
  render?: {
    displayName: string;
    __docgenInfo?: ComponentInfo;
  };
};

export interface Component {
  type: Type;
}

export type DisplayOptions =
  | 'flex'
  | 'block'
  | 'flex-column'
  | 'grid-column'
  | 'grid-row'
  | 'contents';

export interface StoryBuilderProps {
  children: React.ReactElement;
  display?: DisplayOptions;
  isDarkBackground?: boolean;
  templateFit?: 'contain' | 'fill';
}


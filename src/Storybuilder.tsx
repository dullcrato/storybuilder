import React from 'react';
import classNames from 'classnames';

const STYLE_NAMESPACE = 'vcp-storybuilder';
const DEFAULT_KEYS = ['label', 'title', 'text', 'description', 'placeholder', 'caption']

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
  templateFit?: 'contain' | 'fill';
  strings?: any
  style?: React.CSSProperties;
}

interface TableProps {
  name: string;
  props: [string, string[], string, boolean][];
}

interface TableColumn {
  id: string;
  title: string;
  style: string;
}

const Columns: TableColumn[] = [
  { id: 'prop', title: 'Prop', style: 'h4' },
  { id: 'type', title: 'Type', style: 'h4' },
  { id: 'default', title: 'Default', style: 'h4' },
];

const getStory = (children: any, strings: any): TableProps => {
  const getType = (type: Type): any | undefined => {
    if (type.__docgenInfo) {
      const booleans: any = {
        components: [],
        prop: ['boolean'],
        types: [],
        defaultValue: '',
        required: false
      }

      const childrenKey = Object.keys(type.__docgenInfo.props).find((element: any) => Object.values(DEFAULT_KEYS).includes(element)) || 'children';
      const renderProp = (value: any) => children.props['children'] ? { [childrenKey]: value, children: children.props['children'] } : { [childrenKey]: value }
      return {
        name: type.__docgenInfo.displayName,
        props: Object.entries(type.__docgenInfo.props).map(([key, {type, defaultValue, required}]: [string, any]) => {  
          switch (type.name) {
            case 'enum':
              return {
                components: type.value?.map(({ value }: any) => React.cloneElement(
                  children,
                  {[key]: value.replace(/"/g, ''), key: value, ...renderProp(value.replace(/"/g, '')) }
                )),
                prop: key,
                types: type.value.map(({ value }: any) => value.replace(/"/g, '')),
                defaultValue: defaultValue?.value,
                required
              }
            case 'string':
              if (strings[key] === false) {
                return;
              }
              return {
                components: React.cloneElement(children, {[key]: strings[key] || key, key, ...renderProp(strings[key] || key)}),
                prop: key,
                types: ['string'],
                defaultValue: defaultValue?.value,
                required
              }
            case 'boolean':
              booleans.components.push(React.cloneElement(children, {[key]: key, key, ...renderProp(key)}))
              booleans.types.push(key)
              break;
          }
        }).concat(booleans.components.length && [booleans]).filter(Boolean)
      }
    } else if (type.type) {
      return getType(type.type);
    } else if (type.render) {
      return getType(type.render);
    } else {
      return [];
    }
  };

  return getType(children);
};


const StoryBuilder: React.FC<StoryBuilderProps> = ({
  children,
  display = 'flex',
  strings = {},
  style
}) => {
  const story = getStory(children, strings)

  return (
    <div className={STYLE_NAMESPACE}>
      <div className={`${STYLE_NAMESPACE}-container`}>
        <h1>{story.name}</h1>
        {story.props?.length ? story.props.map((prop: any, i: number) => (
          <div key={i} className={classNames(`${STYLE_NAMESPACE}-story`)}>
            <div className={classNames(`${STYLE_NAMESPACE}-story-props`)}>
              <h2 className={classNames(`${STYLE_NAMESPACE}-story-props-prop`)}>Prop: {prop.prop}</h2>
              <span className={classNames(`${STYLE_NAMESPACE}-story-props-types`)}>
                Type: {prop.types.map((type: string) => <code key={type} className={classNames(`${STYLE_NAMESPACE}-story-props-types-type`)}>{type}</code>)}
              </span>
            </div>
            <div className={`${STYLE_NAMESPACE}-story-components`}>
              <div className={`${STYLE_NAMESPACE}-story-components-${display}`} style={{flexWrap: prop.components.length > 5 ? 'wrap' : 'nowrap', ...style}}>
                {prop.components}
              </div>
            </div>
            <div className={`${STYLE_NAMESPACE}-story-toolbar`} />
          </div>
        )) : children}
        {story.props &&
          <table className={`${STYLE_NAMESPACE}-table`}>
            <thead>
              <tr>{Columns.map(({ id, title }) => <th key={id}>{title}</th>)}</tr>
            </thead>
            <tbody>
              {story.props?.map((prop: any, i: number) => (
                <tr key={i}>
                  <td><h6>{prop.prop}{prop.required && '*'}</h6></td>
                  <td>{prop.types.map((type: string) => <h6 key={type} style={{ margin: "3px 0" }}>{type}</h6>)}</td>
                  <td><h6>{prop.defaultValue}</h6></td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
};

export default StoryBuilder;

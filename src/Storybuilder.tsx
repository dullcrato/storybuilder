import React from 'react';
import classNames from 'classnames';
import {Columns, PropInfo, Story, StoryBuilderProps, __docgenInfoChildrenType} from './types';

const STYLE_NAMESPACE = 'vcp-storybuilder';
const DEFAULT_KEYS = ['label', 'title', 'text', 'description', 'placeholder', 'caption']

const getStory = (children: React.ReactElement, strings: {[key: string]: string[] | boolean}) => {
  const getType = (type: __docgenInfoChildrenType): Story => {
    if (type.__docgenInfo) {
      const booleans: PropInfo = {
        components: [],
        prop: 'boolean',
        types: [],
        defaultValue: '',
        required: false,
      };
      
      const childrenKey = Object.keys(type.__docgenInfo.props).find(element => Object.values(DEFAULT_KEYS).includes(element)) || 'children';
      return {
        name: type.__docgenInfo.displayName,
        props: Object.entries(type.__docgenInfo.props).reduce((acc, [key, {type, defaultValue, required}]) => {
          switch (type.name) {
            case 'enum':
              console.log(type)
              acc.push({
                components: type.value?.map(({value}) => React.cloneElement(
                  children,
                  {[key]: value.replace(/"/g, ''), key: value, [childrenKey]: value.replace(/"/g, '')}
                )),
                prop: key,
                types: type.value.map(({value}) => value.replace(/"/g, '')),
                defaultValue: defaultValue?.value,
                required
              });
              break;
            case 'string':
              if (strings[key] !== false) {
                acc.push({
                  components: React.cloneElement(
                    children,
                    {[key]: strings[key] || key, key, [childrenKey]: strings[key] || key}
                  ),
                  prop: key,
                  types: ['string'],
                  defaultValue: defaultValue?.value,
                  required
                });
              }
              break;
            case 'boolean':
              booleans.components.push(React.cloneElement(children, {[key]: key, key, [childrenKey]: key}));
              booleans.types.push(key);
              break;
          }
          return acc;
        }, [] as any[]).concat(booleans.components.length ? [booleans] : [])
      };
    } else if (type.type) {
      return getType(type.type);
    } else if (type.render) {
      return getType(type.render);
    } else {
      return [] as any;
    }
  };

  return getType(children as __docgenInfoChildrenType);
};

const StoryBuilder: React.FC<StoryBuilderProps> = ({
  children,
  display = 'row',
  strings = {},
  style,
  inject = [],
  darkMode = false
}) => {
  const {props, name} = getStory(children, strings)
  const render = props?.concat(inject)

  return (
    <div className={STYLE_NAMESPACE}>
      <div className={`${STYLE_NAMESPACE}-container`}>
        <h1>{name}</h1>
        {render?.length ? render?.map((prop: PropInfo, i: number) => (
          <div key={i} className={classNames(`${STYLE_NAMESPACE}-story`)}>
            <div className={classNames(`${STYLE_NAMESPACE}-story-props`)}>
              <h2 className={classNames(`${STYLE_NAMESPACE}-story-props-prop`)}>Prop: {prop.prop}</h2>
              <span className={classNames(`${STYLE_NAMESPACE}-story-props-types`)}>
                Type: {prop.types.map((type: string) => <code key={type} className={classNames(`${STYLE_NAMESPACE}-story-props-types-type`)}>{type}</code>)}
              </span>
            </div>
            <div className={`${STYLE_NAMESPACE}-story-components`} style={{backgroundColor: darkMode ? '#121B4E' : '#FFFFFF'}}>
              <div className={`${STYLE_NAMESPACE}-story-components-${display}`} style={{flexWrap: prop.components.length > 5 ? 'wrap' : 'nowrap', ...style}}>
                {prop.components}
              </div>
            </div>
            <div className={`${STYLE_NAMESPACE}-story-toolbar`} />
          </div>
        )) : children}
        {render &&
          <table className={`${STYLE_NAMESPACE}-table`}>
            <thead>
              <tr>{Columns.map(({id, title}) => <th key={id}>{title}</th>)}</tr>
            </thead>
            <tbody>
              {render?.map((prop: PropInfo, i: number) => (
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

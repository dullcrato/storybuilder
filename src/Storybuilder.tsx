import React from 'react';
import {Table, ErrorBoundary} from './Components';
import {ComponentInfo, StoryBuilderProps, Type} from './utils';
import classNames from 'classnames';

const STYLE_NAMESPACE = 'vcp-storybuilder';
const DEFAULT_KEYS = ['label', 'title', 'text', 'description', 'placeholder', 'caption']

const getPropsFromTypes = (children: any): ComponentInfo => {
  const getType = (type: Type): any | undefined => {
    if (type.__docgenInfo) {
      return {
        name: type.__docgenInfo.displayName,
        props: Object.entries(type.__docgenInfo.props).map(([key, {type, defaultValue, required}]: [string, any]) => {
          switch (type.name) {
            case 'string':
            case 'boolean':
            case 'enum':
              return [
                key,
                type.value?.map(({value}: any) => value.replace(/"/g, '')).filter((item: any) => item !== 'undefined') || type.name,
                defaultValue?.value,
                required
              ]
          }
        }).filter(Boolean)
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

const getComponentsFromProps = (props: any, children: any) => {
  const booleans: any = []
  const childrenKey = props?.map((item: any) => item[0]).find((element: any) => Object.values(DEFAULT_KEYS).includes(element)) || 'children';
  const renderProp = (value: any) => children.props['children'] ? {[childrenKey]: value, children: children.props['children']} : {[childrenKey]: value}

  return props?.map(([key, values]: [string, any]) => {
    if (typeof values !== 'string') {
      return values?.map((value: any) => React.cloneElement(children, {[key]: value, key: value, ...renderProp(value)}))
    } else if (values !== 'boolean') {
      return React.cloneElement(children, {[key]: key, key, ...renderProp(key)})
    } else if (values === 'boolean') {
      booleans.push(React.cloneElement(children, {[key]: key, key, ...renderProp(key)}))
    }
  }).concat(booleans.length && [booleans]).filter(Boolean)
}

const StoryBuilder: React.FC<StoryBuilderProps> = ({
  children,
  display = 'flex',
  templateFit
}) => {
  const {name, props} = getPropsFromTypes(children) as any;
  const components = getComponentsFromProps(props, children)

  return (
    <div className={`${STYLE_NAMESPACE}-container`}>
      <ErrorBoundary>
        <div
          className={classNames(STYLE_NAMESPACE,
            `${STYLE_NAMESPACE}-${templateFit}`
          )}
        >
          <h1>{name}</h1>
          {components?.map((item: any, i: any) => (
            <div key={i} className={classNames(`${STYLE_NAMESPACE}__description`)}>
              <div className={classNames(`${STYLE_NAMESPACE}__description-title`)}>
                <h2 className={classNames(`${STYLE_NAMESPACE}__description-title-font`)}>Prop: {props[i][0]}</h2>
                <span className={classNames(`${STYLE_NAMESPACE}__description-description`)}>
                  Type: {Array.isArray(props[i][1])
                    ? props[i][1].map((item: any) =>
                      <code key={item} className={classNames(`${STYLE_NAMESPACE}__description-prop`)}>{item}</code>)
                    : <code key={props[i][1]} className={classNames(`${STYLE_NAMESPACE}__description-prop`)}>{props[i][1]}</code>}
                </span>
              </div>
              <div className={`${STYLE_NAMESPACE}__components`}>
                <div className={`${STYLE_NAMESPACE}__components-${display}`} style={{flexWrap: item.length > 5 ? 'wrap' : 'nowrap'}}>
                  {item}
                </div>
              </div>
              <div className={`header ${false ? 'header--expanded' : ''}`} />
            </div>
          ))}
          {!components ? children : <Table componentProps={props} />}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default StoryBuilder;

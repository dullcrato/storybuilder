import React from 'react';
import {Demo, SourceDemo, PropsTable, Toolbar, ErrorBoundary} from './StoryBuilderSections';
import {useCollapse} from 'react-collapsed';
import {ComponentInfo, StoryBuilderProps, Type} from './utils';
import classNames from 'classnames';

import './StoryBuilder.scss';

const STYLE_NAMESPACE = 'vcp-story-builder';
const DEFAULT_KEYS = ['label', 'title', 'text', 'description', 'placeholder', 'caption']

const getPropsFromTypes = (children: any): ComponentInfo | undefined => {
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

  const componentInfo = getType(children);
  return componentInfo;
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
  isDarkBackground = false,
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
          {components?.map((item: any, i: any) => {
            const [isDarkMode, setIsDarkMode] = React.useState(isDarkBackground)
            const {getCollapseProps, getToggleProps, isExpanded} = useCollapse({duration: 0});
            return (
              <div key={i}>
                <div>
                  <h3>prop: {props[i][0]}</h3>
                  <h6>type: {props[i][1]}</h6>
                </div>
                <Demo
                  element={item}
                  isDarkMode={isDarkMode}
                  display={display}
                />
                <Toolbar
                  isExpanded={isExpanded}
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                  getToggleProps={getToggleProps}
                />
                <div {...getCollapseProps()}>
                  <SourceDemo element={item} />
                </div>
              </div>
            )
          })}
          {!components ? children : <PropsTable componentProps={props} />}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default React.memo(StoryBuilder);

import React, { ReactElement } from 'react';
import { DisplayOptions } from '../utils';
import {useCollapse} from 'react-collapsed';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import elementToJSXString from 'react-element-to-jsx-string';

const STYLE_NAMESPACE = 'vcp-story-builder';

const CUSTOM_STYLES = {
  margin: 0,
  borderRadius: '0 0 12px 12px',
  border: '1px solid #E9EDFE',
  padding: '0 2px 18px',
};

interface DemoProps {
  element: any;
  isDarkBackground: boolean;
  display: DisplayOptions;
  style?: React.CSSProperties;
}

const Demo = ({
  element,
  isDarkBackground,
  display
}: DemoProps): ReactElement => {  
  const [isDarkMode, setIsDarkMode] = React.useState(isDarkBackground)
  const {getCollapseProps, getToggleProps, isExpanded} = useCollapse({duration: 0});
  const removeFragmentString = (string: string) => string.substring(2, string.length - 3)
  const handleOnClick = () => {
    setIsDarkMode((prev: boolean) => !prev);
  }

  return (
    <>
      <div className={`${STYLE_NAMESPACE}__components`} style={{backgroundColor: isDarkMode ? '#121B4E' : '#FFFFFF'}}>
        <div className={`${STYLE_NAMESPACE}__components-${display}`} style={{flexWrap: element.length > 5 ? 'wrap' : 'nowrap'}}>
          {element}
        </div>
      </div>
      <div className={`header ${isExpanded ? 'header--expanded' : ''}`}>
        <button {...getToggleProps()}>{isExpanded ? 'Collapse' : 'Expand'} code</button>
        <button onClick={handleOnClick}>{isDarkMode ? 'light' : 'dark'}</button>
      </div>
      <div {...getCollapseProps()}>
        <SyntaxHighlighter
          language="jsx"
          style={vscDarkPlus}
          customStyle={CUSTOM_STYLES}
        >
          {removeFragmentString(elementToJSXString(<>{element}</>))}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

export default Demo;

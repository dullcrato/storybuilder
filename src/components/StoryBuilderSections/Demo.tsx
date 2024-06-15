import React, { ReactElement } from 'react';
import { DisplayOptions } from '../utils';

import '../StoryBuilder.scss';

const STYLE_NAMESPACE = 'vcp-story-builder';

interface DemoProps {
  element: any;
  isDarkMode: boolean;
  display: DisplayOptions;
  style?: React.CSSProperties;
}

const Demo = ({
  element,
  isDarkMode,
  display
}: DemoProps): ReactElement => {  
  return (
    <div
      className={`${STYLE_NAMESPACE}__components`}
      style={{backgroundColor: isDarkMode ? '#121B4E' : '#FFFFFF'}}
    >
      <div
        className={`${STYLE_NAMESPACE}__components-${display}`}
        style={{flexWrap: element.length > 5 ? 'wrap' : 'nowrap'}}
      >
        {element}
      </div>
    </div>
  );
};

export default Demo;

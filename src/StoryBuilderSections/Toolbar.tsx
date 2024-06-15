import React from 'react';
import { LightningIcon, LightningOffIcon } from '@storybook/icons';
import { IconButton, Button } from '@storybook/components';

import '../StoryBuilder.scss';

interface ToolbarProps {
  isExpanded: boolean;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  getToggleProps: () => Record<string, unknown>;
}

const Toolbar: React.FC<ToolbarProps> = ({
  isExpanded,
  isDarkMode,
  setIsDarkMode,
  getToggleProps,
}) => {

  const handleOnClick = () => {
    setIsDarkMode((prev: boolean) => !prev);
  }
  return (
    <div className={`header ${isExpanded ? 'header--expanded' : ''}`}>
      <Button {...getToggleProps()} size='medium'>
        {isExpanded ? 'Collapse' : 'Expand'} code
      </Button>
      <IconButton onClick={handleOnClick} size='medium'>
        {isDarkMode ? <LightningOffIcon size={15}/> : <LightningIcon size={15}/>}
      </IconButton>
    </div>
  );
};

export default Toolbar;

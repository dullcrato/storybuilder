import React from 'react';
import { ButtonHTMLAttributes } from 'react';

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> 

type ButtonStyle = 'primary' | 'secondary' | 'outline';

export interface ButtonProps extends BaseButtonProps {
  buttonStyle: ButtonStyle;
  size: 'small' | 'medium' | 'large';
  onClick: () => void;
  isDisabled: boolean;
  isElevated: boolean;
  isLink: boolean;
  text: string;
} 

const ActionButton: React.FC<ButtonProps> = ({
  text,
  buttonStyle,
  size = 'medium',
  onClick,
  isDisabled,
}) => {
  return (
    <>
    <button
      onClick={onClick}
      style={{
        margin: '8px',
        padding: size === 'small' ? '4px 8px' : size === 'medium' ? '8px 16px' : '12px 24px',
        backgroundColor: buttonStyle === 'primary' ? 'blue' : buttonStyle === 'secondary' ? 'green' : 'orange',
        color: buttonStyle === 'primary' ? 'white' : buttonStyle === 'secondary' ? 'white' : 'black',
        border: buttonStyle === 'outline' ? '1px solid black' : 'none',
        width: size === 'small' ? '100px' : size === 'medium' ? '200px' : '300px',
        height: size === 'small' ? '30px' : size === 'medium' ? '40px' : '50px',
        borderRadius: '4px',
        opacity: isDisabled ? 0.5 : 1,
      }}
      >
      {text}
    </button>
      </>
  );
}

export default ActionButton;
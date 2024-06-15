import { ReactElement } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import elementToJSXString from 'react-element-to-jsx-string';

const CUSTOM_STYLES = {
  margin: 0,
  borderRadius: '0 0 12px 12px',
  border: '1px solid #E9EDFE',
  padding: '0 2px 18px',
};

const SourceDemo = ({ element }: any): ReactElement => {
  const removeFragmentString = (string: string) => string.substring(2, string.length - 3)

  return (
    <SyntaxHighlighter
      language="jsx"
      style={vscDarkPlus}
      customStyle={CUSTOM_STYLES}
    >
      {removeFragmentString(elementToJSXString(<>{element}</>))}
    </SyntaxHighlighter>
  );
};

export default SourceDemo;

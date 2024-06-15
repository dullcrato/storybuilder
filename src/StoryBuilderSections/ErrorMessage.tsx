import React from 'react';
// import Text from '../../../components/Text';

import '../StoryBuilder.scss';

interface ErrorMessageProps {
  errorMessage: string;
}

interface ErrorDetailProps {
  message: string;
  details?: {
    section: string;
    func: string;
  };
}

const STYLE_NAMESPACE = 'vcp-story-builder';
const ERROR_TITLE = 'Error';

const errors = {
  general: {
    title: ERROR_TITLE,
    message:
      "My bad, we tried to whip up this component, but it's playing hard to get!",
  },
  input: {
    message:
      'input is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`',
    suggestion:
      'By default, the StoryBuilder assigns the current prop key as a child of the component. To disable this assignment, use the isChildrenDisabled flag.',
  },
  wrapper: {
    message: 'Cannot convert undefined or null to object',
    section: 'Error encountered at ',
    func: 'getComponentTypes',
    reason: 'The function failed to locate the __docgenInfo property.',
    suggestions: [
      'Ensure that the child of StoryBuilder is the component you intend to render. Avoid enclosing the component with a div or a Fragment.',
      'Review the components type for potential issues. Enhance the typing if necessary.',
      'Verify the component structure against the expected structure. Log the children on StoryBuilder to understand the structure and extend the getComponentTypes function accordingly.',
    ],
  },
};

const ErrorDetail: React.FC<ErrorDetailProps> = ({ message, details }) => (
  <div className={`${STYLE_NAMESPACE}__error-message-details`}>
    {details && (
      <div className={`${STYLE_NAMESPACE}__section-details`}>
        {/* <Text fontStyle="label-medium" color="default"> */}
          {details.section}
        {/* </Text>
        <Text
          fontStyle="h6"
          color="default"
          isBold
          className={`${STYLE_NAMESPACE}__description-title-font`}
        > */}
          {details.func}
        {/* </Text> */}
      </div>
    )}
    {/* <Text fontStyle="label-medium" color="default"> */}
      {message}
    {/* </Text> */}
  </div>
);

const Suggestions: React.FC<{ suggestions: string[] }> = ({ suggestions }) => (
  <>
    {suggestions.map((suggestion, index) => (
      // <Text key={index} fontStyle="label-large" color="default">
      //   {index + 1}. {suggestion}
      // </Text>
      <div>
        {index + 1}. {suggestion}
      </div>
    ))}
  </>
);

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => {
  const renderErrorContent = () => {
    if (errorMessage.includes(errors.input.message)) {
      return (
        <>
          <ErrorDetail message={errors.input.message} />
          <Suggestions suggestions={[errors.input.suggestion]} />
        </>
      );
    } else if (errorMessage.includes(errors.wrapper.message)) {
      return (
        <>
          <ErrorDetail
            message={errors.wrapper.message}
            details={errors.wrapper}
          />
          <Suggestions suggestions={errors.wrapper.suggestions} />
        </>
      );
    } else {
      return (
        <div className="section-details">
          {/* <Text
            fontStyle="h4"
            color="default"
            className={`${STYLE_NAMESPACE}__description-title-font`}
          > */}
            {errorMessage}
          {/* </Text>
          <Text fontStyle="label-medium" color="default"> */}
            Please check the documentation for more information.
          {/* </Text> */}
        </div>
      );
    }
  };

  return (
    <div className={`${STYLE_NAMESPACE}__error-message`}>
      <div className="error-message-container">
        {/* <Text fontStyle="h1" color="destructive"> */}
          {errors.general.message}
          <span role="img" aria-label="confused emoji">
            🤷‍♂️
          </span>
        {/* </Text> */}
        <div className="error-message-text">
          <div className="error-message-title">
            {/* <Text fontStyle="h2" color="default"> */}
              {errors.general.title}
            {/* </Text> */}
          </div>
          <div className="error-message-details">{renderErrorContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;

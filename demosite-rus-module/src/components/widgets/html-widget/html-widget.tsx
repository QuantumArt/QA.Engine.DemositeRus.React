import React from 'react';
import { collapseProps } from 'src/utilities/collapse-props';
import InnerHTML from 'dangerously-set-html-content';

interface IProps {
  html?: string;
}

const HtmlWidget = (propsOrg: IProps): JSX.Element => {
  const props = collapseProps(propsOrg);
  
  return <>{!!props.html && <InnerHTML html={props.html} />}</>;
};

export default HtmlWidget;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { collapseProps } from 'src/utilities/collapse-props';

interface IProps {
  redirectto?: string;
}
const RedirectPage = (propsOrg: IProps): JSX.Element => {
  const props = collapseProps(propsOrg);
  if (!!props.redirectto) {
    return <Navigate replace to={props.redirectto} />;
  }
  return <div />;
};

export default RedirectPage;
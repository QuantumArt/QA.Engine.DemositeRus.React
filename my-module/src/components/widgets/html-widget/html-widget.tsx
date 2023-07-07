import { useZoneStore } from '@quantumart/qp8-widget-platform-bridge';
import React from 'react';
import { collapseProps } from 'src/utilities/collapse-props';

interface IProps {
  html?: string;
}

const HtmlWidget = (propsOrg: IProps): JSX.Element => {
  const ZoneStore = useZoneStore();
  const props = collapseProps(propsOrg);

  return <ZoneStore.DynamicZone html={props.html ?? ''} />;
};

export default HtmlWidget;

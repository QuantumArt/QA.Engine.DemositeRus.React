import React from 'react';
import { WidgetZone, useZoneStore } from '@quantumart/qp8-widget-platform-bridge';
import { collapseProps } from 'src/utilities/collapse-props';

interface IProps {
  text?: string;
  hidetitle: boolean;
}

const TextPage = (propsOrg: IProps): JSX.Element => {
  const ZoneStore = useZoneStore();
  const props = collapseProps(propsOrg);

  return (
    <>
      <WidgetZone name="Content" />
      <ZoneStore.DynamicZone html={props.text ?? ''} />
      <WidgetZone name="ContentBelow" />
    </>
  );
};

export default TextPage;

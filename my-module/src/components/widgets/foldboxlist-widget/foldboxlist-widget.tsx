import { observer } from 'mobx-react-lite';
import React from 'react';
import { getFoldboxItems } from 'src/api/foldbox-list';
import { collapseProps } from 'src/utilities/collapse-props';
import Tabs from 'src/components/tabs/tabs';
import FoldboxList from 'src/components/foldbox-list/foldbox-list';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { FoldboxListItem } from 'src/types';

enum WidgetType {
  Tab = 'Tab',
  FoldBox = 'FoldBox',
}

interface IProps {
  foldboxlistitems: number[];
  title: string;
  widgettype: WidgetType;
}

interface IComponentProps {
  title: string;
  widgettype: string;
  foldboxItems: FoldboxListItem[];
}

export async function getStaticProps(
  propsOrg: IProps,
  client: ApolloClient<NormalizedCacheObject>,
): Promise<IComponentProps> {
  const props = collapseProps(propsOrg);
  const foldboxItems = await getFoldboxItems(client, props.foldboxlistitems ?? []);

  return {
    title: props.title,
    widgettype: props.widgettype,
    foldboxItems,
  };
}

const FoldboxlistWidget = observer(({ foldboxItems, title, widgettype }: IComponentProps) => (
  <section className="page__section foldbox">
    <div className="wrapper">
      {widgettype === WidgetType.Tab ? (
        <>
          <h2 className="h2 center">{title}</h2>
          <div className="page__block">
            <Tabs items={foldboxItems} />
          </div>
        </>
      ) : (
        <div className="page__block">
          <FoldboxList foldboxItems={foldboxItems} />
        </div>
      )}
    </div>
  </section>
));

export default FoldboxlistWidget;

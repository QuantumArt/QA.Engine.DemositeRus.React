import React, { useState } from 'react';
import { FoldboxListItem } from 'src/types';
import FoldBox from '../foldbox/foldbox';

interface Props {
  foldboxItems: FoldboxListItem[];
};

const FoldboxList = ({ foldboxItems }: Props): JSX.Element => {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div className="foldbox-list">
      <div className="foldbox-list__button">
        <button
          type="button"
          className="button"
          style={{ minWidth: '120px' }}
          onClick={() => setOpened(!opened)}
        >
          {!opened ? 'Показать все' : 'Скрыть все'}
        </button>
      </div>

      <div className="foldbox-list__group">
        {foldboxItems.map(foldboxItem => {
          const { id, text, title } = foldboxItem;

          return <FoldBox key={id} title={title} text={text} opened={opened} />;
        })}
      </div>
    </div>
  );
};

export default FoldboxList;

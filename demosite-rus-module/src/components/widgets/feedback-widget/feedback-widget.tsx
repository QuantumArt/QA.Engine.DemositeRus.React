import { WidgetZone } from '@quantumart/qp8-widget-platform-bridge';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { FeedbackStore } from 'src/api/feeback';
import Input from 'src/components/input/input';
import Textarea from 'src/components/textarea/textarea';
import { BootState } from 'src/constants/boot-state';

interface IProps {}

interface IComponentProps {
  feedbackStore: FeedbackStore;
}

export async function getStaticProps(_: IProps): Promise<IComponentProps> {
  const feedbackStore = new FeedbackStore();
  await feedbackStore.init();

  return {
    feedbackStore,
  };
}

const FeedbackWidget = observer((props: IComponentProps) => {
  const { feedbackStore } = props;

  if (!feedbackStore.form) {
    return null;
  }

  if (feedbackStore.bootState !== BootState.Loading && feedbackStore.bootState !== BootState.None) {
    const success = feedbackStore.bootState === BootState.Success;

    return (
      <section className="page__section">
        <div className="wrapper">
          <div className="page__block">
            <h1 className="h1 center">Ваше сообщение {success ? 'отправлено' : 'не отправлено'}</h1>
            <div className="page__text center">
              <p>
                {success ? 'Спасибо за ваше обращение' : 'Извините, попробуйте позднее еще раз.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <WidgetZone name="ContentBelow" />

      <section className="page__section">
        <div className="wrapper">
          <div className="feedback-form">
            <Input
              id="name"
              placeholder="Как к вам обращаться"
              className="feedback-form__item"
              classNameContainer="feedback-form__item-container"
              formControl={feedbackStore.form.controls.name}
            />

            <Input
              id="phoneOrEmail"
              placeholder="Телефон или email"
              className="feedback-form__item"
              classNameContainer="feedback-form__item-container"
              formControl={feedbackStore.form.controls.phoneOrEmail}
            />

            <Textarea
              id="text"
              placeholder="Комментарий"
              className="feedback-form__item feedback-form__item-comment"
              classNameContainer="feedback-form__item-container-comment"
              formControl={feedbackStore.form.controls.text}
            />

            <button
              type="button"
              onClick={feedbackStore.send}
              className="feedback-form__submit-btn"
              disabled={feedbackStore.form.hasErrors()}
            >
              Отправить
            </button>
          </div>
        </div>
      </section>
    </>
  );
});

export default FeedbackWidget;

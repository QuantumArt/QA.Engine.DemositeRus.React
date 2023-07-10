import React from 'react';
import { SubscribeStore } from 'src/api/subscribe';
import Input from 'src/components/input/input';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import Checkbox from 'src/components/checkbox/checkbox';
import { observer } from 'mobx-react-lite';
import { BootState } from 'src/constants/boot-state';
import Radio from 'src/components/radio/radio';

interface IProps {}

interface IComponentProps {
  subscribeStore: SubscribeStore;
}

export async function getStaticProps(
  _: IProps,
  client: ApolloClient<NormalizedCacheObject>,
): Promise<IComponentProps> {
  const subscribeStore = new SubscribeStore(client);
  await subscribeStore.init();

  return {
    subscribeStore,
  };
}

const SubscribeWidget = observer((props: IComponentProps) => {
  const { subscribeStore } = props;

  if (!subscribeStore.form) {
    return null;
  }

  if (
    subscribeStore.bootState !== BootState.Loading &&
    subscribeStore.bootState !== BootState.None
  ) {
    const success = subscribeStore.bootState === BootState.Success;

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
    <section className="page__section">
      <div className="wrapper">
        <div className="page__block">
          <div className="page__text center">
            <div className="subscribe">
              <form className="form">
                <div className="form__row">
                  <div className="form__field">
                    <div className="form__group">
                      {subscribeStore.genders.map(gender => (
                        <Radio
                          name="gender"
                          label={gender.title}
                          key={gender.value}
                          data={gender.value}
                          formControl={subscribeStore.form!.controls.gender}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form__row">
                  <div className="form__field">
                    <Input
                      id="firstName"
                      className="input"
                      placeholder="Имя*"
                      formControl={subscribeStore.form.controls.firstName}
                    />
                  </div>
                  <div className="form__field">
                    <Input
                      id="lastName"
                      className="input"
                      placeholder="Фамилия*"
                      formControl={subscribeStore.form.controls.lastName}
                    />
                  </div>
                </div>

                <div className="form__row">
                  <div className="form__field">
                    <Input
                      id="company"
                      className="input"
                      placeholder="Компания*"
                      formControl={subscribeStore.form.controls.company}
                    />
                  </div>
                  <div className="form__field">
                    <Input
                      id="email"
                      className="input"
                      placeholder="Email*"
                      formControl={subscribeStore.form.controls.email}
                    />
                  </div>
                </div>

                {!!subscribeStore.form.controls.categories && (
                  <div className="form__row">
                    <div className="form__field">
                      <div className="form__group">
                        {subscribeStore.form.controls.categories.map(formControl => (
                          <Checkbox
                            key={formControl.additionalData.id}
                            formControl={formControl}
                            label={formControl.additionalData.title}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="form__row">
                  <div className="form__field">
                    <div className="form__group">
                      <button
                        type="button"
                        className="button"
                        value="subscribe"
                        disabled={subscribeStore.form.hasErrors()}
                        onClick={subscribeStore.send}
                      >
                        Подписаться
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SubscribeWidget;

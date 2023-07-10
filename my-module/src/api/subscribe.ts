import { makeAutoObservable } from 'mobx';
import { errorNameMsg, nameMask } from 'src/constants';

import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import {
  ControlsCollection,
  FormArray,
  FormControl,
  FormGroup,
  patternValidator,
  requiredValidator,
  wrapperSequentialCheck,
} from '@quantumart/mobx-form-validation-kit';
import { NewsCategoriesQueryResult } from 'src/types';
import { BootState } from 'src/constants/boot-state';

interface SubscribeForm extends ControlsCollection {
  gender: FormControl<string | null>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  company: FormControl<string | null>;
  email: FormControl<string | null>;
  categories: FormArray<FormControl<boolean>>;
}

interface Gender {
  title: 'Уважаемый' | 'Уважаемая';
  value: 'm' | 'f';
}

interface NewsCategory {
  id: number;
  alias: string;
  title: string;
  sortOrder: number;
}

export class SubscribeStore {
  constructor(private readonly client: ApolloClient<NormalizedCacheObject>) {
    makeAutoObservable(this);
  }

  public bootState: BootState = BootState.None;

  public readonly genders: Gender[] = [
    {
      title: 'Уважаемый',
      value: 'm',
    },
    {
      title: 'Уважаемая',
      value: 'f',
    },
  ];

  public form: FormGroup<SubscribeForm> | undefined;
  public categories: NewsCategory[] = [];

  public getCategories = async () => {
    const query = gql`
      query getNewsCategories {
        newsCategories(filter: { showOnStartEq: true }) {
          items {
            id
            alternativeTitle
            alias
            sortOrder
          }
        }
      }
    `;

    try {
      const { data }: { data: NewsCategoriesQueryResult } = await this.client.query({
        query,
      });

      if (!data?.newsCategories?.items?.length) {
        return;
      }

      const categories = data.newsCategories.items.map(
        ({ id, alias, alternativeTitle, sortOrder }) => ({
          id,
          alias,
          title: alternativeTitle,
          sortOrder,
        }),
      );

      categories.sort((a, b) => a.sortOrder - b.sortOrder);

      this.categories = categories;
    } catch (e) {
      console.error(e);
    }
  };

  public init = async () => {
    await this.getCategories();

    this.form = new FormGroup<SubscribeForm>({
      gender: new FormControl<string | null>(this.genders[0].value),
      firstName: new FormControl<string | null>(null, {
        validators: [
          wrapperSequentialCheck([
            requiredValidator('Введите имя'),
            patternValidator(nameMask, errorNameMsg),
          ]),
        ],
      }),
      lastName: new FormControl<string | null>(null, {
        validators: [
          wrapperSequentialCheck([
            requiredValidator('Введите фамилию'),
            patternValidator(nameMask, errorNameMsg),
          ]),
        ],
      }),
      company: new FormControl<string | null>(null, {
        validators: [wrapperSequentialCheck([requiredValidator('Введите название компании')])],
      }),
      email: new FormControl<string | null>(null, {
        validators: [wrapperSequentialCheck([requiredValidator('Введите email')])],
      }),
      categories: new FormArray<FormControl<boolean>>(
        this.categories.map(
          category =>
            new FormControl<boolean>(true, {
              //   onChangeValidValue: value => removeOrAddElement(value, this.skills, skill.id),
              //   onChangeValidValue: value => console.log('value', value),
              additionalData: category,
            }),
        ),
      ),
    });
  };

  public send = async (): Promise<void> => {
    await this.form?.wait();
    if (this.form?.invalid) {
      this.form.setTouched(true);
      return;
    }
    this.bootState = BootState.Success;
  };
}

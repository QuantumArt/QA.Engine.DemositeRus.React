import { NoneComponent } from './none-component';
import { IComponentInfo } from './component-info';
import { enrichmentHash } from './url-helpers';

class DynamicWPComponentsStore {
  //Источники модулей
  private sourcesModules: { [key: string]: Promise<void> } = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getComponent = async (info: IComponentInfo): Promise<any> => {
    if (!info.url) {
      return {
        default: NoneComponent,
      };
    }
    try {
      //Проверяем наличие источника в сторе, если нет то добавляем его в загрузки
      if (!this.sourcesModules[info.url]) {
        this.sourcesModules[info.url] = new Promise<void>((success, reject) => {
          const element = document.createElement('script');
          element.src = enrichmentHash(`${info.url}/remoteEntry.js`);
          element.type = 'text/javascript';
          element.async = true;
          element.onload = () => success();
          element.onerror = () => reject();
          document.head.appendChild(element);
        });
      }
      await this.sourcesModules[info.url];
    } catch (ex) {
      console.error(`Модуль "${info.moduleName}" не загружен!`, ex);
      return {
        default: NoneComponent,
      };
    }
    try {
      return await DynamicWPComponentsStore.loadDynamicOutputInBrowser(
        info.moduleName,
        info.componentAlias,
      );
    } catch (ex) {
      console.error(
        `Компонент "${info.componentAlias}" из модуля "${info.moduleName}" не загружен!`,
        ex,
      );
      return {
        default: NoneComponent,
      };
    }
  };

  private static async loadDynamicOutputInBrowser(scope: string, path: string): Promise<any> {
    const container = window[scope];
    if (!container) {
      return {
        default: NoneComponent,
      };
    }
    // @ts-ignore
    await __webpack_init_sharing__('default');
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(`./${path}`);
    const externalModule = factory();
    return externalModule;
  }
}

const wpсStore = new DynamicWPComponentsStore();
export default wpсStore;

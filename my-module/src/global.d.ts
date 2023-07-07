/***************/
// declare Window and Global object
/***************/

declare module '*.jpg';

declare module '*.svg' {
  const content: any;
  export default content;
}

declare interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

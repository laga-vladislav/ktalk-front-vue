/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
interface ImportMetaEnv {
  [key: string]: string | undefined;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
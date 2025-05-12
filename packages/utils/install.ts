import type { App, Plugin } from "vue";
import { each } from "lodash-es";

type SFCWithInstall<T> = T & Plugin;

export function makeInstaller(component:Plugin[]){//批量安装组件
    const installer = (app:App) => each(component,(c) =>app.use(c));
    return installer as Plugin
}

export const withInstaller = <T>(component:T) => {//单独安装组件
    (component as SFCWithInstall<T>).install =(app:App) => {
        const name =(component as any).name
        app.component(name,component as Plugin)
      
    }
    
    return component as SFCWithInstall<T>
    
  
}

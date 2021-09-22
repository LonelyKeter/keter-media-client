import { RouteParams } from "vue-router";
import { Plugin, App } from 'vue';

type Paths = {
    extractSingleParam(paramName: string, params: RouteParams): string
}

const paths: Paths & Plugin = {
    install(app: App<any>) {
        app.config.globalProperties.$paths = this;
    },
    extractSingleParam(paramName: string, params: RouteParams) {
        const param = params[paramName];

        if (typeof param === "string") {
            return param;
        } else {
            return param[0];
        }
    }
}

export default paths;

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $paths: Paths 
    }
}


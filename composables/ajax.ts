/*
封装useFetch
--------------------------------
由于useFetch已经是经过封装简化后的请求方式，所以基于useFetch方法进行进一步的封装，主要是添加全局的baseURL，还有添加了请求与响应拦截。这里按照实际项目需求来封装就好。

1.Composables 目录自动导入
Nuxt 3使用composables/目录使用auto-imports自动将Vue组合导入到应用中!
默认情况下Nuxt3会自动导入此目录下的第一级文件，所以将封装网络请求的函数写在此目录下并导出即可在项目内自由使用。

2.定义 Runtime Config 公共变量
useRuntimeConfig 用于在应用程序中公开配置变量。
*/

import type { LocationQuery } from 'vue-router';
import type { NitroFetchRequest } from 'nitropack';
import type { FetchOptions } from 'ofetch';
// import fs from 'fs';

interface Params {
    url: NitroFetchRequest;
    opts: FetchOptions<any>;
    method?: 'get' | 'post';
}

// 项目内直接使用getFetchData方法处理异步请求
export function getFetchData({ url, opts, method = 'get' }: Params) {
    // 接口传参要求
    interface QueryItem {
        uid?: string;
        token?: LocationQuery;
    }
    const route = useRoute();
    const query: QueryItem = route.query;

    const config = useRuntimeConfig();
    const { data } = useFetch(url, {
        // method此处仅仅只处理了get与post请求
        method,
        // ofetch库会自动识别请求地址，对于url已包含域名的请求不会再拼接baseURL
        baseURL: config.public.baseURL + '/xxx',
        // onRequest相当于请求拦截
        onRequest({ request, options }) {
            // 设置请求头
            options.headers = { ...options.headers, authorization: 'xxx' };
            // 设置请求参数
            if (method === 'post') {
                options.body = { ...opts };
                options.query = query;
            } else {
                options.query = Object.assign(query, { ...opts });
            }
        },
        // onResponse相当于响应拦截
        onResponse({ response }) {
            // 处理响应数据
            if (response._data.error) {
                console.warn('=== error url: ', url, '\n params:', opts, '\n response:', response._data);
                // 弹出报错弹窗
                console.log(response._data.message);
                // 处理服务端渲染时接口报错，可接入日志系统或者邮件系统，此处测试demo采取写入文件系统
                // fs.writeFileSync('error.txt', `error url:${url}\n response:${response._data.message}\n`, { flag: 'a' });
            } else {
                // 这里可以根据后端返回的数据结构对返回数据进行处理，比如后端数据返回得比较深还有一层data结构，我这里就统一取出来，在后续接口请求的时候就直接能拿到了
                // response._data = response._data.data;
                return response;
            }
        },
        onRequestError({ request, options, error }) {
            // 处理请求错误
            console.warn('request error', error);
        },
        onResponseError({ request, response, options }) {
            // 处理响应错误
            console.warn('request error', response);
        },
    });
    // 这里data本身是个ref对象，将其内部值抛出去方便调用时获得数据。
    return data.value;
}
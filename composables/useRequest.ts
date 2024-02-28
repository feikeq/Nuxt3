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

// composables是官方默认的插件目录，官方描述：Nuxt 3使用composables/目录使用auto-imports自动将Vue组合导入到应用中!
// 数据获取文档 https://nuxt.com/docs/getting-started/data-fetching
// useFetch 文档 https://nuxt.com/docs/api/composables/use-fetch
// ofetch 文档 https://github.com/unjs/ofetch#%EF%B8%8F-interceptors
//文件位置：/composables/useRequest.ts
type Response = {
  url: string;
  body: any,
  status: number;
  type: string,
  statusText?: string;
  _data?: any;
  headers?: object,
  ok?: boolean,
  redirected?: boolean,
  bodyUsed?: boolean,
};
type ResponseData = {
  code: number,
  msg: string,
  data: object | object[]
}

export const useRequest = async (url: string, options: object) => {
  const router = useRouter();
  const config = useRuntimeConfig();
  //此处是引入了pinia进行状态管理，大家可以根据自己需求进行重写
  //const store = useMainStore();
  console.log("config.public.apiBase",config.public.apiBase);

  const headers = {
    Authorization: 'Bearer ' + (localStorage.getItem('token') || '----------------------'),
  };

  const defaultOptions: object = {
    // ofetch库会自动识别请求地址，对于url已包含域名的请求不会再拼接baseURL
    baseURL: config.public.apiBase,// baseURL也可以在nuxt.config.ts中定义然后此处引入
    headers: headers,
    lazy: false,// 加载路由后是否解析异步函数，而不是阻塞客户端导航（默认为false）
    immediate: true, // 设置为 时false，将阻止立即触发请求。（默认为true）
    pick: ['title'], // handler：仅从函数结果中选取此数组中的指定键
    watch: false, // 观察反应源数组并在它们发生变化时自动刷新获取结果。默认情况下会监视获取选项和 URL。您可以使用 完全忽略无功源watch: false。与此一起immediate: false，这允许完全手动useFetch。

    // 请求拦截
    onRequest({ request, options }: { request: Request, options: object }) {
      console.log("---- 请求拦截 ----", request,options);
      // 设置请求标头
      // options.headers = options.headers || {}
      // options.headers.authorization = '...'
    },

    // 请求错误拦截
    onRequestError({ request, options, error }: { request: Request, options: object, error: Error }) {
      // 处理请求错误
      console.log("---- 处理请求错误 ----", request, options, error );
    },

    // 响应拦截
    onResponse({ request, response, options }: { request: Request, response: Response, options: object }) {
      console.log("---- 响应拦截 ----", request, response, options);
      // 处理响应数据
      // localStorage.setItem('token', response._data.token)
      const res = response._data;
      // 后端返回code=0时弹出错误信息
      if (res.code == 0) {
        console.log(res.msg);
      }

    },

    // 响应错误拦截
    onResponseError({ request, response, options }: { request: Request, response: Response, options: object }) {
      console.warn('---- 响应错误拦截 ----', request, response, options );
      // 处理响应错误
      console.log("response-error", response);
      const res = response._data;
      //后端返回401时导航到登录界面
      if (response.status == 401) {
        router.replace("/login");
        //store.logout()
      }
    },
  };
  const newOptions: object = { ...defaultOptions, ...options };
  //采用element-plus进行请求时的加载
  //const loadingInstance = ElLoading.service({fullscreen:false});
  const { data, pending, error, refresh } = await useFetch(url, newOptions);

  if (!pending.value) {
    //loadingInstance.close();
  }

  /*
  返回值
    data：传入的异步函数的结果。
    pending：一个布尔值，指示是否仍在获取数据。
    refresh/ execute：一个函数，可用于刷新函数返回的数据handler。
    error：如果数据获取失败，则返回错误对象。
    status：指示数据请求状态的字符串（"idle"、"pending"、"success"、"error"）。
    默认情况下，Nuxt 会等到 arefresh完成后才能再次执行。
   */
  return { data, refresh };
};
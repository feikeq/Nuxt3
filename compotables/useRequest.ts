// composables是官方默认的插件目录，官方描述：Nuxt 3使用composables/目录使用auto-imports自动将Vue组合导入到应用中!

//文件位置：/composables/useRequest.ts
type Response = {
    url: string;
    body:any,
    status: number;
    type:string,
    statusText?: string;
    _data?: any;
    headers?:object,
    ok?:boolean,
    redirected?:boolean,
    bodyUsed?:boolean,
  };
  type ResponseData={
    code:number,
    msg:string,
    data:object|object[]
  }
  
  export const useRequest = async (url: string,options:object) => {
    const router = useRouter();
    //此处是引入了pinia进行状态管理，大家可以根据自己需求进行重写
    //const store = useMainStore();
    const host = window.location.hostname;
    const headers = {
      Authorization:'Bearer '+localStorage.getItem('token')||null,
    };
    const defaultOptions:object = {
      //baseURL也可以在nuxt.config.ts中定义然后此处引入
      baseURL: "http://example.com",
      headers: headers,
      watch:false,
      //响应拦截
      onResponse({ response }: { response: Response }) {
        console.log("response", response);
        const res = response._data;
        //后端返回code=0时弹出错误信息，此处采用了element-plus
        if (res.code == 0) {
          ElMessage.error(res.msg);
        }
      },
      //响应错误拦截
      onResponseError({ response }: { response: Response }) {
        console.log("response-error", response);
        const res = response._data;
        //后端返回401时导航到登录界面
        if (response.status == 401) {
          router.replace("/login");
          //store.logout()
        }
      },
    };
    const newOptions:object={...defaultOptions,...options};
    //采用element-plus进行请求时的加载
    //const loadingInstance = ElLoading.service({fullscreen:false});
    const { data, pending,refresh } = await useFetch(url, newOptions);
    if (!pending.value) {
      //loadingInstance.close();
    }
    return {data,refresh};
  };
# Nuxt3

 官网　https://nuxt.com/


## 安装
先决条件
* Node.js - v18.0.0或更新版本
* 文本编辑器 - 我们推荐带有Volar扩展的Visual Studio Code
* 终端 - 为了运行 Nuxt 命令

打开终端输入查看当前版本命令
```
npm -v
8.0.0

node -v
v16.11.0
```

打开终端输入Nuxt3安装命令
```
npx nuxi@latest init <项目名>
```
会提示　需要安装以下软件包：nuxi@latest　可以继续吗？（y）输入 Y 回车就是了。


接下来如果你的node 版本不对的话会提示：当前版本的Node.js（16.11.0）不受支持，可能会导致问题，请升级到兼容的版本>=18.0.0。


### Node.js 的升级和降级
用n升级nodejs（建议使用此方法，npm的版本也会随着node的版本升降）

1. 先清缓存 sudo npm cache clean -f
2. 安装模块 sudo npm install n -g
3. 升级到稳定版 sudo n stable （或指定版或切换 sudo n 18.0.0）


升级成功后再查看版本
```
npm -v
8.6.0 / 10.2.4

node -v     
v18.0.0 / v20.11.0
```

再重新在端输入Nuxt3安装命令




### npm的升级和降级 （建议和node 兼容的版本走）
要升级npm的版本，您可以使用以下命令：
```
sudo npm install -g npm@latest
```

这将安装npm的最新版本，并将其设置为全局安装。这样，您就可以升级到npm的最新版本。

如果您想要降级npm的版本，可以使用以下命令：

```
sudo npm install -g npm@<version>
```

请将`<version>`替换为您希望安装的特定版本号。这将安装指定版本的npm，并将其设置为全局安装。

通过这些命令，您可以轻松地升级或降级npm的版本。 



如果网络连接有关的问题报错
```
npm ERR! code ETIMEDOUT
npm ERR! syscall connect
npm ERR! errno ETIMEDOUT
npm ERR! network request to https://registry.npmjs.org/nuxi failed, reason: connect ETIMEDOUT 104.16.1.35:443
npm ERR! network This is a problem related to network connectivity.
npm ERR! network In most cases you are behind a proxy or have bad network settings.
npm ERR! network 
npm ERR! network If you are behind a proxy, please make sure that the
npm ERR! network 'proxy' config is set properly.  See: 'npm help config'

npm ERR! A complete log of this run can be found in:
npm ERR!     /Applications/MxSrvs/cache/nodejs/_logs/2024-01-18T08_33_57_999Z-debug-0.log
```
这种方式经常DNS污染导致下载会失败
Error: Failed to download template from registry: fetch failed



#### 方法一（最终用这办法初始化的仓库）
可以翻墙或找IP地址，此时执行 ping raw.githubusercontent.com 无法ping通目标地址
通过浏览器输入：
```
https://www.ipaddress.com/site/raw.githubusercontent.com
或
https://ipaddress.com/website/raw.githubusercontent.com
```
找到相应的一个或多个ipv4地，任选一个ipv4地址，并测试该ipv4地址可否ping通
将其中一个ipv4地址添加到 etc\host 文件里并保存看是否能PING通了，不能再换ip。
```
185.199.111.133 raw.githubusercontent.com
```
重新执行安装命令看是否正常执行！不行的话再换个别的 IP


#### 方法二
如在安装Nuxt时遇到了ETIMEDOUT错误。这通常是由于网络连接问题引起的，可能是npm包下载超时导致的。为了解决这个问题，您可以尝试使用npm的淘宝镜像或其他npm镜像源来下载包，以提高下载速度和稳定性。
1. 打开命令行工具（如终端或命令提示符）
2. 输入以下命令，将npm的镜像源设置为淘宝镜像：
   ```
   npm config set registry https://registry.npm.taobao.org
   ```
   这将把npm的默认镜像源切换为淘宝镜像，从而加快包的下载速度。
3. 如果您想要还原回npm的默认镜像源，可以使用以下命令：
   ```
   npm config set registry https://registry.npmjs.org/
   ```
   这会将npm的镜像源切换回官方源。
4. 查看npm镜像设置
    ```
    npm config get registry
    ```
通过这些步骤，您可以轻松地切换npm的镜像源以加快包下载速度。



#### 方法三
如果还是报错Error: Failed to download template from registry: fetch failed  
如果切换到淘宝镜像后仍然无法解决问题，您可以尝试使用cnpm（淘宝镜像的命令行工具）来安装Nuxt。以下是使用cnpm的步骤：

1. 如果您还没有安装cnpm，请先安装cnpm。您可以在命令行中运行以下命令来安装cnpm：
   ```
   npm install -g cnpm --registry=https://registry.npm.taobao.org
   ```

2. 安装完cnpm后，您可以使用cnpm来安装Nuxt。在命令行中运行以下命令：
   ```
   cnpm create-nuxt-app <app-name>
   ```

   请将`<app-name>`替换为您希望创建的Nuxt应用程序的名称。

通过使用cnpm，您可以利用淘宝镜像来加快Nuxt包的下载速度。
如cnpm 还不行请将 DNS 更改为 Google 的（即 8.8.8.8），它应该可以正常工作。如果这不可行，请尝试使用热点，绝对没问题。对于所有面临此问题的非印度人来说，您的互联网提供商也可能存在问题。您不妨更改 DNS，看看是否有效。




#### 方法四
(1)手动克隆模板仓库
其实，从之前我们也知道了，所谓的脚手架实际上就是拉去nuxt项目模板仓库中的文件。
所以我们只需要手动git clone即可。
```
git clone -b v3 https://github.com/nuxt/starter.git nuxt3-app
```
-b 是指定分支，目前最新的nuxt3在v3分支。
或直接手动下载压缩包
从https://raw.githubusercontent.com/nuxt/starter/templates/templates/v3.json 得到
下载地址 https://codeload.github.com/nuxt/starter/tar.gz/refs/heads/v3
然后解压到项目文件夹就可以了，与npx nuxi init得到的最终效果是一致的。







执行　npx nuxi@latest init  　后出现：
```
 WARN  Current version of Node.js (16.11.0) is unsupported and might cause issues. 
       Please upgrade to a compatible version >= 18.0.0.


❯ Which package manager would you like to use?
● npm
○ pnpm
○ yarn
○ bun
```
警告当前版本的Node.js（16.11.0）不受支持，可能会导致问题。
请升级到兼容的版本>=18.0.0。
Which package manager would you like to use?
这是问您希望使用哪个软件包管理器？选npm 就好，然后就开始安装了
```
◐ Installing dependencies...                                                                                     上午11:51:06
⸨⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⠂⸩ ⠇ idealTree:nuxt-app: sill idealTree buildDeps
```

漫长的安装后会提示
```
❯ Initialize git repository?
○ Yes / ● No
```
问您是否要初始化git存储库？No选否就好，这样就安装完成了。


## 使用
### 初始化　
请确保安装依赖项：
```bash
# npm
npm install
```

### 开发
```bash
# npm
npm run dev

# 浏览器窗口应自动打开http://localhost:3000
npm run dev -- -o
```
Nuxt 3.9.3 with Nitro 2.8.1  
启动后就能通过 http://localhost:3000 访问网站

### 生产
生产构建应用程序：
```bash
# npm
npm run build
```
第一次打包构建是Total size: 1.84 MB (442 kB gzip)
当nuxt build使用 Node 服务器预设运行时，结果将是启动准备运行的 Node 服务器的入口点。
```
node .output/server/index.mjs
```  

也可以仅客户端渲染
如果您不想预渲染路由，另一种使用静态托管的方法是在nuxt.config文件中将ssr属性设置为false。然后，npm run generate命令将输出一个.output/public/index.html入口点和JavaScript捆绑包，就像经典的客户端Vue.js应用程序一样。
```
npm run generate
``` 
  

本地预览生产版本：
```bash
# npm
npm run preview
```
查看[部署文档](https://nuxt.com/docs/getting-started/deployment)了解更多信息。





安装 Sass 的依赖。
```bash
npm install -D sass
```
安装完成后，重新启动你的 Nuxt 3 项目。





##　ESLint 设置Linter
1. 安装ESLint 套件
現在我們至 Nuxt 專根目錄下，開始安裝 ESLint 相關套件，當然，你也可以挑自己喜歡的進行配置，不過在這裡選擇以 Nuxt 3 官方提供的 ESLint 設定來做標準配置，並添加支援 Vue 3 的 ESLint 設定。
```
npm install -D eslint @nuxtjs/eslint-config-typescript eslint-plugin-vue
# or
# yarn add -D eslint @nuxtjs/eslint-config-typescript eslint-plugin-vue
```

2. 配置ESLint 设定档
安裝完所需套件後，接下來我們就可以來設定 ESLint，我們在專案根目錄下建立 .eslintrc.js 檔案，
```
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:vue/vue3-recommended'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: [],
  rules: {},
  overrides: [
    {
      files: [
        '**/pages/**/*.{js,ts,vue}',
        '**/layouts/**/*.{js,ts,vue}',
        '**/app.{js,ts,vue}',
        '**/error.{js,ts,vue}'
      ],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
}
```


## Prettier 设置
Prettier是代码格式化的工具，也可以与ESLint进行搭配，ESLint与Prettier就能各司其职将JaveScript与Vue等档案依照配置进行检查与排版。

1. 安装Prettier套件
我们直接安装prettier、eslint-config-prettier与eslint-plugin-prettier三个套件。
```
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
# or
# yarn add -D prettier eslint-config-prettier eslint-plugin-prettier

```

2. 配置Prettier设定档案
我们在项目根目录下建立.prettierrc.js档案，内容如下，这些配置都可以自己设定来配合ESLint，更多选项或说明可以参考Prettier官方说明文件。
```
module.exports = {
   printWidth: 120，//每行文字数量达100字元就换到新的一行
   semi: false，//每个语句的结尾不需要分号
   singleQuote: false，//字串使用单引号，而不是双引号
   trailingComma:“none”，//如Object、Array内的元素不需要尾随逗号
   endOfLine:“auto”，
   vueIndentScriptAndStyle: true
}
```

3. 配置ESLint设定档案
我们在安装时多装了两个ESLint相关套件，分别为eslint-config-prettier及eslint-plugin-prettier。

对此我们需要将其添加至ESLint的.eslintrc.js设定档内，在extends添加字串prettier表示使用eslint-config-prettier扩充配置，主要用来防止Prettier排版与ESLint发生冲突，让其可以用来禁用ESLint的格式化；接着在plugins中添加prettier字串表示使用eslint-plugin-prettier套件扩充，让ESLint可以提示我们格式有错误的地方。

为了让Prettier与ESLint有更好的搭配，在rules的参数中记得添加'prettier/prettier'：'error'让ESLint可以提示Prettier的排版异常提示供我们做修正，至此.eslintrc.js设定档应该会如下。
```
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  },
  overrides: [
    {
      files: [
        '**/pages/**/*.{js,ts,vue}',
        '**/layouts/**/*.{js,ts,vue}',
        '**/app.{js,ts,vue}',
        '**/error.{js,ts,vue}'
      ],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
}
```
4. 安装VS Code的Prettier插件

Prettier - Code formatter：提供我们做代码的格式化，最重要的是来协助我们自动加载.prettierrc.js配置。

安装完毕后，建议重启VS Code来重新载入相关设定。


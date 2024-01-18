# Nuxt3

 官网　https://nuxt.com/


## 安装
先决条件
* Node.js - v18.0.0或更新版本
* 文本编辑器 - 我们推荐带有Volar扩展的Visual Studio Code
* 终端 - 为了运行 Nuxt 命令

打开终端输入查看当前版本命令
```
npm -version
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


用n升级nodejs（建议使用此方法）

1. 先清缓存 sudo npm cache clean -f
2. 安装模块 sudo npm install n -g
3. 升级到稳定版 sudo n stable （或指定版或切换 sudo n 18.0.0）


升级成功后再查看版本
```
npm -version
8.6.0

node -v     
v18.0.0
```

再重新在端输入Nuxt3安装命令

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

可以翻墙或找IP地址，此时执行 ping raw.githubusercontent.com 无法ping通目标地址
通过站长工具查询框中输入：raw.githubusercontent.com，找到相应的一个或多个ipv4地址
https://www.ipaddress.com/site/raw.githubusercontent.com
将其中一个ipv4地址添加到 etc\host 文件里并保存看是否能PING通了，不能再换ip。

如果还不行可以直接下载压缩包(不建议)
下载地址 https://codeload.github.com/nuxt/starter/tar.gz/refs/heads/v3
然后解压到项目文件夹就可以了，与npx nuxi init得到的最终效果是一致的。



(推荐方法2)如在安装Nuxt时遇到了ETIMEDOUT错误。这通常是由于网络连接问题引起的，可能是npm包下载超时导致的。为了解决这个问题，您可以尝试以下几种方法：

1. 检查您的网络连接，确保网络畅通，并且没有阻止npm包下载的防火墙或代理设置。
2. 可以尝试使用npm的淘宝镜像或其他npm镜像源来下载包，以提高下载速度和稳定性。
3. 如果您使用的是VPN，请尝试关闭VPN连接后重新运行安装命令或走VPN连外网。


要使用npm镜像源来加快包下载速度，您可以按照以下步骤进行操作：
1. 打开命令行工具（如终端或命令提示符）。
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
4.　查看npm镜像设置
    ```
    npm config get registry
    ```
通过这些步骤，您可以轻松地切换npm的镜像源以加快包下载速度。




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

通过使用cnpm，您可以利用淘宝镜像来加快Nuxt包的下载速度。希望这能帮助您成功安装Nuxt。如果您需要进一步协助，请随时告诉我！


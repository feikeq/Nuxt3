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
# marked.js（CSS）+ impress.js（PPT） 双模板简历 

## 在线预览
[ 预览传送门 ](http://koras.gitee.io/korains_resume)
## 联系管理员
callME：13370825981

## 使用方法

``` bash
// 下载启动
git clone git@github.com:kora-KR/resume.git
cd resume
npm install
npm run dev

// 配置打包
npm run build
```

## 部署备注


1. 编辑 config/index.js，修改第 10 行的 assetsPublicPath，值为 `项目名/dist`。如果你没有修改项目名 animating-resume，则可跳过此步骤。

2. 编译、上传
    ``` bash
    npm run build
    git add .
    git commit -m "update"
    git push
    ```

3. 开启 GitHub Pages/Gitee Pages 功能


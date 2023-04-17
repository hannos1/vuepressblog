#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd blog/.vuepress/dist

git init
git config user.name 'hannos1'
git config user.email '1972105453@qq.com'
git add -A
git commit -m 'deploy'

git push -f https://github.com/hannos1/vuepressblog.git master:gh-pages

cd -
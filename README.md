# didala
一款基于 TS + React + Hooks + RxJs + Koa2 + MongoDB 实现的 仿滴答清单的全栈应用 http://didala.buynao.com/

### 本地运行

```bash
# clone
git clone https://github.com/buynao/didala.git

# 进入server文件夹，运行服务端
cd /didala/server

# 安装后端所需要的依赖包
npm i

# 请自行下载MongoDB，并开启数据库服务
./bin/mongod

# 启动后端服务，监听本地7001端口
npm run dev
```

```bash
# 进入client文件夹，运行前端端
cd /didala/client

# 安装前端所需要的依赖包
npm i

# 启动前端服务，监听本地1026端口
npm run start
```

### Demo


<img src="https://buynao.oss-cn-beijing.aliyuncs.com/20200406_193852.gif"/>

[http://dida.buynao.com](http://dida.buynao.com)

#### Features

- [x] ToDoList
- [x] 游客模式 - 本地存储
- [x] 注册模式 - 远程存储
- [x] jenkins - 自动化部署 [http://jenkins.buynao.com](http://jenkins.buynao.com)
- [x] 日历模式 - 月
- [ ] 日历模式 - 周
- [ ] 日历模式 - 日
- [ ] lib包裁剪 - rxjs & antd [http://report.buynao.com](http://report.buynao.com)
- [ ] 文本编辑器
- [ ] 标签 & 分享
- [ ] 头像上传 - 上云
- [ ] ServerLess
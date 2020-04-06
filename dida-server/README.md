
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
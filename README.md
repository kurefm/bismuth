# Bismuth
A powerful tools to monitor your network.

## Base

基础工具：
1. nmap             网络扫描与主机发现
2. suricata         IDS入侵检测系统
3. elasticsearch    分布式数据存储
4. kibana           数据可视化
5. python           自动化部署脚本
6. nodejs           服务端基础
7. docker           容器化部署
8. etcd             配置共享和服务发现
9. virtualbox       用于测试部署
10. vagrant          虚拟机管理工具，用于快速部署虚拟环境进行测试

python packages:
1. fabric           自动化部署

node modules:
1. express          WEB框架
2. pm2              进程管理
3. inversify        依赖注入
4. inversify-express-utils
5. winston          日志
6. gulp             JavaScript构建工具

gulp.js plugins:
1. gulp-typescript  编译typescript
2. gulp-tslint      检查typescript语法
3. gulp-uglify      压缩javascript
4. gulp-size

前端框架：
1. ember.js


## Project Structure

1. Host Scaner Agent - 主机发现代理，用于控制nmap，获取网络内主机的信息
2. IDS Agent         - IDS代理，用于控制suricata
3. Manager System    - 管理系统，用于配置代理、管理和监控代理


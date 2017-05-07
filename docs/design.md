# 系统设计

## 如何实现分布式
系统分为2部分：
1. `agent`（代理），分为`hs`（主机扫描）和`ids`（入侵检测系统）的代理，用于部署到网络中收集数据
2. `node`（节点）用于管理代理和查看数据

`agent`和`node`均可以部署多个节点，以实现不同网断的监控和提高可用性。

`agent`与`node`之间不存在任何依赖，所有的数据都存储于以`elasticsearch`为基础构建分布式存储中。

## 系统结构

1. `hs agent`使用`nmap`来采集数据
2. `ids agent`使用`suricata`来采集数据
3. 所有的逻辑使用javascript编写，运行于node上

## 系统做的事情

1. `hs agent`使用`nmap`采集数据并存储到`elasticsearch`中
2. `ids agent`使用`suricata`采集数据并存储到`elasticsearch`中
3. `node`从`elasticsearch`中读取数据并聚合分析
4. 系统中的所有部分均可运行于docker上

## 最终效果
使用虚拟机构建局域网，部署系统，系统将能够发现如下行为
1. 当有主机加入网络时能被发现
2. 能发现使用工具攻击网络内的系统时的行为


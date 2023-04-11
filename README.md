# vue-admin-template

English | [简体中文](./README-zh.md)

> A minimal vue admin template with Element UI & axios & iconfont & permission control & lint

**Live demo:** http://panjiachen.github.io/vue-admin-template


**The current version is `v4.0+` build on `vue-cli`. If you want to use the old version , you can switch branch to [tag/3.11.0](https://github.com/PanJiaChen/vue-admin-template/tree/tag/3.11.0), it does not rely on `vue-cli`**

<p align="center">
  <b>SPONSORED BY</b>
</p>
<p align="center">
   <a href="https://finclip.com?from=vue_element" title="FinClip" target="_blank">
      <img height="200px" src="https://gitee.com/panjiachen/gitee-cdn/raw/master/vue%E8%B5%9E%E5%8A%A9.png" title="FinClip">
   </a>
</p>

## Build Setup

```bash
# clone the project
git clone https://github.com/PanJiaChen/vue-admin-template.git

# enter the project directory
cd vue-admin-template

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

commit ae23ee1533c235d90c55ba6d67e3be94bc84f652 (HEAD -> master)
Author: dc <1304561865@qq.com>
Date:   Mon Apr 10 23:42:03 2023 +0800

    完成新增部门功能-建立组件

commit 0e0e5ad5db9f22a81aec3b20e1a2c5c0a1b82379 (origin/master, origin/HEAD)
Author: dc <1304561865@qq.com>
Date:   Fri Apr 7 15:46:34 2023 +0800

    完成删除部门功能实现

commit 969384a74992417a10aec574c6b292fd15c9f7d4
Author: dc <1304561865@qq.com>
Date:   Fri Apr 7 15:37:02 2023 +0800

    完成获取组织架构数据，并进行树形处理

commit 4423c4a8abe22c98b8073d7b2b40e7e5704d3951
Author: dc <1304561865@qq.com>
Date:   Thu Apr 6 17:57:03 2023 +0800

    完成将树形内容单独抽提组件,并解决named Route 'social' has a default child route.这个vue-router报错

commit d459c946ec0ac4e6cda798c751d94ca65df8619e
Author: dc <1304561865@qq.com>
Date:   Wed Apr 5 23:36:26 2023 +0800

    完成组织架构树形结构的显示(补充修改)

commit c6ada8a69b818a56b05a742d538a32b08732bc2e
Author: dc <1304561865@qq.com>
Date:   Sat Apr 1 23:46:43 2023 +0800

    完成组织架构树形结构的显示

commit c61d813eeb632cc8b4e7ec30c4e9f63253b4df84
Author: dc <1304561865@qq.com>
Date:   Fri Mar 31 01:04:56 2023 +0800

    完成理解左侧菜单的生成逻辑，并设置左侧菜单的图标

commit 090a647a49e6e81e321b4be53334e7f156fada39
Author: dc <1304561865@qq.com>
Date:   Fri Mar 31 00:29:46 2023 +0800

    将静态路由和动态路由临时合并，形成左侧菜单

commit 94fd11d69ff0b3366403951869deabeb93e8f9b9
Author: dc <1304561865@qq.com>
Date:   Fri Mar 31 00:27:06 2023 +0800

    完成其他模块的页面和路由的快速搭建

commit 2e471eb609202c321742711eaff646efb24a2540
Author: dc <1304561865@qq.com>
Date:   Thu Mar 30 10:18:38 2023 +0800

    完成业务路由页面的整理

commit f61f0bd357160451963cdff69b56fa82ea5eb2e6
Author: dc <1304561865@qq.com>
Date:   Wed Mar 29 00:12:03 2023 +0800

    完成Token失效的被动处理

commit 0783dabec4948355658f3fe69acdf9087b68fda1
Author: dc <1304561865@qq.com>
Date:   Wed Mar 29 00:08:51 2023 +0800

    完成token超时的主动介入

commit 1142480b10e102a61a504fd6b6ac2b14792cbb6f
Author: dc <1304561865@qq.com>
Date:   Tue Mar 28 23:47:17 2023 +0800

    完成实现登出功能

commit dfdc4ae62868e4bf2cbdcb70e44843af3d58c737
Author: dc <1304561865@qq.com>
Date:   Tue Mar 28 23:37:22 2023 +0800

    完成实现一个自定义指令，解决图片加载异常的问题

commit 3483da1d4658002ef94667c2ac095ca141fe83c0
Author: dc <1304561865@qq.com>
Date:   Tue Mar 28 23:07:48 2023 +0800

    完成实现权限拦截处调用获取资料action

commit ec3f43b6c6eeff3ad1123b6490ae24b4a38e6b9e
Author: dc <1304561865@qq.com>
Date:   Sun Mar 26 23:28:27 2023 +0800

    完成封装获取用户资料的action并共享用户状态

commit 1f6896d947ea83f2d7df1e7c056d1d99440d0a94
Author: dc <1304561865@qq.com>
Date:   Sat Mar 25 23:35:30 2023 +0800

    完成设置设置头部内容的布局和样式

commit 71371cfadae85ae479d8f243815656c7af8761df
Author: dc <1304561865@qq.com>
Date:   Sat Mar 25 23:08:00 2023 +0800

    完成主页的左侧导航样式

commit 901d7acf8737ccea50df32a90cf348d60a7f0506
Author: dc <1304561865@qq.com>
Date:   Sat Mar 25 22:42:03 2023 +0800

    完成主页中根据有无token，进行页面访问的处理

commit d1f67b3cab2d7abbca3b57f886f11ca0094b4956
Author: dc <1304561865@qq.com>
Date:   Thu Mar 23 23:24:11 2023 +0800

    完成1.完成request环境变量和异常的处理.2.登录页面调用登录action，处理异常

commit 107cf7d8fe04d0deb5d9be4ff6062cdc6c02d8be
Author: dc <1304561865@qq.com>
Date:   Wed Mar 22 23:45:52 2023 +0800

    完成封装Vuex的登录Action并处理token

commit 53af701d5f0438c3ba8ea96e2ea4bf676ac88030
Author: dc <1304561865@qq.com>
Date:   Tue Mar 21 23:00:28 2023 +0800

    完成封装单独的登录接口

commit bb3314f61203407979103a0e8043da95b7c1451e
Author: dc <1304561865@qq.com>
Date:   Tue Mar 21 22:48:50 2023 +0800

    配置完成vue-cli的方向代理,实现后端接口的跨域访问

commit 13893ce008f8b225fd84cebbe6fe7c1e235f99f6
Author: dc <1304561865@qq.com>
Date:   Tue Mar 21 13:00:54 2023 +0800

    完成登录用户的手机号和密码校验

commit ef7658c3c48bad7882e758f3acd1eff377ad8ca9
Author: dc <1304561865@qq.com>
Date:   Tue Mar 21 12:41:25 2023 +0800

    完成登录首页的基本布局

commit 6aa95a4cfc6511d9f60c372571760aa4eaedbe68
Author: dc <1304561865@qq.com>
Date:   Tue Mar 21 10:31:50 2023 +0800

    完成网站的开发服务端口设置和网站名称设置

commit 0f60b5695c39ebc27fdbf9530e7e9098b61fd0ac
Author: dc <1304561865@qq.com>
Date:   Tue Mar 21 10:30:05 2023 +0800

    完成网站的开发服务端口设置和网站名称设置

commit 37a403630defd64f4eb2aac517bafaae3faf01f3
Author: dc <1304561865@qq.com>
Date:   Fri Mar 17 23:06:01 2023 +0800

    完成项目所开发前所需要的删减的添加

commit b3fd38221ca4700f7781caf7fdf54ecfc4bb2265
Author: dc <1304561865@qq.com>
Date:   Thu Mar 16 22:00:27 2023 +0800

    人资项目初始化
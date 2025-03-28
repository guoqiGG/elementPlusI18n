# Vue 3 + Vite + Js + aos + Mockjs

### 本仓库主要演示了，如何使用Vue3 + Vite + Js + aos + Mockjs 来实现一个简单的动画网站  
描述：vue + animate.js + wowjs 无法实现我们想要得到的效果(基于原生js,而我们使用的是vue单文件组件)，经过一番查找，发现了aos库，于是便开始了探索

#### 使用教程  

1. npm install 安装依赖 aos库  npm install aos@next --save  
2. 在main.js中引入asos库和css文件,并初始化。

   ```
   import Aos from 'aos';
   import 'aos/dist/aos.css';
   Aos.init();
    ```

3. 在组件中使用aos库，在需要使用动画的元素上添加data-aos="fade-up"属性，即可实现向上淡入的动画效果。

   ```
      <div style="height:500px;" v-for="(item, index) in data" :key="index" data-aos="fade-up">
      <div>
        <span>{{ item.id }}</span
        ><span>{{ item.name }}</span
        ><span>{{ item.age }}</span
        ><span>{{ item.address }}</span>
      </div>
    </div>
   ```

更多动画效果可以参考aos库的官方文档。  
git仓库地址：https://github.com/michalsnik/aos   
演示网站：https://michalsnik.github.io/aos/  
官网：https://www.drupal.org/project/aosjs

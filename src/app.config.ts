export default defineAppConfig({
  pages: [
    // "pages/login/index",
    "pages/index/index",
    "pages/search/index",
    "pages/classfiy/index",
    "pages/essayInfo/index",
    "pages/mapDepot/index",
    "pages/love/index",
    "pages/about/index",
    "pages/love/view/story/index",
    "pages/love/view/loveList/index",
    "pages/about/view/relief/index",
    "pages/about/view/contact/index",
  ],
  tabBar: {
    color: "#9c9d9e",
    selectedColor: "#0089ff",
    backgroundColor: "#fff",
    borderStyle: "black",
    custom: false,
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "assets/image/tabs/shouye-shouye.png",
        selectedIconPath: "assets/image/tabs/shouye.png",
      },
      {
        pagePath: "pages/mapDepot/index",
        text: "图库",
        iconPath: "assets/image/tabs/fenlei.png",
        selectedIconPath: "assets/image/tabs/fenlei1.png",
      },
      {
        pagePath: "pages/love/index",
        text: "和她",
        iconPath: "assets/image/tabs/31wode.png",
        selectedIconPath: "assets/image/tabs/wode-.png",
      },
      {
        pagePath: "pages/about/index",
        text: "我的",
        iconPath: "assets/image/tabs/31wode.png",
        selectedIconPath: "assets/image/tabs/wode-.png",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
    navigationStyle: "custom", // 自定义头部
  },
  usingComponents: {
    // 定义需要引入的第三方组件
    // 1. key 值指定第三方组件名字，以小写开头
    // 2. value 值指定第三方组件 js 文件的相对路径
    parcer: "./components/mp-htmlwx",
    // skeleton: "./sckeleton/index/skeleton",
    // nabar: "./sckeleton/index/taroConvert/navbar",
  },
});
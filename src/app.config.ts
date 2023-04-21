export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/index/view/search/index",
    "pages/index/view/classfiy/index",
    "pages/index/view/essayInfo/index",
    "pages/love/index",
    "pages/love/view/mapDepot/index",
    "pages/love/view/story/index",
    "pages/love/view/loveList/index",
    "pages/about/index",
    "pages/about/view/relief/index",
    "pages/about/view/contact/index",
    "pages/ai/index",
    "pages/ai/view/aiSearch/index",
    "pages/fund/index",
    "pages/fund/view/info/index",
    "pages/fund/view/rank/index",
    "pages/fund/view/search/index",
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
        pagePath: "pages/ai/index",
        text: "intellect",
        iconPath: "assets/image/tabs/jiqiren.png",
        selectedIconPath: "assets/image/tabs/jiqiren1.png",
      },
      {
        pagePath: "pages/fund/index",
        text: "基金",
        iconPath: "assets/image/tabs/jijin.png",
        selectedIconPath: "assets/image/tabs/jijin_1.png",
      },
      {
        pagePath: "pages/love/index",
        text: "和她",
        iconPath: "assets/image/tabs/aixin.png",
        selectedIconPath: "assets/image/tabs/aixin_1.png",
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
    "ec-canvas": "./components/ec-canvas/ec-canvas",

    // skeleton: "./sckeleton/index/skeleton",
    // nabar: "./sckeleton/index/taroConvert/navbar",
  },
});

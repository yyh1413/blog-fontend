import Taro from "@tarojs/taro";

const loveList = [
  {
    icon: require("../assets/image/main/riji.svg"),
    titile: "关于我们",
    dec: "我们一起度过的那些经历",
    onclick: () => {
      Taro.navigateTo({ url: "/pages/love/view/story/index" });
    },
  },
  {
    icon: require("../assets/image/main/qingdan.svg"),
    titile: "恋爱清单",
    dec: "你我直接的约定我们都在努力",
    onclick: () => {
      Taro.navigateTo({ url: "/pages/love/view/loveList/index" });
    },
  },
  { icon: "", titile: "关于我们", dec: "我们一起度过的那些经历" },
];

const story = `
    男孩和女孩初恋的时候
  男孩为女孩折了一千只纸鹤﹐挂在女孩的房间里。男孩对女孩说﹐这一千只纸鹤﹐代表我一千份心意。
  那时候﹐男孩和女孩分分秒秒都在感受着恋爱的甜蜜和幸福。
  11111
  22222
  33333`;

const protraitN =
  "https://img2.woyaogexing.com/2023/03/18/0057019027811f0dfc4a8a5dce92ea4e.jpeg";

const protraitW =
  "https://img2.woyaogexing.com/2023/03/18/82c01a6b1036e2237199fbb9bd9c155a.jpeg";

const contact = [
  {
    name: "企鹅",
    icon: require("../assets/image/main/QQ.svg"),
    num: "1429753073",
  },
  {
    name: "微信",
    icon: require("../assets/image/main/weixin.svg"),
    num: "KxYh12060920",
  },
  {
    name: "博客网址",
    icon: require("../assets/image/main/wangzhan.svg"),
    num: "yangyuhao.cn",
  },
  {
    name: "邮箱网址",
    icon: require("../assets/image/main/youxiang.svg"),
    num: "17645221413@163.com",
  },
];

const menulist = [
  { id: 0, text: "全部" },
  { id: 1, text: "最新文章" },
  { id: 2, text: "热门文章" },
  { id: 3, text: "最近更新" },
  { id: 4, text: "最大点赞" },
];
export default {
  loveList,
  story,
  protraitN,
  protraitW,
  contact,
  menulist,
};

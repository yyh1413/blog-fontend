import Taro from "@tarojs/taro";

const loveList = [
  {
    icon: require("../assets/image/main/women.svg"),
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
  {
    icon: require("../assets/image/main/zhaopian.svg"),
    titile: "我们的照片",
    dec: "我们一起经历的点点滴滴",
    onclick: () => {
      Taro.navigateTo({ url: "/pages/love/view/mapDepot/index" });
    },
  },
];
const inventoryList = [
  {
    title: "偷偷记录对方熟睡的模样",
    dec: "偷偷记录对方熟睡的模样偷偷记录对方熟睡的模样",
    time: "2022-6-1",
    endtime: "2022-6-1",
    state: 1,
  },
  {
    title: "一起制定一份旅行计划",
    dec: "确定旅行的目的地和时间，然后制定旅行计划，包括交通方式、食宿安排、景点推荐等。在旅行前，可以一起购买必要的物品和准备行程。旅行中，可以共同探索当地的文化和美食，留下美好的回忆",
    time: "2022-5-22",
    endtime: "2022-5-22",
    state: 1,
  },
  {
    title: "一起观看电影、剧集、体育比赛等娱乐活动，分享彼此的兴趣和喜好",
    dec: "首先确定观看的电影、剧集、体育比赛等类型和时间，可以在网络上进行搜寻和推荐。然后选择合适的场地和设备，一起观看并分享自己的感受和喜好",
    time: "2022-2-8",
    endtime: "2022-2-8",
    state: 1,
  },
  {
    title: "一起爬山，感受大自然的美妙和挑战",
    dec: "首先确定爬山的目的地和难度，选择适合自己的爬山路线。然后准备必要的装备和食品，并安排好出发时间和交通方式。在爬山中，可以互相鼓励和支持，一起克服困难和挑战，感受大自然的美妙和壮观",
    time: "2022-8-2",
    endtime: "2022-8-2",
    state: 1,
  },

  {
    title: "一起学习一门新技能或兴趣，例如学习一门语言、学习做饭、学习绘画",
    dec: "首先确定学习的目标和计划，例如每周学习一次、学习时间和地点等。然后选定合适的教材和教师，进行学习。在学习过程中，可以相互鼓励和帮助，互相交流心得和体会",
    time: "待定",
    endtime: "待定",
    state: 0,
  },
  {
    title: "一起参加某个健身或运动项目，例如每周一起去打篮球、一起去健身房锻炼",
    dec: "首先确定健身或运动项目的类型和目标，例如塑身、增肌、减肥等。然后安排每周的运动计划和时间，选择合适的场地和设备。在运动中，可以相互监督和鼓励，互相帮助和提高",
    time: "待定",
    endtime: "待定",
    state: 0,
  },
  {
    title: "一起规划未来，讨论未来的生活目标和计划，例如住房、工作、家庭等",
    dec: "首先确定未来的生活目标和计划，例如购房、升职、结婚等。然后共同讨论实现这些目标的具体计划和步骤，例如储蓄、提升技能、寻找合适的工作等。在规划未来的过程中，可以相互支持和帮助，共同追求美好生活",
    time: "待定",
    endtime: "待定",
    state: 0,
  },
  {
    title: "一起进行户外运动，例如骑行、徒步、露营等，感受大自然的美妙和挑战",
    dec: "首先确定户外运动的类型和路线，选择适合自己的运动方式。然后准备必要的装备和食品，并安排好出发时间和交通方式。在户外运动中，可以互相鼓励和支持，一起克服困难和挑战，感受大自然的美妙和壮观",
    time: "待定",
    endtime: "待定",
    state: 0,
  },
];
const story = `
小羊和橙砸从小就认识，在相处的过程中，他们渐渐地产生了感情。
第一次约会，小羊带着橙砸去看了一场浪漫的电影。他们一起分享了电影中的感动和情节，彼此的心也逐渐靠近。电影结束后，他们一起走出电影院，一路上聊着天，享受着夜色。当小羊送橙砸回家的时候，他们不舍地道别，彼此的眼神中充满了对未来的期待和美好的祝福。
从那以后，小羊和橙砸开始了甜蜜的恋爱生活。他们一起旅行、一起看电影、一起逛街，分享彼此的喜怒哀乐。他们彼此成为了最好的朋友，也成为了彼此的依靠和支持。
尽管他们毕业后选择了不同的职业道路，但他们的感情依然坚定不移。他们互相支持和鼓励，一起成长，一起面对人生中的挑战和困难。
他们经历了许多美好的时光，也经历了许多挫折和困难。但是他们相互信任、相互理解，一起克服了所有困难，一起迎接了生命中的每一个挑战。他们的爱情历经了时间的考验，越来越坚强，越来越美好。
现在，小羊和橙砸幸福的在一起，他们的爱情故事将会一直延续下去，直到永远。
`;

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

const holdCode = [
  { FCODE: "165525" },
  { FCODE: "110018" },
  { FCODE: "485011" },
  { FCODE: "003095" },
  { FCODE: "320007" },
  { FCODE: "161725" },
  { FCODE: "004945" },
  { FCODE: "519702" },
  { FCODE: "501057" },
];
const mangerCode = [
  { FCODE: "30657417" },
  { FCODE: "30198031" },
  { FCODE: "30040544" },
  { FCODE: "30042957" },
  { FCODE: "30608901" },
  { FCODE: "30189744" },
  { FCODE: "30324814" },
  { FCODE: "30541469" },
  { FCODE: "30358212" },
  { FCODE: "30189737" },
  { FCODE: "30040539" },
  { FCODE: "30441407" },
];
export default {
  mangerCode,
  holdCode,
  loveList,
  story,
  protraitN,
  protraitW,
  contact,
  menulist,
  inventoryList,
};

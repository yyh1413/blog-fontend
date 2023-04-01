interface IEssay {
  _id: string;
  title: string;
  picture: string;
  readingVolume: number;
  likeNumber: number;
  wordNumber: number;
  commentsNumber: number;
  classfiy: [];
  label: [];
  content: string;
  userId: number;
  userName: string;
  createTime: string;
  updateTime: string;
  remark: string;
}

interface IClassfiy {
  classfiyName: string;
  fileName: string;
  path: string;
  active?: boolean;
}
export { IEssay, IClassfiy };

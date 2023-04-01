import configStore from './store/store'
import { Provider} from "react-redux";
import './app.scss'
import Taro from '@tarojs/taro';
import 'taro-skeleton/dist/index.css' // 引入组件样式

const store = configStore();
function App(props: any) {
  
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}
// }

export default App;
// class App extends Component {

//     // this.props.children 是将要会渲染的页面
//     render() {

//     }
// }
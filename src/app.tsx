import configStore from './store/store'
import { Provider } from "react-redux";
import './app.scss'
import 'taro-skeleton/dist/index.css' // 引入组件样式

const store = configStore();
function App(props: any) {
    console.log(process.env.NODE_ENV);
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}

export default App;

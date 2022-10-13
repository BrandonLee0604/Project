import {Component} from "react";
import { Input } from 'antd';

const { Search } = Input;

class TopHeader extends Component<any, any> {
    render() {
        return (
            <div>
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    loading={false}
                    style={{width: "50%", padding: "10px 10px"}}
                />
            </div>
        );
    }
}

export default TopHeader;
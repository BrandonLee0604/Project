import React, { Component } from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Home', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('Option 3', '3', <ContainerOutlined />),
];


class SiderMenu extends Component<any, { collapsed: Boolean }> {
    constructor(props: any) {
        super(props);
        this.state={
            collapsed: false
        }
    }

    toggleCollapsed = () => {
        const tempCollapsed = this.state.collapsed;
        this.setState({collapsed: !tempCollapsed});
    };

    render() {
        return (
            <div>
                {/*<Button type="primary" onClick={this.toggleCollapsed} >*/}
                {/*    {this.state.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}*/}
                {/*</Button>*/}
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    // collapsed={this.state.collapsed}
                    items={items}
                />
            </div>
        )
    }
}

export default SiderMenu;
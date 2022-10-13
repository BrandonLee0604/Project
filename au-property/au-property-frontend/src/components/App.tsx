import React, { Component } from 'react';
import { Layout } from 'antd';
import SiderMenu from "./SiderMenu";
import TopHeader from "./TopHeader";
import ContentComponent from "./ContentComponent";
import '../index.css';
const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  render() {
    return (
        <div className="App">
            <Layout>
                <Sider>
                    <SiderMenu />
                </Sider>
                <Layout>
                    <Header>
                        <TopHeader />
                    </Header>
                    <Content>
                        <ContentComponent />
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    );
  }
}

export default App;

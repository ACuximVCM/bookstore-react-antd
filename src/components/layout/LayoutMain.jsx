import { ReadOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Divider, Form, Layout, Menu, theme } from 'antd';
import React from 'react';
import FormBook from '../../FormBook';
import { FormAuthor } from '../form/FormAuthor';
import Navbar from './Navbar';
const { Header, Content, Footer, Sider } = Layout;
const LayoutMain = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    
    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log('BreakPoint')
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log('Collapsed')
                    console.log(collapsed, type);
                }}
            >
                <div className="logo" />
                <Navbar />
                {/* Menu de navegacion */}
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                    {
                        key: '/books',
                        icon: <ReadOutlined />,
                        label: 'Libros',
                        onclick: setview('/books'),
                    },
                    {
                        key: 2,
                        icon: <UserOutlined />,
                        label: 'Autores',
                        onclick: setview('/authors')
                    }
                ]}

                    //   items={[ReadOutlined, UserOutlined].map(
                    //     (icon, index) => ({
                    //       key: String(index + 1),
                    //       icon: React.createElement(icon),
                    //       label: ` ${index + 1}`,
                    //       onClick: (() => )
                    //     }),
                    //   )}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '24px 16px 0',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >

                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >

                </Footer>
            </Layout>
        </Layout>
    );
};
export default LayoutMain;

{/* <Row style={{ height: '100%', margin: '0', padding: '0'}}>
                <Col style={{ width: '100%' }}>
                    <Row style={{ background: '#FCA694', height: '20%' }}>
                        <Col>
                        </Col>
                    </Row>

                    <Row style={{ height: '80%' }}>
                        <Col span={6} style={{ background: '#ACEDF1' }}>

                        </Col>
                        <Col span={18} style={{ background: '#F1ACD2' }}>
                            <App/>
                        </Col>
                    </Row>
                </Col>
    </Row> */}
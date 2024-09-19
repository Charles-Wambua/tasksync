import React from 'react';
import { Layout, Dropdown, Menu } from 'antd';
import { MenuOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Header } = Layout;

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();

    console.log('Logging out');
  };

  const handleMenuClick = (e) => {
    console.log('Menu item clicked:', e);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <Link to="/">Fill Form</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/records">Form and Options</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header
        className="site-layout-background"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        <div style={{ color: '#fff', fontSize: '24px' }}>
          TaskSync
        </div>
        <Dropdown overlay={menu} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <MenuOutlined style={{ fontSize: '24px', color: '#fff' }} />
          </a>
        </Dropdown>
        <div>
          <a onClick={handleLogout} style={{ color: '#fff', fontSize: '16px' }}>
            <LogoutOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
            Logout
          </a>
        </div>
      </Header>
    </Layout>
  );
};

export default NavBar;

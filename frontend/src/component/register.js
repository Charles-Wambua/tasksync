import React from 'react';
import { Breadcrumb, Layout, Button, Form, Input, message, theme } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const { Content, Footer } = Layout;

const Register = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:4000/user/register', values);
      message.success('Registration successful');
      navigate('/login');
    } catch (error) {
      message.error('Registration failed. Please try again.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Registration failed. Please check your input.');
  };

  return (
    <Layout>
      <Content
        style={{
          padding: '0 16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 128px)',
        }}
      >
        <div
          style={{
            padding: '24px',
            width: '100%',
            maxWidth: '400px',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
              textAlign: 'center',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Register</Breadcrumb.Item>
          </Breadcrumb>
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form.Item>

            <Form.Item>
              <span>
                Already registered? <Link to="/login">Sign In here</Link>
              </span>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©{new Date().getFullYear()} by Charles</Footer>
    </Layout>
  );
};

export default Register;

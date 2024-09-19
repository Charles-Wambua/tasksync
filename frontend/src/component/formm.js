import React, { useEffect, useState } from 'react';
import { Layout, Breadcrumb, Form, Input, Button, Space, notification, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content, Footer } = Layout;

const UserForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      if (update.type === 'NEW_RECORD') {
        console.log('New record received:', update.payload);
        notification.info({
          message: 'New Record',
          description: `A new record has been added: ${update.payload.first_name} ${update.payload.last_name}`,
        });
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
    return () => {
      ws.close();
    };
  }, []);

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (response.ok) {
        form.resetFields();
        navigate("/records");
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({
            type: 'NEW_RECORD',
            payload: result, 
          }));
        }
      } else {
        throw new Error(result.message || 'Error sending information');
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.message,
      });
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Layout>
      <Content
        style={{
          padding: '0 48px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 128px)',
        }}
      >
        <div
          style={{
            padding: 24,
            width: 600, 
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
            <Breadcrumb.Item>User Form</Breadcrumb.Item>
          </Breadcrumb>
          <Form
            name="user-form"
            form={form}
            onFinish={onFinish}
            style={{ maxWidth: '100%' }}
          >
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please input a description!' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Space style={{ width: '100%', justifyContent: 'center' }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        ©{new Date().getFullYear()} by Charles
      </Footer>
    </Layout>
  );
};

export default UserForm;

import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Spin, Alert, Modal, Form, Input, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
// This React component displays a table of records, managing data fetching, editing, and deleting operations with Axios; it utilizes WebSockets to listen for real-time updates, updating the state and notifying users when records are added, modified, or deleted, while incorporating a modal for editing record details and providing loading and error handling states.


const RecordsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000'); 
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);
        handleWebSocketUpdate(update);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = (event) => {
      console.log(event.wasClean ? 'WebSocket connection closed cleanly' : 'WebSocket connection closed unexpectedly');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    return () => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/records');
        setData(response.data);
      } catch (error) {
        setError('Error fetching records');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleWebSocketUpdate = (update) => {
    switch (update.type) {
      case 'NEW_RECORD':
        setData((prevData) => [...prevData, update.payload]);
        notification.info({
          message: 'New Record Added',
          description: `A new record has been added: ${update.payload.first_name} ${update.payload.last_name}`,
        });
        break;
      case 'UPDATE_RECORD':
        setData((prevData) =>
          prevData.map((item) =>
            item.id === update.payload.id ? { ...item, ...update.payload } : item
          )
        );
        notification.success({
          message: 'Record Updated',
          description: `Record with ID ${update.payload.id} has been updated.`,
        });
        break;
      case 'DELETE_RECORD':
        setData((prevData) =>
          prevData.filter((item) => item.id !== update.payload.id)
        );
        notification.success({
          message: 'Record Deleted',
          description: `Record with ID ${update.payload.id} has been successfully deleted.`,
        });
        break;
      default:
        console.warn('Unknown update type:', update.type);
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/records/${id}`);
      if (socket) {
        socket.send(JSON.stringify({ type: 'DELETE_RECORD', payload: { id } }));
      }
    } catch (error) {
      notification.error({ message: 'Error', description: 'Error deleting record' });
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`http://localhost:4000/api/records/${editingRecord.id}`, values);
      if (socket) {
        socket.send(JSON.stringify({ type: 'UPDATE_RECORD', payload: { id: editingRecord.id, ...values } }));
      }
      setData(data.map((item) => (item.id === editingRecord.id ? { ...item, ...values } : item)));
      setIsModalVisible(false);
      setEditingRecord(null);
    } catch (error) {
      notification.error({ message: 'Error', description: 'Error updating record' });
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
    { title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  if (loading) return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Records</h2>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }} 
      />

      <Modal
        title="Edit Record"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: 'Please input the first name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: 'Please input the last name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input a description!' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RecordsTable;

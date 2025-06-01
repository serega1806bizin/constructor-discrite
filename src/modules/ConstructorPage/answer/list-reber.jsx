import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Button,
  Card,
  InputNumber,
  Space,
  Typography,
  Divider,
  Form,
} from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const List_reber = ({ onChange, fieldName }) => {
  const [nodes, setNodes] = useState([{ id: 1, x1: '', x2: '' }]);

  // Передача данных наверх через onChange
  useEffect(() => {
    onChange({
      answer: nodes.map(node => [Number(node.x1), Number(node.x2)]),
    });
  }, [nodes, onChange]);

  const addNode = () => {
    setNodes([...nodes, { id: nodes.length + 1, x1: '', x2: '' }]);
  };

  const removeNode = id => {
    if (nodes.length === 1) {
      return; // Не удаляем, если остался один элемент
    }

    const updatedNodes = nodes
      .filter(node => node.id !== id)
      .map((node, index) => ({ ...node, id: index + 1 }));

    setNodes(updatedNodes);
  };

  const updateNode = (id, key, value) => {
    setNodes(
      nodes.map(node => (node.id === id ? { ...node, [key]: value } : node)),
    );
  };

  return (
    <Form.Item
      label="Список:"
      name={fieldName}
      rules={[{ required: true, message: 'Заповніть список ребер' }]}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <Card style={{ marginTop: 20, width: 400 }}>
        <Divider>Додайте очікувані вузли</Divider>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {nodes.map(node => (
            <Space
              key={node.id}
              align="center"
              style={{
                display: 'flex',
                justifyContent: 'center', // Центрируем элементы
                gap: 10, // Небольшие отступы между элементами
                border: '1px solid #f0f0f0',
                borderRadius: 5,
                padding: 8,
                backgroundColor: '#fff',
                textAlign: 'center', // Центрируем текст внутри
              }}
            >
              <Text style={{ minWidth: 70, marginRight: 10 }}>
                U<sub>{node.id}</sub> | (X
              </Text>

              <InputNumber
                value={node.x1}
                min={0}
                placeholder="1"
                onChange={value => updateNode(node.id, 'x1', value)}
                controls={false}
                style={{
                  marginRight: 10,
                  width: 40,
                }}
                onFocus={e => e.target.select()} // Выделение при фокусе
              />

              <Text style={{ marginRight: 5 }}> , X </Text>
              <InputNumber
                value={node.x2}
                min={0}
                placeholder="1"
                onChange={value => updateNode(node.id, 'x2', value)}
                controls={false}
                style={{
                  marginRight: 10,
                  width: 40,
                }}
                onFocus={e => e.target.select()} // Выделение при фокусе
              />
              <Text>)</Text>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                danger
                onClick={() => removeNode(node.id)}
                disabled={nodes.length === 1}
                style={{
                  padding: 0,
                  height: 20,
                }}
              />
            </Space>
          ))}
        </Space>
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
        >
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={addNode}
            style={{ width: '50%' }}
          >
            Додати вузол
          </Button>
        </div>
      </Card>
    </Form.Item>
  );
};

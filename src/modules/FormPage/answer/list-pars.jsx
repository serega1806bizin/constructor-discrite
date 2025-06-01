import { useState, useEffect } from 'react';
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
import Paragraph from 'antd/es/typography/Paragraph';
import { QuestionImages } from './QuestionImages';

const { Text } = Typography;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const List_pars = ({ question, onChange, index1 }) => {
  const [pairs, setPairs] = useState([{ id: 1, first: '0', second: '0' }]);

  // Передаём данные наверх через onChange: ответ формируется как массив пар чисел
  useEffect(() => {
    onChange({
      answer: pairs.map(pair => [Number(pair.first), Number(pair.second)]),
    });
  }, [pairs, onChange]);

  const addPair = () => {
    setPairs([...pairs, { id: pairs.length + 1, first: '', second: '' }]);
  };

  const removePair = id => {
    if (pairs.length === 1) {
      return; // Не удаляем, если осталась одна пара
    }

    const updatedPairs = pairs
      .filter(pair => pair.id !== id)
      .map((pair, index) => ({ ...pair, id: index + 1 }));

    setPairs(updatedPairs);
  };

  const updatePair = (id, key, value) => {
    setPairs(
      pairs.map(pair => (pair.id === id ? { ...pair, [key]: value } : pair)),
    );
  };

  return (
    <Card>
      <b>Питання №{index1 + 1}</b>
      <Paragraph>{question.text}</Paragraph>
      <QuestionImages images={question.Images} />
      <Form.Item
        labelCol={{ span: 4.6 }}
        label="Список пар"
        name={`list_pars_${question.id}`}
        rules={[{ required: true, message: 'Заповніть список пар чисел' }]}
      >
        <Card title="Список пар чисел" style={{ marginTop: 20 }}>
          <Divider>Додайте пари</Divider>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            {pairs.map(pair => (
              <Space
                key={pair.id}
                align="center"
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  border: '1px solid #f0f0f0',
                  borderRadius: 5,
                  padding: 8,
                  backgroundColor: '#fff',
                }}
              >
                <Text style={{ width: 80 }}>№{pair.id}</Text>
                <InputNumber
                  value={pair.first}
                  placeholder="Перше"
                  onChange={value => updatePair(pair.id, 'first', value)}
                  controls={false}
                  style={{ flexGrow: 1, marginRight: 10, width: 50 }}
                  onFocus={e => e.target.select()}
                />
                <InputNumber
                  value={pair.second}
                  placeholder="Друге"
                  onChange={value => updatePair(pair.id, 'second', value)}
                  controls={false}
                  style={{ flexGrow: 1, marginRight: 10, width: 50 }}
                  onFocus={e => e.target.select()}
                />
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => removePair(pair.id)}
                  disabled={pairs.length === 1}
                  style={{ padding: 0, height: 20 }}
                />
              </Space>
            ))}
          </Space>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={addPair}
              style={{ width: '50%' }}
            >
              Додати пару
            </Button>
          </div>
        </Card>
      </Form.Item>
    </Card>
  );
};

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Input,
  message,
  Space,
} from 'antd';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Variants_q = ({ onChange, fieldName }) => {
  const [options, setOptions] = useState([
    { id: 1, text: '', isCorrect: false },
    { id: 2, text: '', isCorrect: false },
    { id: 3, text: '', isCorrect: false },
    { id: 4, text: '', isCorrect: false },
  ]);

  useEffect(() => {
    onChange({
      answer: {
        variants: options.map(option => option.text),
        correct: options.map(option => (option.isCorrect ? 1 : 0)),
      },
    });
  }, [options, onChange]);

  const addOption = () => {
    setOptions([
      ...options,
      { id: options.length + 1, text: '', isCorrect: false },
    ]);
  };

  const removeOption = id => {
    if (options.length === 1) {
      message.warning('Ви повинні залишити хоча б один варіант');

      return;
    }

    const updatedOptions = options
      .filter(option => option.id !== id)
      .map((option, index) => ({
        ...option,
        id: index + 1,
      }));

    setOptions(updatedOptions);
  };

  const updateOptionText = (id, newText) => {
    setOptions(
      options.map(option =>
        option.id === id ? { ...option, text: newText } : option,
      ),
    );
  };

  const toggleCorrect = id => {
    setOptions(
      options.map(option =>
        option.id === id ? { ...option, isCorrect: !option.isCorrect } : option,
      ),
    );
  };

  return (
    <Form.Item
      label="Варіанти"
      name={fieldName}
      rules={[{ required: true, message: 'Виберіть правильний варіант' }]}
    >
      <Card title="Варіанти відповідей" style={{ marginTop: 20 }}>
        <Divider>Додайте варіанти відповіді</Divider>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {options.map(option => (
            <Space
              key={option.id}
              align="center"
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                border: '1px solid #f0f0f0',
                borderRadius: 5,
                padding: 8,
                backgroundColor: option.isCorrect ? '#f6ffed' : '#fff',
              }}
            >
              <Checkbox
                checked={option.isCorrect}
                onChange={() => toggleCorrect(option.id)}
              />
              <Input
                placeholder={`Варіант ${option.id}`}
                value={option.text}
                onChange={e => updateOptionText(option.id, e.target.value)}
                style={{ flex: 1, marginRight: 10, width: '100%' }}
              />
              <Button
                type="text"
                icon={<DeleteOutlined />}
                danger
                onClick={() => removeOption(option.id)}
              />
            </Space>
          ))}
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={addOption}
            style={{ width: '100%' }}
          >
            Додати варіант відповіді
          </Button>
        </Space>
      </Card>
    </Form.Item>
  );
};

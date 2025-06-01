import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Button,
  Card,
  Checkbox,
  InputNumber,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Space,
  Typography,
  Divider,
  Form,
} from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Text } = Typography;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const List_num = ({ onChange, fieldName }) => {
  const [items, setItems] = useState([1, 2]);
  const [isOrderImportant, setIsOrderImportant] = useState(false);

  useEffect(() => {
    onChange({
      answer: {
        massiv: items,
        consistencyImportant: isOrderImportant,
      },
    });
  }, [items, isOrderImportant, onChange]);

  const addItem = () => {
    setItems([...items, 0]);
  };

  const removeItem = index => {
    if (items.length === 1) {
      return;
    }

    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, value) => {
    const updatedItems = [...items];

    updatedItems[index] = Number(value) || 0;
    setItems(updatedItems);
  };

  return (
    <Form.Item
      label="Список"
      name={fieldName}
      rules={[
        { required: true, message: 'Будь-ласка, заповніть список чисел' },
      ]}
    >
      <Card title="Список чисел" style={{ marginTop: 20 }}>
        <Divider>Додайте очікувані елементи</Divider>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            justifyContent: 'center',
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <InputNumber
                controls={false}
                onClick={e => e.target.select()}
                value={item}
                placeholder={`Число ${index + 1}`}
                onChange={value => updateItem(index, value)}
                style={{
                  width: 50,
                  height: 50,
                  marginBottom: 5,
                }}
              />
              <Button
                type="text"
                icon={<DeleteOutlined />}
                danger
                onClick={() => removeItem(index)}
                disabled={items.length === 1}
                style={{
                  padding: 0,
                  height: 20,
                }}
              />
            </div>
          ))}
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
        >
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={addItem}
            style={{ width: '50%' }}
          >
            Додати число
          </Button>
        </div>
        <Divider />
        <Checkbox
          checked={isOrderImportant}
          onChange={() => setIsOrderImportant(!isOrderImportant)}
        >
          Порядок важливий
        </Checkbox>
      </Card>
    </Form.Item>
  );
};

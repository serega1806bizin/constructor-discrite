import React from 'react';
import { Card, InputNumber, Space, Typography, Divider } from 'antd';

const { Text } = Typography;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const List_pars = ({ pairs }) => {
  if (!pairs || !Array.isArray(pairs) || pairs.length === 0) {
    return null;
  }

  return (
    <Card style={{ marginTop: 20 }}>
      <Divider>Пары</Divider>
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {pairs.map((pair, index) => (
          <Space
            key={index}
            align="center"
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              border: '1px solid #f0f0f0',
              borderRadius: 5,
              padding: 8,
            }}
          >
            <Text style={{ width: 80 }}>№{index + 1}</Text>
            <InputNumber
              value={pair[0]}
              readOnly
              style={{ flexGrow: 1, marginRight: 10, width: 50 }}
            />
            <InputNumber
              value={pair[1]}
              readOnly
              style={{ flexGrow: 1, marginRight: 10, width: 50 }}
            />
          </Space>
        ))}
      </Space>
    </Card>
  );
};

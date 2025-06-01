import React from 'react';
import { Card, InputNumber, Space, Typography } from 'antd';

const { Text } = Typography;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const List_reber = ({ Corr, Ans }) => {
  const correctEdges = Array.isArray(Corr) ? Corr : [];
  const studentEdges = Ans && Array.isArray(Ans.answer) ? Ans.answer : [];

  const pairsEqual = (pair1, pair2) => {
    if (
      !Array.isArray(pair1) ||
      !Array.isArray(pair2) ||
      pair1.length !== 2 ||
      pair2.length !== 2
    ) {
      return false;
    }

    return (
      (Number(pair1[0]) === Number(pair2[0]) &&
        Number(pair1[1]) === Number(pair2[1])) ||
      (Number(pair1[0]) === Number(pair2[1]) &&
        Number(pair1[1]) === Number(pair2[0]))
    );
  };

  return (
    <Card style={{ marginTop: 20 }}>
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {correctEdges.map((edge, index) => {
          const isMatched = studentEdges.some(studentEdge =>
            pairsEqual(edge, studentEdge),
          );
          const bgColor = isMatched ? '#f6ffed' : '#fff';

          const x1 = Array.isArray(edge) ? edge[0] : edge.x1;
          const x2 = Array.isArray(edge) ? edge[1] : edge.x2;
          const id = Array.isArray(edge) ? index + 1 : edge.id || index + 1;

          return (
            <Space
              key={index}
              align="center"
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 10,
                border: '1px solid #f0f0f0',
                borderRadius: 5,
                padding: 8,
                backgroundColor: bgColor,
                textAlign: 'center',
              }}
            >
              <Text style={{ minWidth: 70 }}>
                U<sub>{id}</sub> | (X
              </Text>
              <InputNumber
                readOnly
                value={x1}
                min={0}
                controls={false}
                style={{ marginRight: 10, width: 40 }}
              />
              <Text style={{ marginRight: 5 }}>, X </Text>
              <InputNumber
                readOnly
                value={x2}
                min={0}
                controls={false}
                style={{ marginRight: 10, width: 40 }}
              />
              <Text>)</Text>
            </Space>
          );
        })}
      </Space>
    </Card>
  );
};

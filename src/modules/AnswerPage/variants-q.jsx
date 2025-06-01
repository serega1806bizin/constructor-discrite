import React from 'react';
import { Card, Checkbox, Input, Space, Tooltip } from 'antd';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Variants_q = ({ Corr, Ans }) => {
  if (
    !Corr ||
    !Corr.variants ||
    !Array.isArray(Corr.variants) ||
    !Corr.correct ||
    !Array.isArray(Corr.correct)
  ) {
    return null;
  }

  const options = Corr.variants.map((variant, index) => {
    const expected = Boolean(Corr.correct[index]);
    let student = undefined;
    let isMismatch = false;

    if (Ans && Array.isArray(Ans)) {
      student = Boolean(Ans[index]);
      if (student !== expected) {
        isMismatch = true;
      }
    }

    return { id: index, text: variant, expected, student, isMismatch };
  });

  return (
    <Card title="Варіанти відповідей" style={{ marginTop: 20 }}>
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {options.map(option => {
          const bgColor = Ans
            ? option.isMismatch
              ? '#ffebeb'
              : '#f6ffed'
            : option.expected
              ? '#f6ffed'
              : '#fff';

          const checkboxChecked = Ans ? option.student : option.expected;

          return (
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
                backgroundColor: bgColor,
              }}
            >
              <Checkbox checked={checkboxChecked} disabled />
              <Tooltip title={option.text}>
                <Input
                  value={option.text}
                  readOnly
                  style={{
                    flex: 1,
                    marginRight: 10,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    width: 250,
                  }}
                />
              </Tooltip>
            </Space>
          );
        })}
      </Space>
    </Card>
  );
};

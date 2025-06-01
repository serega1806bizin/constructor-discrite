import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Form, InputNumber, Card } from 'antd';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Matrix_q = ({ onChange, fieldName }) => {
  // Локальные состояния для матрицы
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [matrix, setMatrix] = useState([]);

  // Пересоздание матрицы при изменении rows или cols
  useEffect(() => {
    const newMatrix = Array.from({ length: rows }, (_, i) =>
      // eslint-disable-next-line @typescript-eslint/no-shadow
      Array.from({ length: cols }, (_, j) => matrix[i]?.[j] ?? undefined),
    );

    setMatrix(newMatrix);
  }, [rows, cols, matrix]);

  useEffect(() => {
    onChange({
      answer: matrix,
    });
  }, [matrix, onChange]);

  // Обработчик изменения ячейки
  const handleCellChange = (rowIndex, colIndex, value) => {
    const newMatrix = [...matrix];

    newMatrix[rowIndex][colIndex] = value ?? 0;
    setMatrix(newMatrix);
  };

  return (
    <>
      <em>Правильна матриця</em>
      <Form.Item
        label="Кількість рядків"
        name={`${fieldName}_rows`} // Используем уникальное имя
        labelCol={{ span: 6.5 }}
        rules={[
          { required: true, message: 'Вкажіть кількість рядків' },
          {
            type: 'number',
            min: 1,
            max: 10,
            message: 'Мінімум 1, максимум 10',
          },
        ]}
      >
        <InputNumber
          min={1}
          max={9}
          value={rows}
          onChange={value => setRows(value ?? 1)}
        />
      </Form.Item>

      <Form.Item
        label="Кількість стовпців"
        name={`${fieldName}_cols`} // Уникальное имя
        labelCol={{ span: 6.5 }}
        rules={[
          { required: true, message: 'Вкажіть кількість стовпців' },
          {
            type: 'number',
            min: 1,
            max: 10,
            message: 'Мінімум 1, максимум 10',
          },
        ]}
      >
        <InputNumber
          min={1}
          max={9}
          value={cols}
          onChange={value => setCols(value ?? 1)}
        />
      </Form.Item>

      <Card style={{ marginBottom: 16, width: cols * 52 + 40 }}>
        {matrix.map((row, rowIndex) => (
          <div
            key={`${fieldName}_row-${rowIndex}`}
            style={{ display: 'flex', marginBottom: -16 }}
          >
            {row.map((cellValue, colIndex) => (
              <Form.Item
                key={`${fieldName}_cell-${rowIndex}-${colIndex}`}
                name={`${fieldName}_cell-${rowIndex}-${colIndex}`} // Уникальное имя для каждой ячейки
                rules={[{ required: true, message: '' }]}
                validateTrigger="onBlur"
                validateStatus={cellValue === undefined ? 'error' : ''}
                style={{ alignItems: 'center' }}
              >
                <InputNumber
                  controls={false}
                  value={cellValue}
                  onChange={value =>
                    handleCellChange(rowIndex, colIndex, value)
                  }
                  onFocus={e => e.target.select()}
                  style={{
                    width: 50,
                    height: 50,
                    textAlign: 'center',
                  }}
                />
              </Form.Item>
            ))}
          </div>
        ))}
      </Card>
    </>
  );
};

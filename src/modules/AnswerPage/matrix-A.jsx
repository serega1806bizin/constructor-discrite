import React from 'react';
import { InputNumber } from 'antd';

export const MatrixA = ({ Ans, Corr }) => {
  return (
    <>
      {Corr.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          style={{ display: 'flex', marginBottom: 0 }}
        >
          {row.map((correctCell, colIndex) => {
            // Убедимся, что Ans[rowIndex] существует и является массивом
            const studentCell = Array.isArray(Ans[rowIndex])
              ? Ans[rowIndex][colIndex]
              : undefined;
            const isCorrect = studentCell === correctCell;
            const bgColor = isCorrect ? '#e6ffed' : '#ffebeb'; // Зеленый для совпадений, красный для несовпадений

            return (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                style={{ padding: '4px' }}
              >
                <InputNumber
                  controls={false}
                  value={studentCell}
                  readOnly
                  style={{
                    width: 50,
                    height: 50,
                    textAlign: 'center',
                    backgroundColor: bgColor,
                  }}
                />
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

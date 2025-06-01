import React, { useState } from 'react';
import { Carousel, Modal, Image } from 'antd';

export const QuestionImages = ({ images }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const openModal = url => {
    setCurrentImage(url);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const contentStyle = {
    width: '100%',
    height: '300px',
    objectFit: 'contain',
    cursor: 'pointer',
  };

  return (
    <>
      <Carousel dotsClass="custom-dots">
        {images.map((url, idx) => (
          <div key={idx}>
            <img
              src={url}
              alt={`Slide ${idx + 1}`}
              style={contentStyle}
              onClick={() => openModal(url)}
            />
          </div>
        ))}
      </Carousel>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={closeModal}
        centered
        width="90%"
      >
        {/* Компонент Image с preview даёт возможность зума */}
        <Image src={currentImage} style={{ width: '100%' }} preview={true} />
      </Modal>
    </>
  );
};

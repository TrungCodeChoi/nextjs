"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";

const TrailerModal: React.FC = ({ videoId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={showModal}>
        <img
          className="my-[20px]"
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt=""
        />
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <iframe
          className="mx-auto w-full my-10"
          //   width="560"
          height="480"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in- picture"
          allowFullScreen
        />
      </Modal>
    </>
  );
};

export default TrailerModal;

import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { addTask } from "../../store/todoistService.js";
const TaskModal = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [content, setContent] = useState('');

      const showModal = () => {
            setIsModalOpen(true);
      };

      const handleOk = async () => {
            try {
                  const task = { content };
                  const response = await addTask(task);
                  console.log(response);
                  setContent(''); // reset the input field
                  setIsModalOpen(false);
            } catch (error) {
                  console.error('Error adding task:', error);
            }
      };

      const handleCancel = () => {
            setIsModalOpen(false);
      };

      return (
            <>
                  <Button type="primary" onClick={showModal}>
                        Open Modal
                  </Button>
                  <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Input placeholder="Enter task content" value={content} onChange={e => setContent(e.target.value)} />
                  </Modal>
            </>
      );
};
export default TaskModal;

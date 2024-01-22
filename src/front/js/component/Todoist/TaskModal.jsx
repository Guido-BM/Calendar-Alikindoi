import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import { addTask, updateTask } from '../../store/todoistService';

const useStyle = createStyles(({ token }) => ({
      'my-modal-body': {
            background: token.blue1,
            padding: token.paddingSM,
      },
      'my-modal-mask': {
            boxShadow: `inset 0 0 15px #fff`,
      },
      'my-modal-header': {
            borderBottom: `1px dotted ${token.colorPrimary}`,
      },
      'my-modal-footer': {
            color: token.colorPrimary,
      },
      'my-modal-content': {
            border: '1px solid #333',
      },
}));

const TaskModal = () => {
      const [isModalOpen, setIsModalOpen] = useState([false, false]);
      const [task, setTask] = useState({ title: '', description: '' });
      const { styles } = useStyle();
      const token = useTheme();

      const toggleModal = (idx, target) => {
            setIsModalOpen((p) => {
                  p[idx] = target;
                  return [...p];
            });
      };

      const handleInputChange = (event) => {
            setTask({ ...task, [event.target.name]: event.target.value });
      };

      const handleSubmit = () => {
            if (task.id) {
                  updateTask(task);
            } else {
                  addTask(task);
            }
            toggleModal(0, false);
      };

      const classNames = {
            body: styles['my-modal-body'],
            mask: styles['my-modal-mask'],
            header: styles['my-modal-header'],
            footer: styles['my-modal-footer'],
            content: styles['my-modal-content'],
      };
      const modalStyles = {
            header: {
                  borderLeft: `5px solid ${token.colorPrimary}`,
                  borderRadius: 0,
                  paddingInlineStart: 5,
            },
            body: {
                  boxShadow: 'inset 0 0 5px #999',
                  borderRadius: 5,
            },
            mask: {
                  backdropFilter: 'blur(10px)',
            },
            footer: {
                  borderTop: '1px solid #333',
            },
            content: {
                  boxShadow: '0 0 30px #999',
            },
      };
      return (
            <>
                  <Space>
                        <Button type="primary" onClick={() => toggleModal(0, true)}>
                              Anadir Tarea
                        </Button>
                  </Space>
                  <Modal
                        title={task.id ? "Edit Task" : "Add Task"}
                        open={isModalOpen[0]}
                        onOk={handleSubmit}
                        onCancel={() => toggleModal(0, false)}
                        footer="Footer"
                        classNames={classNames}
                        styles={modalStyles}
                  >
                        <form>
                              <label>
                                    Title:
                                    <input type="text" name="title" value={task.title} onChange={handleInputChange} />
                              </label>
                              <label>
                                    Description:
                                    <input type="text" name="description" value={task.description} onChange={handleInputChange} />
                              </label>
                        </form>
                  </Modal>
            </>
      );
};
export default TaskModal;

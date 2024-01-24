import React, { useState } from 'react';
import { Modal, Space } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import { addTask, updateTask } from '../../store/todoistService';

const useStyle = createStyles(({ token }) => ({
      'my-modal-body': {
            background: '#f0f2f5',
            padding: token.paddingSM,
      },
      'my-modal-mask': {
            boxShadow: `inset 0 0 15px #f0f2f5`,
      },
      'my-modal-header': {
            borderBottom: `1px solid ${token.colorPrimary}`,
            backgroundColor: token.colorPrimary,
            color: '#fff',
      },
      'my-modal-footer': {
            color: token.colorPrimary,
            backgroundColor: '#f0f2f5',
      },
      'my-modal-content': {
            border: '1px solid #ccc',
      },
      'my-input': {
            width: 'calc(100% - 30px)',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
      },
      'my-textarea': {
            width: 'calc(100% - 30px)',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
            resize: 'none',
      },
      'my-button': {
            backgroundColor: 'blue',
            color: '#fff',
            border: 'none',
            padding: '6px 15px',
            borderRadius: '2px',
            cursor: 'pointer',
            fontSize: '14px',
            lineHeight: '1.5715',
            transition: 'all .3s',
            userSelect: 'none',
            textAlign: 'center',
            verticalAlign: 'middle',
            outline: 'none',
            ':hover': {
                  backgroundColor: '#40a9ff',
            },
            ':active': {
                  backgroundColor: '#096dd9',
            },
      },
      'footer': {
            display: 'flex',
            justifyContent: 'flex-end',
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
                  borderRadius: '5px',
                  paddingInlineStart: 5,
                  color: '#fff',
            },
            body: {
                  boxShadow: 'inset 0 0 5px #ccc',
                  borderRadius: '5px',
            },
            mask: {
                  backdropFilter: 'blur(10px)',
            },
            footer: {
                  borderTop: '1px solid #ccc',
                  backgroundColor: '#f0f2f5',
            },
            content: {
                  boxShadow: '0 0 30px #ccc',
            },
      };
      return (
            <>
                  <Space>
                        <button type="primary" onClick={() => toggleModal(0, true)}>
                              Add Task
                        </button>
                  </Space>
                  <Modal
                        title={task.id ? "Edit Task" : "Add Task"}
                        open={isModalOpen[0]}
                        onOk={handleSubmit}
                        onCancel={() => toggleModal(0, false)}
                        classNames={classNames}
                        styles={modalStyles}
                  >
                        <form>
                              <label>
                                    Title:
                                    <input
                                          type="text"
                                          name="title"
                                          value={task.title}
                                          onChange={handleInputChange}
                                          className={styles['my-input']}
                                    />
                              </label>
                              <label>
                                    Description:
                                    <textarea
                                          type="text"
                                          name="description"
                                          value={task.description}
                                          onChange={handleInputChange}
                                          className={styles['my-textarea']}
                                    />
                              </label>
                        </form>
                  </Modal>
            </>
      );
};
export default TaskModal;

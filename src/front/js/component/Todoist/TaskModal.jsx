import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import { addTask, updateTask } from '../../store/todoistService';

const useStyle = createStyles(({ token }) => ({
      'my-modal-body': {
            background: '#f0f2f5', // Un fondo más suave
            padding: token.paddingSM,
      },
      'my-modal-mask': {
            boxShadow: `inset 0 0 15px #f0f2f5`, // Sombra más suave
      },
      'my-modal-header': {
            borderBottom: `1px solid ${token.colorPrimary}`, // Línea sólida
            backgroundColor: token.colorPrimary, // Fondo del color primario
            color: '#fff', // Texto blanco
      },
      'my-modal-footer': {
            color: token.colorPrimary,
            backgroundColor: '#f0f2f5', // Fondo más suave
      },
      'my-modal-content': {
            border: '1px solid #ccc', // Borde más suave
      },
      'my-input': {
            width: 'calc(100% - 30px)', // Restar el padding y el margen del ancho total
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
      },
      'my-textarea': {
            width: 'calc(100% - 30px)', // Restar el padding y el margen del ancho total
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
            resize: 'none', // Evitar que el usuario pueda cambiar el tamaño
      },
      'my-button': {
            padding: '10px 20px',
            margin: '10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007BFF',
            color: '#fff',
            cursor: 'pointer',
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
                  borderRadius: '5px', // Bordes redondeados
                  paddingInlineStart: 5,
                  color: '#fff', // Texto blanco
            },
            body: {
                  boxShadow: 'inset 0 0 5px #ccc', // Sombra más suave
                  borderRadius: '5px', // Bordes redondeados
            },
            mask: {
                  backdropFilter: 'blur(10px)',
            },
            footer: {
                  borderTop: '1px solid #ccc', // Borde más suave
                  backgroundColor: '#f0f2f5', // Fondo más suave
            },
            content: {
                  boxShadow: '0 0 30px #ccc', // Sombra más suave
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
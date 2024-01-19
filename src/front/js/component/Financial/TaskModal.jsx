import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { createStyles, useTheme } from 'antd-style';

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
      const { styles } = useStyle();
      const token = useTheme();
      const toggleModal = (idx, target) => {
            setIsModalOpen((p) => {
                  p[idx] = target;
                  return [...p];
            });
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
                        title="Anadir Tarea"
                        open={isModalOpen[0]}
                        onOk={() => toggleModal(0, false)}
                        onCancel={() => toggleModal(0, false)}
                        footer="Footer"
                        classNames={classNames}
                        styles={modalStyles}
                  >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                  </Modal>
            </>
      );
};
export default TaskModal;
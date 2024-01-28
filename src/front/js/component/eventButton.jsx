import React, { useState } from "react";
import { Form, Input, Modal, TimePicker, Button } from "antd";

const CollectionCreateForm = ({ open, onCreate, onCancel, title, eventId }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title={title}
      okText="Done"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate({ ...values, id: eventId });
            onCancel();
          })
          .catch((info) => {
            // console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="time"
          label="Time"
          rules={[
            {
              validator: (_, value) => {
                if (!value || value[0].isBefore(value[1])) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("End time must be after start time")
                );
              },
            },
          ]}
        >
          <TimePicker.RangePicker format="HH:mm" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EventButton = ({ onCreate, children, modalTitle, eventId = null }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        type="text"
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
      </Button>
      <CollectionCreateForm
        eventId={eventId}
        title={modalTitle}
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default EventButton;

import React, { useState } from "react";
import { Button, Form, Input, Modal, Radio, TimePicker } from "antd";

const CollectionCreateForm = ({
  open,
  onCreate,
  onCancel,
  onFormDataChange,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create a new event"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
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
        <Form.Item
          name="modifier"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Radio value="error">Urgent</Radio>
            <Radio value="warning">Require attention</Radio>
            <Radio value="success">No Rush</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CreateEventButton = ({ addEvents, selectedDate }) => {
  const [open, setOpen] = useState(false);

  const onCreate = (values) => {
    const newEvent = {
      title: values.title,
      description: values.description,
      modifier: values.modifier,
      date: selectedDate,
      time: values.time,
    };
    addEvents(newEvent);
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Create Event
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default CreateEventButton;

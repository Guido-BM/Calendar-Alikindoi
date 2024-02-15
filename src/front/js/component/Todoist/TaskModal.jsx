import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Input,
  Select,
  DatePicker,
  AutoComplete,
  TimePicker,
  message,
} from "antd";
import "./TaskModal.css";
import useTodoistService from "../../component/Todoist/useTodoistService.jsx";
const TaskModal = ({ setTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [dueString, setDueString] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueDatetime, setDueDatetime] = useState("");
  const { addTask, getTasks } = useTodoistService();
  const dueStringOptions = [
    "next Monday",
    "Tomorrow",
    "in 3 days",
    "next week",
  ];
  const { Option } = Select;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      setIsLoading(true);
      if (!content) {
        message.error("Please enter a task name");
        return;
      }
      const task = {
        content,
        description,
        priority,
        dueString,
        dueDate,
        dueDatetime,
      };
      await addTask(task);
      const tasks = await getTasks();
      setTasks(tasks);
      setContent("");
      setDescription("");
      setPriority(1);
      setDueString("");
      setDueDate("");
      setDueDatetime("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        className="custom-modal-task-button"
        type="primary"
        onClick={showModal}
      >
        Add New Task
      </Button>
      <Modal
        title="Task Info"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="input-container">
          <Input
            placeholder="Enter task content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="input-container">
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <div className="input-container">
          <label className="input-label">Priority</label>
          <Select value={priority} onChange={(value) => setPriority(value)}>
            <Option value={1}>Normal</Option>
            <Option value={2}>Medium</Option>
            <Option value={3}>High</Option>
            <Option value={4}>Urgent</Option>
          </Select>
        </div>
        <div className="input-container">
          <DatePicker
            className="date-picker"
            format="YYYY-MM-DD"
            onChange={(date) => {
              setDueDate(date ? date.format("YYYY-MM-DD") : null);
              setDueDatetime(null);
            }}
            placeholder="Due Date"
          />
          <TimePicker
            className="time-picker"
            disabled={!dueDate}
            format="HH:mm"
            onChange={(time) => {
              setDueDatetime(
                time ? `${dueDate}T${time.format("HH:mm:ss[Z]")}` : null
              );
            }}
            placeholder="Due Time"
          />
        </div>
      </Modal>
    </>
  );
};
export default TaskModal;

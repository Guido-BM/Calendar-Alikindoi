import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Select, DatePicker, AutoComplete, TimePicker } from 'antd';
import { updateTask } from "../../store/todoistService.js";
import './TaskModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const TaskModalEdit = ({ onClose }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [content, setContent] = useState(taskToUpdate ? taskToUpdate.content : '');
      const [description, setDescription] = useState(taskToUpdate ? taskToUpdate.description : '');
      const [priority, setPriority] = useState(taskToUpdate ? taskToUpdate.priority : 1);
      const [dueString, setDueString] = useState(taskToUpdate ? taskToUpdate.dueString : '');
      const [dueDate, setDueDate] = useState(taskToUpdate ? taskToUpdate.dueDate : '');
      const [dueDatetime, setDueDatetime] = useState(taskToUpdate ? taskToUpdate.dueDatetime : '');
      const dueStringOptions = ['next Monday', 'Tomorrow', 'in 3 days', 'next week'];
      const { Option } = Select;
      const [project, setProject] = useState(taskToUpdate ? taskToUpdate.project_id : '');
      const [taskToUpdate, setTaskToUpdate] = useState(null);

      // New state variable for tracking whether we're updating or creating
      const [isUpdating, setIsUpdating] = useState(false);

      const handleOk = async () => {
            try {
                  if (!content) {
                        alert('Please select a task name');
                        return;
                  }
                  if (!taskToUpdate) {
                        alert('Please select a task to edit');
                        return;
                  }
                  const updatedTask = { content, description, priority, dueString, dueDate };
                  const response = await updateTask(taskToUpdate.id, updatedTask);
                  console.log(response);
                  setContent('');
                  setProject(null);
                  setIsModalOpen(false);
            } catch (error) {
                  console.error('Error updating task:', error);
            }
      };

      const handleCancel = () => {
            setIsModalOpen(false);
            onClose();
      };

      const handleEditClick = (task) => {
            setTaskToUpdate(task);
            setIsModalOpen(true);
      };

      return (
            <>
                  <button className='task-modal-edit-btn' onClick={() => handleEditClick(taskToUpdate)}><FontAwesomeIcon icon={faPencilAlt} /></button>
                  <Modal title="Task Edit" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <div className="input-container">
                              <Input placeholder="Enter task content" value={content} onChange={e => setContent(e.target.value)} />
                        </div>
                        <div className="input-container">
                              <Input
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    placeholder="Description"
                              />
                        </div>
                        <div className='input-container'>
                              <label className="input-label">Priority</label>
                              <Select value={priority} onChange={value => setPriority(value)}>
                                    <Option value={1}>Normal</Option>
                                    <Option value={2}>Medium</Option>
                                    <Option value={3}>High</Option>
                                    <Option value={4}>Urgent</Option>
                              </Select>
                        </div>
                        <div className='input-container'>
                              <label className="input-label">Due Date Selector</label>
                              <AutoComplete
                                    options={dueStringOptions.map(option => ({ value: option }))}
                                    value={dueString}
                                    onChange={value => setDueString(value)}
                                    placeholder="Due String"
                              />
                              <DatePicker
                                    className='date-picker'
                                    format="YYYY-MM-DD"
                                    onChange={date => {
                                          setDueDate(date ? date.format('YYYY-MM-DD') : null);
                                          setDueDatetime(null);
                                    }}
                                    placeholder="Due Date"
                              />
                              <TimePicker
                                    className='time-picker'
                                    disabled={!dueDate}
                                    format="HH:mm"
                                    onChange={time => {
                                          setDueDatetime(time ? `${dueDate}T${time.format('HH:mm:ss[Z]')}` : null);
                                    }}
                                    placeholder="Due Time"
                              />
                        </div>
                  </Modal>
            </>
      );
};

export default TaskModalEdit;

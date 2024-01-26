import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Select, DatePicker, AutoComplete, TimePicker } from 'antd';
import { addTask, getProjects, updateTask } from "../../store/todoistService.js";
import './TaskModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const TaskModalEdit = ({ taskToUpdate, onClose }) => {
      const [isModalOpen, setIsModalOpen] = useState(true);
      const [content, setContent] = useState(taskToUpdate ? taskToUpdate.content : '');
      const [description, setDescription] = useState(taskToUpdate ? taskToUpdate.description : '');
      const [priority, setPriority] = useState(taskToUpdate ? taskToUpdate.priority : '');
      const [dueString, setDueString] = useState(taskToUpdate ? taskToUpdate.dueString : '');
      const [dueDate, setDueDate] = useState(taskToUpdate ? taskToUpdate.dueDate : '');
      const [dueDatetime, setDueDatetime] = useState(taskToUpdate ? taskToUpdate.dueDatetime : '');
      const dueStringOptions = ['next Monday', 'Tomorrow', 'in 3 days', 'next week'];
      const { Option } = Select;
      const [projects, setProjects] = useState([]);
      const [project, setProject] = useState(taskToUpdate ? taskToUpdate.project_id : '');

      // New state variable for tracking whether we're updating or creating
      const [isUpdating, setIsUpdating] = useState(false);

      useEffect(() => {
            if (isModalOpen) {
                  getProjects().then(setProjects);
            }
      }, [isModalOpen]);

      const handleOk = () => {
            const updatedTask = {
                  ...taskToUpdate,
                  content,
                  description,
                  priority,
                  dueString,
                  dueDate,
                  dueDatetime,
                  project_id: project,
            };

            updateTask(taskToUpdate.id, updatedTask)
                  .then((isSuccess) => {
                        console.log(isSuccess);
                        setIsModalOpen(false);
                        onClose();
                  })
                  .catch((error) => console.log(error));
      };
      const handleCancel = () => {
            setIsModalOpen(false);
            onClose();
      };

      return (
            <>
                  <button onClick={() => handleEditClick(task)}><FontAwesomeIcon icon={faPencilAlt} /></button>
                  <Modal title="Task Info" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <div className="input-container">
                              <label className="input-label">Project</label>
                              <Select placeholder="Select Project" value={project} onChange={value => setProject(value)}>
                                    {projects.map(project => (
                                          <Select.Option key={project.id} value={project.id}>
                                                {project.name}
                                          </Select.Option>
                                    ))}
                              </Select>
                        </div>
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

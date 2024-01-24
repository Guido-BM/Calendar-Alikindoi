import React from 'react';
import './NewModal.css';

const NewModal = ({ isModalVisible, closeModal, task, handleInputChange }) => {
      if (!isModalVisible) return null;

      return (
            <div className="modal">
                  <div className="modal-content">
                        <h2>Add Task</h2>
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <form>
                              <label>
                                    Task:
                                    <input
                                          type="text"
                                          name="title"
                                          value={task.title}
                                          onChange={handleInputChange}
                                          className="my-input"
                                    />
                              </label>
                              <label>
                                    Description:
                                    <textarea
                                          type="text"
                                          name="description"
                                          value={task.description}
                                          onChange={handleInputChange}
                                          className="my-textarea"
                                    />
                              </label>
                              <button type="submit">Add</button>
                              <button type="button" onClick={closeModal}>Cancel</button>
                        </form>
                  </div>
            </div>
      );
};

export default NewModal;

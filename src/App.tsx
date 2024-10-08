import React, { useState } from 'react';
import { Input, Button, List, Modal, Checkbox, Form, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [form] = Form.useForm();

  // Add Task
  const addTask = () => {
    if (newTask.trim() === '') {
      message.error('Task cannot be empty!');
      return;
    }
    const task: Task = {
      id: Date.now(),
      name: newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  // Edit Task
  const showEditModal = (task: Task) => {
    setCurrentTask(task);
    form.setFieldsValue({ name: task.name });
    setIsEditModalVisible(true);
  };

  const handleEditTask = (values: { name: string }) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === currentTask?.id ? { ...task, name: values.name } : task
      )
    );
    setIsEditModalVisible(false);
    message.success('Task updated successfully!');
  };

  // Delete Task
  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    message.success('Task deleted successfully!');
  };

  // Mark task as completed
  const toggleComplete = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">ToDo Application</h1>

      <div className="flex space-x-2 mb-6">
        <Input
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full"
        />
        <Button type="primary" onClick={addTask} icon={<PlusOutlined />}>
          Add
        </Button>
      </div>

      <List
        bordered
        dataSource={tasks}
        renderItem={(task: Task) => (
          <List.Item
            actions={[
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => showEditModal(task)}
              />,
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteTask(task.id)}
              />,
            ]}
          >
            <Checkbox
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className={task.completed ? 'line-through' : ''}
            >
              {task.name}
            </Checkbox>
          </List.Item>
        )}
      />

      <Modal
        title="Edit Task"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={() => {
          form.validateFields().then((values) => {
            handleEditTask(values);
          });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Task"
            name="name"
            rules={[{ required: true, message: 'Task name is required!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;

import React, {
  useState
} from 'react';

import {
  StyleSheet,
  View
}
  from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList, } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);


  function handleAddTask(newTaskTitle: string) {

    const date = new Date().getTime();

    const task = {
      id: date,
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldState => [...oldState, task]);
  }

  function handleToggleTaskDone(id: number) {

    const taskList = [...tasks];

    const taskToBeUpdated = taskList.find((task) => task.id === id);

    if (!taskToBeUpdated) {
      return;
    }

    taskToBeUpdated.done = !taskToBeUpdated.done;

    setTasks(taskList);
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(
      task => task.id !== id
    ));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
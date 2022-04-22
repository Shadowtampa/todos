import React, {
  useState
} from 'react';

import {
  Alert,
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

    const taskTitleAlreadyTaken = tasks.find((task) => task.title === newTaskTitle);

    if (taskTitleAlreadyTaken) {

      Alert.alert(
        "Task já cadastrada!",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          { text: "OK" }
        ]
      );

      return;
    }

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

    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [

        { text: "Sim", onPress: () => {
          deleteTask()
        }},

        { text: "Não" },
      ]
    );
    
    function deleteTask() {
      setTasks(oldState => oldState.filter(
        task => task.id !== id
      ));
    } 
    
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
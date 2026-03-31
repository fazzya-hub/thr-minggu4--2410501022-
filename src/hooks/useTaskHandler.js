import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export function useTaskHandler() {
  const ctx = useContext(TaskContext);
  if (ctx === null) throw new Error('useTaskHandler harus dipakai di dalam TaskProvider');

  const { state, dispatch, taskReady } = ctx;

  function addTask({ title, note }) {
    dispatch({ type: 'ADD_TASK', payload: { title, note } });
  }

  function toggleDone(id) {
    dispatch({ type: 'TOGGLE_DONE', payload: { id } });
  }

  function deleteTask(id) {
    dispatch({ type: 'DELETE_TASK', payload: { id } });
  }

  return { tasks: state.tasks, taskReady, addTask, toggleDone, deleteTask };
}


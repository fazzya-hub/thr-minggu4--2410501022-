import React, { createContext, useEffect, useReducer, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@task_habit_tracker_tasks_v1';

const initialState = {
  tasks: [],
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: String(Date.now()),
            title: action.payload.title.trim(),
            note: action.payload.note.trim(),
            done: false,
            createdAt: Date.now(),
          },
        ],
      };

    case 'TOGGLE_DONE':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, done: !t.done } : t
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload.id),
      };

    case 'HYDRATE_DATA':
      return {
        ...state,
        tasks: action.payload.tasks,
      };

    default:
      return state;
  }
}

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [taskReady, setTaskReady] = useState(false);
  const hasHydratedRef = useRef(false);

  useEffect(() => {
    async function hydrate() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          const list = Array.isArray(parsed) ? parsed : parsed.tasks;
          dispatch({ type: 'HYDRATE_DATA', payload: { tasks: list ?? [] } });
        }
      } catch (e) {
        console.warn('Gagal hydrate task:', e);
      } finally {
        hasHydratedRef.current = true;
        setTaskReady(true);
      }
    }
    hydrate();
  }, []);

  useEffect(() => {
    if (!hasHydratedRef.current) return;
    async function persist() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks: state.tasks }));
      } catch (e) {
        console.warn('Gagal simpan task:', e);
      }
    }
    persist();
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch, taskReady }}>
      {children}
    </TaskContext.Provider>
  );
}


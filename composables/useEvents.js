import { useCookie } from '#app';
import { useAuth } from '@composables/useAuth';
import { useImageStore } from '@composables/useImageStore';

export function useEvents() {
  const { currentUser } = useAuth();
  const { saveImage, getImage } = useImageStore();
  
  const events = useCookie('user_events', {
    default: () => ({}),
    sameSite: 'strict',
    path: '/',
    secure: true,
    maxAge: 172800
  });

  const addTodo = (category, todo) => {
    const id = Date.now(); // Генерация уникального ID
    if (todo.img) {
      saveImage(id, todo.img); // Сохраняем изображение с ключом по ID
    }
    category.todos.push({ id, ...todo }); // Добавляем todo с ID
  };

  const saveUserEvents = async (userEvents) => {
    if (!currentUser.value) return;
  
    // Обрабатываем каждую категорию и ее задачи
    const updatedCategories = userEvents.map(category => ({
      ...category,
      todos: category.todos.map(todo => {
        if (todo.img) {
          saveImage(todo.id, todo.img); // Сохраняем изображение для задачи
        }
        const { img, ...rest } = todo;
        return rest;
      })
    }));
  
    const username = currentUser.value.name;
    events.value = { 
      ...events.value,
      [username]: updatedCategories
    };
  };
  
  const getUserEvents = () => {
    if (!currentUser.value) return [];
    
    const username = currentUser.value.name;
    const savedCategories = events.value[username] || [];
    
    // Восстанавливаем изображения для каждой задачи
    return savedCategories.map(category => ({
      ...category,
      todos: category.todos.map(todo => ({
        ...todo,
        img: getImage(todo.id) // Загружаем изображение по ID задачи
      }))
    }));
  };

  const editTodo = (category, todo) => {
    const index = category.todos.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      if (todo.img) {
        saveImage(todo.id, todo.img);
      }
      category.todos[index] = todo;
    }
  };

  const deleteTodo = (category, todoId) => {
    category.todos = category.todos.filter(todo => todo.id !== todoId);
  };

  return { getUserEvents, saveUserEvents, addTodo, editTodo, deleteTodo };
}
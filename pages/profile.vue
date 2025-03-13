<template>
  <section class="profile section">
    <aside 
      class="profile__aside" 
      :class="{active: aside}"
      v-show="shouldShowAside"
    >
      <h2>Список событий</h2>
      <div class="profile__aside-btnblock">
        <button class="btn profile__aside-btn" @click="openCategoryModal">
          Добавить
        </button>
        <button class="btn profile__aside-btn profile__aside-btn--add" @click="toggleAside">
          X
        </button>
      </div>
      <ul class="profile__categories">
        <li 
          v-for="category in categories" 
          :key="category.id" 
          @click="selectCategory(category)"
          class="profile__categories-item"
        >
          <h2 class="profile__categories-text">{{ category.name }}</h2>
          <div class="profile__categories-btnblock">
            <button class="btn profile__category-btn" @click="openEditCategoryModal(category)">
              Изменить
            </button>
            <button class="btn profile__category-btn profile__delete-btn" @click.stop="openDeleteCategoryModal(category)">
              х
            </button>
          </div>
        </li>
      </ul>
      <button class="btn profile__delete-btn" @click="openDeleteAllCategoriesModal">
        Удалить всё
      </button>
    </aside>
    <main class="profile__main">
      <div v-if="!selectedCategory" class="profile__main-welcome">
        <h1 v-show="!isMobile"> {{ categories == 0 ? 'Создайте' : 'Выберите' }} категорию из списка</h1>
        <h1 v-show="isMobile">Нажмите на кнопку чтобы выбрать категорию</h1>
        <button 
          class="btn profile__toggle-aside" 
          v-show="isMobile" 
          @click="toggleAside"
        >
          {{ aside ? 'Скрыть список' : 'Показать список' }}
        </button>
      </div>
      <div v-if="selectedCategory" class="profile__todo">
        <div class="profile__todo-header">
          <h2>{{ selectedCategory.name }}</h2>
          <button v-if="isMobile" class="btn" @click="toggleAside">
            <IconProfileIconL class="profile-icon" filled/>
            Список
          </button>
        </div>
        <div class="profile__todo-status">
          <div class="profile__todo-status-item">
            <h3 class="font-text_medium">В ожидании</h3>
            <p>{{ pendingTodos.length }}</p>
          </div>
          <div class="profile__todo-status-item">
            <h3 class="font-text_medium">В разработке</h3>
            <p>{{ inProgressTodos.length }}</p>
          </div>
          <div class="profile__todo-status-item">
            <h3 class="font-text_medium">Сделано</h3>
            <p>{{ completedTodos.length }}</p>
          </div>
        </div>
        <input type="text" class="inp profile__search" v-model="searchQuery" placeholder="Поиск событий" />
        <button class="btn profile__add-todo" @click="openAddTodoModal">Создать событие</button>
        <ul class="profile__todo-list">
          <li v-for="todo in filteredTodos" :key="todo.id" :class="{'profile__todo-item': true, 'no-img': !todo.img}">
            <img class="profile__todo-img" v-if="todo.img" :src="todo.img" alt="Event image" />
            <h3 class="profile__todo-title">{{ todo.title }}</h3> 
            <span class="profile__todo-text"> {{ todo.text }} </span>
            <div class="profile__todo-btnblock">
              <select class="profile__todo-select inp" v-model="todo.status">
                <option value="pending">В ожидании</option>
                <option value="in-progress">В разработке</option>
                <option value="completed">Сделано</option>
              </select>
              <button class="btn" @click="openEditTodoModal(todo)">Изменить</button>
              <button class="btn profile__delete-btn" @click="openDeleteTodoModal(todo)">Удалить</button>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </section>
  <Modal v-if="showCategoryModal" @close="showCategoryModal = false">
    <div class="event__modal modal">
      <h3 class="event-modal__title">{{ editingCategory ? 'Изменить категорию' : 'Создать категорию' }}</h3>
      <div class="event-modal__inpblock">
        <input class="event-modal__inp inp" type="text" maxlength="40" v-model="newCategoryName" required placeholder="Название категории" />
        <p>{{ newCategoryName.length }}/40</p>
      </div>
      <button class="event-modal__btn btn" @click="editingCategory ? editCategory() : addCategory()">
        {{ editingCategory ? 'Изменить' : 'Создать' }}
      </button>      
    </div>
  </Modal>
  <Modal v-if="showTodoModal" @close="showTodoModal = false">
    <div class="event__modal modal">
      <h3 class="event-modal__title">{{ currentTodo.id ? 'Изменить' : 'Создать' }} Событие</h3>
      <img class="event-modal__img" v-if="currentTodo.img" :src="currentTodo.img" alt="Превью" /> 
      <button v-if="currentTodo.img" @click="clearImage" class="form-container__clear-image-btn btn">×</button>
      <div class="event-modal__inpblock">
        <input class="event-modal__inp inp" maxlength="40" type="text" v-model="currentTodo.title" placeholder="Заголовок события" />
        <p>{{ currentTodo.title.length }}/ 40</p>
      </div>
      <div class="event-modal__inpblock">
        <textarea class="event-modal__inp inp textarea" maxlength="500" type="text" v-model="currentTodo.text" placeholder="Текст события"></textarea>
        <p>{{ currentTodo.text.length }}/ 500</p>
      </div>
      <select class="event-modal__select inp" v-model="currentTodo.status">
        <option value="pending">В ожидании</option>
        <option value="in-progress">В разработке</option>
        <option value="completed">Сделано</option>
      </select>
      <label class="event-modal__file-upload btn">
        <input
          class="inp"
          type="file" 
          accept="image/*"
          @change="handleFileUpload"
        >
        <span>Выбрать фото</span>
      </label>
      <button class="btn" @click="saveTodo">{{ currentTodo.id ? 'Сохранить' : 'Создать' }}</button>
    </div> 
  </Modal>
  <Modal v-if="showDeleteAllCategoriesModal" @close="showDeleteAllCategoriesModal = false">
    <div class="event__modal modal">
      <h3 class="event-modal__title">Удалить все категории</h3>
      <p>Вы уверены, что хотите удалить все категории? Это действие необратимо.</p>
      <button class="event-modal__btn profile__delete-btn btn" @click="deleteAllCategories">Удалить</button>
      <button class="event-modal__btn btn" @click="showDeleteAllCategoriesModal = false">Отмена</button>
    </div>
  </Modal>
  <Modal v-if="showDeleteCategoryModal" @close="showDeleteCategoryModal = false">
    <div class="event__modal modal">
      <h3 class="event-modal__title">Удалить категорию</h3>
      <p>Вы уверены, что хотите удалить категорию "{{ categoryToDelete?.name }}"? Это действие необратимо.</p>
      <button class="event-modal__btn profile__delete-btn btn" @click="deleteCategory">Удалить</button>
      <button class="event-modal__btn btn" @click="showDeleteCategoryModal = false">Отмена</button>
    </div>
  </Modal>
  <Modal v-if="showDeleteTodoModal" @close="showDeleteTodoModal = false">
    <div class="event__modal modal">
      <h3 class="event-modal__title">Удалить событие</h3>
      <p>Вы уверены, что хотите удалить событие "{{ todoToDelete?.title }}"? Это действие необратимо.</p>
      <button class="event-modal__btn profile__delete-btn btn" @click="deleteTodo">Удалить</button>
      <button class="event-modal__btn btn" @click="showDeleteTodoModal = false">Отмена</button>
    </div>
  </Modal>
</template>
<script setup>
import { useEvents } from '@composables/useEvents';
import { animateAsideOpen, animateAsideClose } from '@utils/animations';

const { getUserEvents, saveUserEvents, addTodo, editTodo, deleteTodo: removeTodoFromStore } = useEvents();
const categories = ref([]);
const selectedCategory = ref(null);
const searchQuery = ref('');
const showCategoryModal = ref(false);
const showTodoModal = ref(false);
const newCategoryName = ref('');
const isMobile = ref(false);
const aside = ref(false);
const currentTodo = ref({
  title: '', 
  text: '', 
  status: 'pending', 
  img: 1 
});

const showDeleteAllCategoriesModal = ref(false);
const showDeleteCategoryModal = ref(false);
const showDeleteTodoModal = ref(false);
const categoryToDelete = ref(null);
const todoToDelete = ref(null);
const editingCategory = ref(null);

const shouldShowAside = computed(() => {
  return isMobile.value ? aside.value : true;
});

const toggleAside = () => {
  if (aside.value) {
    animateAsideClose('.profile__aside', () => {
      aside.value = false;
    });
  } else {
    aside.value = true;
    animateAsideOpen('.profile__aside');
  }
};

const handleResize = () => {
  isMobile.value = window.innerWidth <= 859;
  if (!isMobile.value) {
    aside.value = true;
  } else {
    aside.value = false;
  }
};

const pendingTodos = computed(() => selectedCategory.value?.todos.filter(todo => todo.status === 'pending') || []);

const inProgressTodos = computed(() => selectedCategory.value?.todos.filter(todo => todo.status === 'in-progress') || []);

const completedTodos = computed(() => selectedCategory.value?.todos.filter(todo => todo.status === 'completed') || []);

const filteredTodos = computed(() => {
  if (!selectedCategory.value?.todos) return [];
  const searchTerm = searchQuery.value.toLowerCase();
  return selectedCategory.value.todos.filter(todo => {
    const titleMatch = todo.title?.toLowerCase().includes(searchTerm);
    const textMatch = todo.text?.toLowerCase().includes(searchTerm);
    return titleMatch || textMatch;
  });
});

const addCategory = () => {
  const newCategory = { id: Date.now(), name: newCategoryName.value, todos: [] };
  categories.value.push(newCategory);
  newCategoryName.value = '';
  showCategoryModal.value = false;
  saveUserEvents(categories.value);
  selectCategory(newCategory);
  if (isMobile.value) {
    aside.value = false;
  }
};

const selectCategory = (category) => {
  selectedCategory.value = category;
  aside.value = !aside.value;
};

const openAddTodoModal = () => {
  currentTodo.value = { title: '', text: '', status: 'pending', img: null };
  showTodoModal.value = true;
};

const openEditTodoModal = (todo) => {
  currentTodo.value = { ...todo };
  showTodoModal.value = true;
};

const saveTodo = () => {
  if (currentTodo.value.id) {
    editTodo(selectedCategory.value, currentTodo.value);
  } else {
    addTodo(selectedCategory.value, currentTodo.value);
  }
  showTodoModal.value = false;
  currentTodo.value = { text: '', status: 'pending', img: null };
  saveUserEvents(categories.value);
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    currentTodo.value.img = e.target.result;
  };
  reader.readAsDataURL(file);
};
const clearImage = () => {
  currentTodo.value.img = null;
};

const openCategoryModal = () => {
  showCategoryModal.value = true;
  if (isMobile.value) {
    aside.value = false;
  }
};

const openDeleteAllCategoriesModal = () => {
  showDeleteAllCategoriesModal.value = true;
  if (isMobile.value) {
    aside.value = false;
  }
};

const deleteAllCategories = () => {
  categories.value = [];
  selectedCategory.value = null;
  showDeleteAllCategoriesModal.value = false;
  saveUserEvents(categories.value);
};

const openDeleteCategoryModal = (category) => {
  categoryToDelete.value = category;
  showDeleteCategoryModal.value = true;
};

const deleteCategory = () => {
  categories.value = categories.value.filter(category => category.id !== categoryToDelete.value.id);
  if (selectedCategory.value?.id === categoryToDelete.value.id) {
    selectedCategory.value = null;
  }
  showDeleteCategoryModal.value = false;
  saveUserEvents(categories.value);
};

const openEditCategoryModal = (category) => {
  editingCategory.value = category;
  newCategoryName.value = category.name;
  showCategoryModal.value = true;
};

const editCategory = () => {
  if (editingCategory.value) {
    editingCategory.value.name = newCategoryName.value;
    saveUserEvents(categories.value);
    showCategoryModal.value = false;
    newCategoryName.value = '';
    editingCategory.value = null;
  }
};

const openDeleteTodoModal = (todo) => {
  todoToDelete.value = todo;
  showDeleteTodoModal.value = true;
};

const deleteTodo = () => {
  removeTodoFromStore(selectedCategory.value, todoToDelete.value.id);
  showDeleteTodoModal.value = false;
  saveUserEvents(categories.value);
};

onMounted(() => {
  const userEvents = getUserEvents();
  if (userEvents.length) {
    categories.value = userEvents;
  }

  if (typeof window !== 'undefined') {
    handleResize();
    window.addEventListener('resize', handleResize);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize);
  }
});

watch(categories, (newCategories) => {
  saveUserEvents(newCategories);
}, { deep: true });
</script>
<style lang="sass">
@import @color
@import @fonts
@import @global
@import @mixin

.profile
  position: relative
  display: flex
  padding: 0px !important

.profile__aside 
  display: flex
  flex-direction: column
  gap: 10px
  border-radius: $radius
  padding: 10px
  width: 300px;
  background: $white

.profile__toggle-aside
  display: none

.profile__aside-btnblock
  display: flex
  flex-direction: row
  justify-content: space-between
  gap: 10px

.profile__aside-btn
  width: 100%

.profile__aside-btn--add
  display: none

.profile__delete-btn
  background: $red !important
  color: $white !important

.profile__categories
  display: flex 
  flex-direction: column
  height: 75vh
  overflow-y: auto
  gap: 20px

.profile__categories-item
  border-radius: $radius
  display: flex
  padding: 10px 0px
  background: $white
  flex-direction: column
  justify-content: space-between
  gap: 10px
  @include transition

  .profile__categories-text
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  .profile__categories-btnblock
    display: flex
    flex-direction: row
    justify-content: flex-end
    gap: 10px


.profile__main 
  padding: 20px
  width: 100%

.profile__main-welcome
  height: 100%
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  gap: 20px
  h1 
    text-align: center

.profile__todo 
  display: flex;
  flex-direction: column
  gap: 10px

.profile__todo-header
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
  gap: 10px
  h2
    width: 45vw
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

.profile__todo-status 
  display: flex;
  justify-content: space-between

.profile__todo-status-item 
  text-align: center

.profile__todo-list 
  max-height: 80vh
  overflow-y: auto
  list-style-type: none;
  padding: 0

.profile__todo-img
  object-fit: cover
  border-radius: $radius
  height: 20vh 
  width: 20vw

.profile__todo-item
  display: grid
  grid-template-columns: repeat(4, 1fr)
  gap: 20px
  align-items: center
  padding: 10px 0

  &.no-img
    grid-template-columns: repeat(3, 1fr)

.profile__todo-title
  text-align: center
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  
.profile__todo-text
  word-break: break-word
  display: -webkit-box
  -webkit-line-clamp: 3
  -webkit-box-orient: vertical
  overflow: hidden
  text-overflow: ellipsis

.modal
  display: flex
  flex-direction: column
  gap: 10px

.event__modal
  max-height: 80vh
  overflow-y: scroll
  scrollbar-width: none
  -ms-overflow-style: none 

.profile__todo-btnblock
  display: flex
  flex-direction: column
  gap: 20px

.event-modal__img
  object-fit: cover
  border-radius: $radius
  height: 40vh 

.event-modal__inpblock
  display: flex
  flex-direction: column
  gap: 5px
  align-items: flex-end

.event-modal__inp 
  width: 100%

.event-modal__file-upload
  position: relative
  width: 100%
  text-align: center
  cursor: pointer
  input[type="file"] 
    display: none
    opacity: 0
    right: 0
    top: 0
    cursor: pointer

@include hover 
  .profile__categories-item:hover
    background: $light-grey

@include mobile 
  .profile__categories-item:active
    background: $light-grey

  .profile__todo-item
    display: flex
    flex-direction: column 
    align-items: stretch

  .profile__todo-img
    height: 40vh
    width: 100%

  .profile__aside
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 9
    padding: 20px
    transform: translateX(-100%)
    @include transition

  .profile__categories
    height: 80vh

  .profile__aside-btn
    width: max-content

  .profile__aside-btn--add
    display: block

  .profile__toggle-aside
    display: block

</style>
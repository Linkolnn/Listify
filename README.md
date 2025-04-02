# Nuxt Minimal Starter

# Lisify

Проект Lisify сделан с использованием фрейморка Nuxt 3 и CryptoJS. Lisify даёт возможность создвать список дел и их категории   

## Описание компонента `app.vue`

Компонент `app.vue` является основным компонентом приложения. Он включает в себя заголовок (`Header`), основную часть (`NuxtPage`) и подвал (`Footer`). Основная часть (`main`) содержит страницу, которая будет отображаться в зависимости от маршрута. Стили компонента определены с использованием препроцессора SASS.

### Объяснение кода в `app.vue`

- `<Header/>` - компонент заголовка.
- `<main class="main">` - основная часть страницы, содержащая компонент `NuxtPage`, который отвечает за отображение текущей страницы.
- `<Footer/>` - компонент подвала.
- Стили определены с использованием SASS, включая импорт глобальных стилей и миксинов.

```vue
<template>
  <Header/>
  <main class="main">
    <NuxtPage/>
  </main>
  <Footer/>
</template>
<style lang="sass">
@import @color
@import @global
@import @mixin

.main
  display: flex
  flex-direction: column
  gap: 20px
  padding: 0px 20px

.section 
  border-radius: $radius
  padding: 10px
  background: $white
  min-height: 90vh

@include mobile
  .section
    min-height: 80vh

</style>
```

## Описание компонента `index.vue`

Компонент `index.vue` находится в папке `pages` и отвечает за отображение главной страницы приложения. Он включает в себя секции приветствия (`welcome`) и информации о проекте (`about`). В компоненте используется анимация для элементов страницы и проверка авторизации пользователя.

### Объяснение кода в `index.vue`

- Импортируются необходимые данные и функции: `data`, `animateBlocks`, `useAuth`.
- Проверяется текущий пользователь и его авторизация.
- При монтировании компонента вызывается функция `animateBlocks` для анимации элементов.
- В шаблоне компонента определены две секции: `welcome` и `about`.
- Стили компонента определены с использованием SASS, включая импорт глобальных стилей и миксинов.

```vue
<script setup>
import data from '@services/data';
import { animateBlocks } from '@utils/animations';
import { useAuth } from '@composables/useAuth';

const { currentUser } = useAuth();
const isAuth = !!currentUser.value;
const welcomeListBtn = data.welcomeListBtn(isAuth);

onMounted(() => {
    animateBlocks('.welcome__content > *, .about > *, .about__content > *', 0.2);
});
</script>
<template>
    <section class="welcome section">
        <div class="welcome__content">
            <h1 class="welcome__title font-h1">
              <IconProfile class="welcome__title-icon" filled /> Listify
            </h1>
            <p class="welcome__text font-text_extra-large">
              Listify это электронный органайзер, в котором можно создавать категории и уже в созданной категории составлять список дел. 
              <span>
                Все данные защищены при помощи Crypto Js, что обеспечивает высокий уровень безопасности и конфиденциальности ваших записей.
              </span>
            </p>
            <div class="welcome__btn-block">
              <NuxtLink v-for="btn in welcomeListBtn" :to="btn.url">
                <button class="welcome__btn btn font-button">
                  {{ btn.text }}
                </button>
              </NuxtLink>
            </div>
        </div>
    </section>
    <section class="about section" id="more">
        <img class="about__img" src="../assets/img/welcomeImg.png" alt="">
        <div class="about__content">
            <h1 class="about__title font-h1">
                <IconProfile class="about__title-icon" filled /> Listify
            </h1>
            <p class="about__text font-text_extra-large" lang="ru">
                Проект Listify это ваш надежный электронный органайзер. Создавайте категории и списки дел, чтобы организовать свои задачи и дела. 
            </p>
            <h4 class="font-h4">Основные возможности:</h4>
            <p class="about__text font-text_extra-large" >
                - Создание и управление категориями.
                - Составление списков дел в каждой категории.
                - Защита данных с помощью Crypto Js.
                - Удобный и интуитивно понятный интерфейс.
            </p>
            <p class="about__text font-text_extra-large" >
                Listify помогает вам оставаться организованным и продуктивным, предоставляя все необходимые инструменты для управления вашими задачами и делами.
            </p>
            <h4 class="font-h4">Безопасность данных:</h4>
            <p class="about__text font-text_extra-large" >
                Все данные в Listify защищены с использованием Crypto Js, что гарантирует высокий уровень безопасности и конфиденциальности ваших записей.
            </p>
            <p class="about__text font-text_extra-large" >
                Вы можете быть уверены, что ваши данные надежно защищены и доступны только вам.
            </p>
        </div>
    </section>
</template>
<style lang="sass">
@import @color
@import @fonts
@import @global
@import @mixin

.welcome  
    position: relative
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 10px
    overflow: hidden
    background: url('../assets/img/ornament.png') center

.welcome__title-icon
    width: 100px
    height: auto
    path[fill]
        fill: $black
    path[stroke]
        stroke: $black

.welcome__content
    border-radius: 40px
    background: $transparent
    padding: 20px
    width: 70%
    z-index: 2
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 10px

.welcome__title 
    text-align: center

.welcome__text
    color: $grey
    text-align: center

.welcome__btn-block
    display: flex
    align-items: center
    gap: 10px
    
    .font-button
        font-size: 24px !important

.about 
  display: flex
  flex-direction: row-reverse
  align-items: center
  justify-content: space-evenly
  gap: 20px
  background: url('../assets/img/ornament.png') center

.about__content 
    border-radius: 40px
    background: $transparent
    width: 70%
    padding: 10px
    display: flex
    flex-direction: column
    gap: 10px
    word-wrap: break-word
    hyphens: auto

    .font-h4
        margin-top: 10px
    
.about__title 
    align-self: center

.about__img
    border-radius: 40px
    width: 50%
    object-fit: cover

.about__title-icon
    width: 100px
    height: auto

.about__text
    word-wrap: break-word
    hyphens: auto

@include mobile
    .welcome__title-icon
        width: 60px

    .welcome__content
        width: 90%

    .welcome__text
        span
            display: none

    .font-text_extra-large
        font-size: 16px  !important

    .welcome__btn-block
        .font-button
            font-size: 16px !important

    .about 
        flex-direction: column
        gap: 10px

    .about__content
        width: 100% 

    .about__img
        width: 100%

    .about__title-icon
        width: 60px
</style>
```

## Описание компонента `login.vue`

Компонент `login.vue` находится в папке `pages` и отвечает за отображение страницы входа в систему. Он включает в себя форму входа (`Form`), которая позволяет пользователям вводить свои учетные данные для авторизации.

### Объяснение кода в `login.vue`

- В шаблоне компонента определена секция с классом `form__section-login`, содержащая компонент `Form` с типом `login`.
- Стили компонента определены с использованием SASS, включая импорт глобальных стилей и миксинов.

```vue
<template>
    <section class="form__section-login section">
        <Form type="login" />
    </section>
</template>
<style lang="sass">
@import @color
@import @global
@import @mixin

.form__section-login
    background: transparent !important
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 20px
    
</style>
```

## Описание компонента `profile.vue`

Компонент `profile.vue` находится в папке `pages` и отвечает за отображение страницы профиля пользователя. Он предоставляет интерфейс для управления категориями и событиями (todos), включая создание, редактирование, удаление и фильтрацию по статусу и поиску.

### Объяснение кода в `profile.vue`

- Используется композиция API Vue 3 с `<script setup>` для управления состоянием и логикой.
- Импортируется composable `useEvents` для работы с данными событий пользователя, включая функции для получения, сохранения, добавления, редактирования и удаления событий.
- Шаблон разделен на две основные части:
  - `aside` — боковая панель с категориями, где отображаются списки категорий с их статусами (в ожидании, в процессе, сделано) и кнопками для добавления/удаления категорий.
  - `main` — основная область, где отображаются события выбранной категории с возможностью поиска, фильтрации по статусу и управления событиями (добавление, редактирование, удаление).
- Реализованы модальные окна для создания/редактирования категорий и событий, а также подтверждения удаления.
- Поддерживается адаптивный дизайн: на мобильных устройствах боковая панель скрывается и вызывается кнопкой.
- Используются анимации для плавного открытия/закрытия боковой панели на мобильных устройствах.
- Состояние категорий и событий сохраняется с помощью функции `saveUserEvents`, а данные загружаются при монтировании компонента через `getUserEvents`.
- Реализована фильтрация событий по поисковому запросу и статусу, а также динамическое отображение количества событий в каждом статусе для категорий.

```vue
<template>
  <section class="profile section">
    <aside 
      class="profile__aside" 
      :class="{active: aside}"
      v-show="shouldShowAside"
    >
      <div class="profile__aside-header">
        <h2>Список событий</h2>
        <button v-if="isMobile" class="modal__close" @click="toggleAside">x</button>
      </div>
      <div class="profile__aside-btnblock">
        <button class="btn profile__aside-btn" @click="openCategoryModal">
          Добавить
        </button>
        <button class="btn profile__delete-btn" @click="openDeleteAllCategoriesModal">
          Удалить всё
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
          <div class="profile__todo-status">
            <div 
              class="profile__todo-status-item btn" 
              @click.stop="toggleStatusFilter('pending', category)"
            >
              <h3 class="font-text_medium">В ожидании</h3>
              <p>{{ getPendingCount(category) }}</p>
            </div>
            <div 
              class="profile__todo-status-item btn" 
              @click.stop="toggleStatusFilter('in-progress', category)"
            >
              <h3 class="font-text_medium">В процессе</h3>
              <p>{{ getInProgressCount(category) }}</p>
            </div>
            <div 
              class="profile__todo-status-item btn" 
              @click.stop="toggleStatusFilter('completed', category)"
            >
              <h3 class="font-text_medium">Сделано</h3>
              <p>{{ getCompletedCount(category) }}</p>
          
            </div>
          </div>
          <div class="profile__categories-btnblock">
            <button class="btn profile__category-btn profile__edit-btn" @click.stop="openEditCategoryModal(category)">
              Изменить
            </button>
            <button class="btn profile__category-btn profile__delete-btn" @click.stop="openDeleteCategoryModal(category)">
              х
            </button>
          </div>
        </li>
      </ul>
    </aside>
    <main class="profile__main">
      <div v-if="!selectedCategory" class="profile__main-welcome">
        <h1 v-show="!isMobile"> {{ categories == 0 ? 'Создайте' : 'Выберите' }} категорию из списка</h1>
        <h1 v-show="isMobile">Нажмите на кнопку чтобы {{ categories == 0 ? 'создать' : 'выбрать' }} категорию</h1>
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
            Список
          </button>
        </div>
        <input type="text" class="inp profile__search" v-model="searchQuery" placeholder="Поиск событий" />
        <button class="btn profile__add-todo" @click="openAddTodoModal">Создать событие</button>
        <ul class="profile__todo-list">
          <li v-for="todo in filteredTodos" @click="openEditTodoModal(todo)" :key="todo.id" :class="{'profile__todo-item': true, 'no-img': !todo.img}">
            <img class="profile__todo-img" v-if="todo.img" :src="todo.img" alt="Event image" />
            <h3 class="profile__todo-title">{{ todo.title }}</h3> 
            <span class="profile__todo-text"> {{ todo.text }} </span>
            <div class="profile__todo-btnblock" @click.stop>
              <select class="profile__todo-select inp" v-model="todo.status">
                <option value="pending">В ожидании</option>
                <option value="in-progress">В процессе</option>
                <option value="completed">Сделано</option>
              </select>
              <button class="btn profile__delete-btn" @click="openDeleteTodoModal(todo)">Удалить</button>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </section>
  <Modal v-if="showCategoryModal" @click.stop @close="handleCategoryModalClose">
    <div class="event__modal modal" @click.stop>
      <h3 class="event-modal__title">{{ editingCategory ? 'Изменить категорию' : 'Создать категорию' }}</h3>
      <div class="event-modal__inpblock">
        <input class="event-modal__inp inp" @click.stop @touchstart.stop type="text" maxlength="40" v-model="newCategoryName" required placeholder="Название категории" />
        <p>{{ newCategoryName.length }}/40</p>
      </div>
      <button class="event-modal__btn btn" @click="editingCategory ? editCategory() : addCategory()">
        {{ editingCategory ? 'Изменить' : 'Создать' }}
      </button>      
    </div>
  </Modal>
  <Modal v-if="showTodoModal" @close="closeTodoModal">
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
        <option value="in-progress">В процессе</option>
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
  <Modal v-if="showDeleteAllCategoriesModal" @close="closeDeleteAllCategoriesModal">
    <div class="event__modal modal">
      <h3 class="event-modal__title">Удалить все категории</h3>
      <p>Вы уверены, что хотите удалить все категории? Это действие необратимо.</p>
      <button class="event-modal__btn profile__delete-btn btn" @click="deleteAllCategories">Удалить</button>
    </div>
  </Modal>
  <Modal v-if="showDeleteCategoryModal" @close="closeDeleteCategoryModal">
    <div class="event__modal modal">
      <h3 class="event-modal__title">Удалить категорию</h3>
      <p>Вы уверены, что хотите удалить категорию "{{ categoryToDelete?.name }}"? Это действие необратимо.</p>
      <button class="event-modal__btn profile__delete-btn btn" @click="deleteCategory">Удалить</button>
    </div>
  </Modal>
  <Modal v-if="showDeleteTodoModal" @close="closeDeleteTodoModal">
    <div class="event__modal modal">
      <h3 class="event-modal__title">Удалить событие</h3>
      <p>Вы уверены, что хотите удалить событие "{{ todoToDelete?.title }}"? Это действие необратимо.</p>
      <button class="event-modal__btn profile__delete-btn btn" @click="deleteTodo">Удалить</button>
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
const selectedStatus = ref(null);
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

const toggleBodyScroll = (disable) => {
  if (disable) {
    document.body.style.overflow = 'hidden';
  } else {
        document.body.style.overflow = '';
  }
};

const toggleStatusFilter = (status, category) => {
  if (selectedCategory.value?.id !== category.id) {
    selectCategory(category);
  }
  
  if (selectedStatus.value === status) {
    // Сбрасываем фильтр при повторном клике
    selectedStatus.value = null;
  } else {
    selectedStatus.value = status;
  }
  toggleAside()
};

const toggleAside = () => {
  if (!isMobile.value) return 
  
  if (aside.value) {
    animateAsideClose('.profile__aside', () => {
      aside.value = false
    })
  } else {
    aside.value = true
    animateAsideOpen('.profile__aside')
  }
}

const handleCategoryModalClose = () => {
  showCategoryModal.value = false
  editingCategory.value = null 
  newCategoryName.value = '' 
  toggleBodyScroll(false);
}

const handleResize = () => {
  const wasMobile = isMobile.value;
  isMobile.value = window.innerWidth <= 859;
  if (wasMobile !== isMobile.value) {
    if (!isMobile.value) {
      aside.value = true;
      ;
    } else {
      aside.value = false;
      ;
    }
  }
};

const getPendingCount = (category) => {
  return category.todos?.filter(todo => todo.status === 'pending').length || 0
}

const getInProgressCount = (category) => {
  return category.todos?.filter(todo => todo.status === 'in-progress').length || 0
}

const getCompletedCount = (category) => {
  return category.todos?.filter(todo => todo.status === 'completed').length || 0
}


const filteredTodos = computed(() => {
  if (!selectedCategory.value?.todos) return [];
  const searchTerm = searchQuery.value.toLowerCase();
  
  return selectedCategory.value.todos.filter(todo => {
    // Фильтрация по поиску
    const titleMatch = todo.title?.toLowerCase().includes(searchTerm);
    const textMatch = todo.text?.toLowerCase().includes(searchTerm);
    
    // Фильтрация по статусу
    const statusMatch = !selectedStatus.value || todo.status === selectedStatus.value;
    
    return (titleMatch || textMatch) && statusMatch;
  });
});


const addCategory = () => {
  const newCategory = { id: Date.now(), name: newCategoryName.value, todos: [] };
  categories.value.push(newCategory);
  newCategoryName.value = '';
  showCategoryModal.value = false;
  saveUserEvents(categories.value);
  selectCategory(newCategory);
  toggleBodyScroll(false);
};

const selectCategory = (category) => {
  selectedCategory.value = category;
  selectedStatus.value = null; // Сбрасываем фильтр при смене категории
  searchQuery.value = ''; // Сбрасываем поиск
  toggleAside();
};
const openAddTodoModal = () => {
  currentTodo.value = { title: '', text: '', status: 'pending', img: null };
  showTodoModal.value = true;
  toggleBodyScroll(true);
};

const openEditTodoModal = (todo) => {
  currentTodo.value = { ...todo };
  showTodoModal.value = true;
  toggleBodyScroll(true);
};

const closeTodoModal = () => {
  showTodoModal.value = false;
  toggleBodyScroll(false);
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
  toggleBodyScroll(false);
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
  toggleBodyScroll(true);
};

const openDeleteAllCategoriesModal = () => {
  showDeleteAllCategoriesModal.value = true;
  toggleBodyScroll(true);
};

const deleteAllCategories = () => {
  categories.value = [];
  selectedCategory.value = null;
  showDeleteAllCategoriesModal.value = false;
  saveUserEvents(categories.value);
  toggleBodyScroll(false);
};

const closeDeleteAllCategoriesModal = () => {
  showDeleteAllCategoriesModal.value = false;
  toggleBodyScroll(false);
};

const openDeleteCategoryModal = (category) => {
  categoryToDelete.value = category;
  showDeleteCategoryModal.value = true;
  toggleBodyScroll(true);
};

const deleteCategory = () => {
  categories.value = categories.value.filter(category => category.id !== categoryToDelete.value.id);
  if (selectedCategory.value?.id === categoryToDelete.value.id) {
    selectedCategory.value = null;
  }
  showDeleteCategoryModal.value = false;
  saveUserEvents(categories.value);
  toggleBodyScroll(false);
};

const closeDeleteCategoryModal = () => {
  showDeleteCategoryModal.value = false;
  toggleBodyScroll(false);
};

const openEditCategoryModal = (category) => {
  editingCategory.value = category;
  newCategoryName.value = category.name;
  showCategoryModal.value = true;
  toggleBodyScroll(true);
};

const editCategory = () => {
  if (editingCategory.value) {
    editingCategory.value.name = newCategoryName.value;
    saveUserEvents(categories.value);
    showCategoryModal.value = false;
    newCategoryName.value = '';
    editingCategory.value = null;
    toggleBodyScroll(false);
  }
};

const openDeleteTodoModal = (todo) => {
  todoToDelete.value = todo;
  showDeleteTodoModal.value = true;
  toggleBodyScroll(true);
};

const deleteTodo = () => {
  removeTodoFromStore(selectedCategory.value, todoToDelete.value.id);
  showDeleteTodoModal.value = false;
  saveUserEvents(categories.value);
  toggleBodyScroll(false);
};

const closeDeleteTodoModal = () => {
  showDeleteTodoModal.value = false;
  toggleBodyScroll(false);
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
  max-height: 90vh

.profile__aside 
  display: flex
  flex-direction: column
  gap: 10px
  border-radius: $radius
  padding: 10px
  width: 350px;
  background: $white

.profile__toggle-aside
  display: none

.profile__aside-btnblock
  display: flex
  flex-direction: column
  gap: 10px

.profile__aside-btn
  width: 100%

.profile__aside-btn--add
  display: none

.profile__edit-btn
  width: 100%

.profile__delete-btn
  background: $red !important
  color: $white !important

.profile__categories
  display: flex 
  flex-direction: column
  overflow-y: auto
  gap: 20px

.profile__categories-item
  border-radius: $radius
  display: flex
  cursor: pointer
  padding: 10px 
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
  display: flex
  flex-direction: column
  gap: 10px
  overflow: hidden

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
  flex-grow: 1
  overflow: hidden 

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

.profile__todo-status-item.btn 
  text-align: center
  padding: 5px


  .font-text_medium
    font-size: 12px

.profile__todo-list 
  flex-grow: 1
  overflow-y: auto
  list-style-type: none;
  padding: 0

.profile__todo-img
  object-fit: cover
  border-radius: $radius
  height: 10vh 
  width: 10vw

.profile__todo-item
  display: grid
  grid-template-columns: max-content repeat(3, 1fr)
  gap: 20px
  align-items: center
  padding: 10px
  cursor: pointer
  @include transition
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
  position: relative
  z-index: 10
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
  
  .profile__todo-item:hover
    background: $light-grey

    .profile__todo-select
      background: $white

@include mobile 
  .profile__categories-item:active
    background: $light-grey

  .profile__todo-item
    display: flex
    flex-direction: column 
    align-items: stretch
    
  .profile__todo-item:active
    background: $light-grey

  .profile__todo-img
    height: 40vh
    width: 100%

  .profile__aside
    position: absolute
    overflow: hidden
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 8
    padding: 20px
    transform: translateX(-100%)
    @include transition

  .profile__aside-btnblock
    flex-direction: row

  .profile__aside-btn
    width: max-content

  .profile__aside-btn--add
    display: block

  .profile__toggle-aside
    display: block

</style>
```

## Описание компонента `register.vue`

Компонент `register.vue` находится в папке `pages` и отвечает за отображение страницы регистрации нового пользователя. Он включает в себя форму регистрации (`Form`), которая позволяет пользователям вводить свои данные для создания новой учетной записи.

### Объяснение кода в `register.vue`

- В шаблоне компонента определена секция с классом `form__section-register`, содержащая компонент `Form` с типом `register`.
- Стили компонента определены с использованием SASS, включая импорт глобальных стилей и миксинов.

```vue
<template>
    <section class="form__section-register section">
        <Form type="register" />
    </section>
</template>
<style lang="sass">
@import @color
@import @global
@import @mixin

.form__section-register
    background: transparent !important
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 20px
    
</style>
```

## Описание компонента `Form.vue`

Компонент `Form.vue` находится в папке `components` и отвечает за отображение формы для входа и регистрации пользователей. Он включает в себя поля ввода для имени пользователя, электронной почты и пароля, а также кнопки для отправки формы.

### Объяснение кода в `Form.vue`

- Импортируются необходимые данные и функции: `useAuth`.
- Определяются свойства компонента и реактивные переменные.
- В шаблоне компонента определена форма с полями ввода для имени пользователя, электронной почты и пароля.
- Стили компонента определены с использованием SASS, включая импорт глобальных стилей и миксинов.

```vue
<script setup>
import { useAuth } from '@composables/useAuth';
import { animateBlocks } from '@utils/animations';

const props = defineProps(['type']);
const name = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const { register, login } = useAuth();
const router = useRouter();

const handleSubmit = () => {
  if (props.type === 'register') {
    if (password.value !== confirmPassword.value) {
      errorMessage.value = 'Пароли не совпадают';
      return;
    }
    if (register(name.value, password.value)) {
      router.push('/profile');
    } else {
      errorMessage.value = 'Ошибка регистрации';
    }
  } else {
    if (login(name.value, password.value)) {
      router.push('/profile');
    } else {
      errorMessage.value = 'Неверные имя или пароль';
    }
  }
};

onMounted(() => {
  animateBlocks('.form > *', 0.2);
});
</script>

<template>
    <form @submit.prevent="handleSubmit" :class="['form', type ? 'register__form' : 'login__form']">
        <h3 class="form__title font-h3">
            {{ type === 'register' ? 'Регистрация' : 'Авторизация' }}
        </h3>
        <label class="form__label font-text_medium">Имя</label>
        <input class="inp form__input" v-model="name" type="text" required />
        <label class="form__label font-text_medium">Пароль</label>
        <input class="inp form__input" v-model="password" type="password" required />
        <template v-if="type === 'register'">
            <label class="form__label font-text_medium">Повторите пароль</label>
            <input class="inp form__input" v-model="confirmPassword" type="password" required />
        </template>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <button class="btn font-button form__btn" type="submit">
                {{ type === 'register' ? 'Зарегистрироваться' : 'Войти' }}
            </button>
    </form>
</template>
<style lang="sass">
@import @color
@import @global
@import @mixin

.form 
  background: $white
  border-radius: $radius
  display: flex
  flex-direction: column
  padding: 20px
  gap: 20px
  width: 700px

.error-message
  border-radius: $radius
  color: $red
  padding: 5px
  @include transition
  
.form__btn
  background: $yellow !important

@include hover
  .form__btn:hover
      background: $light-grey !important

@include mobile
  .form
    max-width: 350px
    width: 100%

  .form__btn:active
    background: $light-grey !important

</style>
```

## Описание компонента `Header.vue`

Компонент `Header.vue` находится в папке `components` и отвечает за отображение заголовка страницы. Он включает в себя логотип и навигационное меню.

### Объяснение кода в `Header.vue`

- В шаблоне компонента определен заголовок с классом `header`, содержащий ссылку на главную страницу с логотипом и компонент `NavMenu`.
- Стили компонента определены с использованием SASS, включая импорт глобальных стилей и миксинов.

```vue
<template>
    <header class="header">
        <NuxtLink class="header__logo-link" to="/">
            <button class="header__logo-btn btn">
                <IconLogo class="header__logo-icon" filled/>
            </button>
        </NuxtLink>
        <NavMenu type="header"/>
    </header>
</template>
<style lang="sass">
@import @color
@import @global
@import @mixin

.header
    display: flex
    flex-direction: row
    justify-content: space-between
    padding: 20px

.header__logo-btn
    border-radius: 50% !important

.header__logo-icon 
    width: 25px
    height: 25px

</style>
```

## Описание компонента `Footer.vue`

Компонент `Footer.vue` находится в папке `components` и отвечает за отображение подвала страницы. Он включает в себя логотип и навигационное меню.

### Объяснение кода в `Footer.vue`

- В шаблоне компонента определен подвал с классом `footer`, содержащий ссылку на главную страницу с логотипом и компонент `NavMenu`.
- Стили компонента определены с использованием SASS, включая импорт глобальных стилей и миксинов.

```vue
<template>
    <footer class="footer">
        <NuxtLink class="footer__logo-link" to="/">
            <button class="footer__logo-btn btn">
                <IconLogo class="footer__logo-icon" filled/>
                map
            </button>
        </NuxtLink>
        <NavMenu type="footer"/>
    </footer>
</template>
<style lang="sass">
@import @color
@import @global
@import @mixin

.footer
    display: flex
    flex-direction: row
    justify-content: space-between
    gap: 10px
    padding: 20px

.footer__logo-link
    width: max-content

.footer__logo-icon 
    width: 25px
    height: 25px
    transform: translateX(10%)

@include mobile
    .footer
        flex-direction: column

</style>
```

## Описание компонента `NavMenu.vue`

Компонент `NavMenu.vue` находится в папке `components` и отвечает за отображение навигационного меню. Он включает в себя ссылки на различные страницы и выпадающее меню для профиля пользователя.

### Объяснение кода в `NavMenu.vue`

- Импортируются необходимые данные и функции: `data`, `animateDropdownOpen`, `animateDropdownClose`, `useAuth`.
- Определяются свойства компонента и реактивные переменные.
- В шаблоне компонента определено навигационное меню с классами, зависящими от типа меню (`header` или `footer`).
- Если элемент меню является профилем, отображается кнопка профиля с выпадающим меню.
- Стили компонента определены с использованием SASS, включая импорт глобальных стилей и миксинов.

```vue
<script setup>
import data from '@services/data';
import { animateDropdownOpen, animateDropdownClose } from '@utils/animations';

const props = defineProps(['type']);
const { logout, currentUser } = useAuth();
const showDropdown = ref(false);

const menuItems = computed(() => 
  data.navMenuItems(props.type, !!currentUser.value)
);

const handleLogout = () => {
  logout();
  navigateTo('/');
  showDropdown.value = false;
};

const toggleDropdown = () => {
  if (showDropdown.value) {
    animateDropdownClose('.dropdown-menu');
    setTimeout(() => {
      showDropdown.value = false;
    }, 300); 
  } else {
    showDropdown.value = true;
    nextTick(() => {
      animateDropdownOpen('.dropdown-menu');
    });
  }
};
</script>

<template>
    <nav :class="[type === 'header' ? 'header__menu' : 'footer__menu']">
        <ul :class="[type === 'header' ? 'header__list' : 'footer__list']">
            <li 
              v-for="item in menuItems" 
              :class="[type === 'header' ? 'header__list-items' : 'footer__list-items']"
            >
                <template v-if="item.isProfile">
                    <div class="profile-menu">
                        <button 
                          class="profile-btn btn"
                          @click="toggleDropdown"
                        >
                          <IconProfile class="profile-icon" filled/>
                        </button>
                        <div v-show="showDropdown" class="dropdown-menu">
                            <div class="dropdown-header">
                              <IconProfile class="dropdown-icon" filled/>
                              <span class="font-text_medium" v-if="currentUser">{{ currentUser.name }}</span>
                            </div>
                            <div class="dropdown-btnblock">
                              <NuxtLink
                                to="/profile"
                                class="dropdown-item btn"
                                @click="showDropdown = false"
                              >
                                Профиль
                              </NuxtLink>
                              <button
                                class="dropdown-item btn"
                                @click="handleLogout"
                              >
                                Выйти
                              </button>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <NuxtLink
                      v-if="!item.url.startsWith('#')" 
                      :class="[type === 'header' ? 'header__list-link' : 'footer__list-link']" 
                      :to="item.url"
                    >
                        <button class="btn font-button">
                          {{ item.text }}
                        </button>
                    </NuxtLink>
                    <button
                      v-else 
                      @click="item.url === '#logout' ? handleLogout() : null"           
                      class="btn font-button"
                    >
                      {{ item.text }}
                    </button>
                </template>
            </li>
        </ul>
    </nav>
</template>

<style lang="sass">
@import @color
@import @global
@import @mixin

.profile-menu
  position: relative
  margin-left: 15px

.profile-btn
  width: 40px
  height: 40px
  border-radius: 50% !important
  cursor: pointer
  display: flex
  align-items: center
  justify-content: center
  padding: 0
  @include transition

.profile-icon
  width: 25px
  height: 25px

.dropdown-menu
  position: absolute
  top: 50px
  right: 0
  background: $white
  display: flex
  flex-direction: column
  align-items: center
  gap: 10px
  min-width: 200px
  z-index: 10
  padding: 20px 0px

.dropdown-header
  display: flex
  flex-direction: column
  align-items: center
  gap: 10px

.dropdown-icon
  width: 40px
  height: 40px

.dropdown-item
  text-align: center
  width: max-content

.header__menu,
.footer__menu 
  display: flex
  flex-direction: row
  align-items: center

.footer__list
  display: flex
  flex-direction: row
  gap: 10px   

.header__list
    display: flex
    flex-direction: row
    gap: 10px 
    align-items: center

.header__list-link,
.footer__list-link 
    color: $black

@include mobile
  .header__list,
  .footer__list
    gap: 10px

</style>
```

## Описание компонента `useAuth.js`

Компонент `useAuth.js` находится в папке `composables` и отвечает за управление аутентификацией пользователей. Он включает в себя функции для регистрации, входа и выхода пользователей, а также хранение данных пользователей в куки-файлах.

### Объяснение кода в `useAuth.js`

- Импортируются необходимые библиотеки и функции: `CryptoJS`, `useCookie`.
- Определяются куки для хранения данных пользователей и текущего пользователя.
- Функция `hashPassword` хэширует пароль с использованием соли.
- Функция `register` регистрирует нового пользователя, проверяя, существует ли пользователь с таким именем, и сохраняет данные в куки.
- Функция `login` проверяет данные пользователя и устанавливает текущего пользователя в куки.
- Функция `logout` удаляет данные текущего пользователя из куки.

```javascript
import CryptoJS from 'crypto-js';
import { useCookie } from '#app';

export function useAuth() {
  const config = useRuntimeConfig();
  const salt = config.public.salt;

  const users = useCookie('auth_users', { 
    default: () => ({}),
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 172800 
  });

  const currentUser = useCookie('current_user', {
    default: () => null,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 172800 
  });

  const hashPassword = (password) => CryptoJS.SHA256(password + salt).toString();

  const register = (name, password) => {
    if (users.value[name]) {
      alert('❌ Пользователь уже существует');
      return false;
    }

    users.value = {
      ...users.value,
      [name]: {
        password: hashPassword(password),
        createdAt: new Date().toISOString()
      }
    };

    currentUser.value = { name, lastLogin: new Date().toISOString() };
    return true;
  };

  const login = (name, password) => {
    const user = users.value[name];
    
    if (!user || user.password !== hashPassword(password)) {
      alert('❌ Неверные данные');
      return false;
    }

    currentUser.value = { name, lastLogin: new Date().toISOString() }; 
    return true;
  };

  const logout = () => {
    try {
      currentUser.value = null;
      useCookie('current_user').value = null; // Явное удаление куки
      return true;
    } catch (error) {
      alert('Ошибка при выходе:', error);
      return false;
    }
  };
  
  return { 
    users: computed(() => users.value),
    currentUser: computed(() => currentUser.value),
    register,
    login,
    logout
  };
}
```

## Описание компонента `useEvents.js`

Компонент `useEvents.js` находится в папке `composables` и отвечает за управление пользовательскими метками на карте. Он включает в себя функции для сохранения и получения меток, а также для работы с изображениями меток.

### Объяснение кода в `useEvents.js`

- Импортируются необходимые библиотеки и функции: `useCookie`, `useAuth`, `useImageStore`.
- Определяются куки для хранения меток пользователей.
- Функция `saveUserPlacemarks` сохраняет метки текущего пользователя, исключая изображения, которые сохраняются отдельно.
- Функция `getUserPlacemarks` получает метки текущего пользователя и добавляет к ним изображения из хранилища.

```javascript
import { useCookie } from '#app';
import { useAuth } from '@composables/useAuth';
import { useImageStore } from '@composables/useImageStore';

export function useEvents() {
  const { currentUser } = useAuth();
  const { saveImage, getImage } = useImageStore();
  
  const Events = useCookie('user_Events', {
    default: () => ({}),
    sameSite: 'strict',
    path: '/',
    maxAge: 172800
  });

  const saveUserEvents = async (userEvents) => {
    if (!currentUser.value) return;

    const EventsWithoutImages = userEvents.map(placemark => {
      if (placemark.img) {
        saveImage(placemark.id, placemark.img);
      }
      const { img, ...placemarkWithoutImage } = placemark;
      return placemarkWithoutImage;
    });

    const username = currentUser.value.name;
    Events.value = { 
      ...Events.value,
      [username]: EventsWithoutImages
    };
  };

  const getUserEvents = () => {
    if (!currentUser.value) return [];
    
    const username = currentUser.value.name;
    return (Events.value[username] || []).map(placemark => ({
      ...placemark,
      img: getImage(placemark.id)
    }));
  };

  return { getUserEvents, saveUserEvents };
}
```

## Описание компонента `useImageStore.js`

Компонент `useImageStore.js` находится в папке `composables` и отвечает за управление изображениями меток. Он включает в себя функции для сохранения, получения и удаления изображений.

### Объяснение кода в `useImageStore.js`

- Функция `saveImage` сохраняет изображение в `localStorage` по идентификатору метки.
- Функция `getImage` получает изображение из `localStorage` по идентификатору метки.
- Функция `deleteImage` удаляет изображение из `localStorage` по идентификатору метки.

```javascript
export function useImageStore() {
  const saveImage = (id, imageData) => {
    localStorage.setItem(`Events_image_${id}`, imageData);
  };

  const getImage = (id) => {
    return localStorage.getItem(`Events_image_${id}`) || '';
  };

  const deleteImage = (id) => {
    localStorage.removeItem(`Events_image_${id}`);
  };

  return {
    saveImage,
    getImage,
    deleteImage
  };
}
```

## Описание компонента `cookie.js`

Компонент `cookie.js` находится в папке `plugins`.

### Код в `cookie.js`

```javascript
import { defineNuxtPlugin } from '#app';
import Cookies from 'js-cookie';

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      cookies: Cookies
    }
  }
});
```

## Описание компонента `router.ts`

Компонент `router.ts` находится в папке `plugins`.

### Код в `router.ts`

```typescript
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:created", () => {
    const router = useRouter();
    router.options.scrollBehavior = (to, from, savedPosition) => {
      if (to.hash) {
        const element = document.querySelector(to.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return false; // отменяем стандартное поведение
        }
      }
      return { top: 0, behavior: "smooth" };
    };
  });
});
```

## Описание компонента `nuxt.config.ts`

Компонент `nuxt.config.ts` находится в папке проекта.

### Код в `nuxt.config.ts`

```typescript
import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['nuxt-svgo'],
  alias: {
    '@color' : resolve(__dirname, 'assets/color.sass'),
    '@mixin' : resolve(__dirname, 'assets/mixin.sass'),
    '@global' : resolve(__dirname, 'assets/global.sass'),
    '@fonts' : resolve(__dirname, 'assets/fonts.sass'),
    '@composables' : resolve(__dirname, '/composables'),
    '@services' : resolve(__dirname, '/services'),
    '@utils' : resolve(__dirname, '/utils'),
  },

  app: {
    head: {
      script: [
        {
          src: 'https://api-maps.yandex.ru/2.1/?apikey=8c153f10-4f81-4adc-bf29-7321c5d48ce3&lang=ru_RU',
          async: true,
        }
      ],
      title: 'Umap',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
          sizes: 'any'
        },
      ]
    }
  },
  svgo: {
    autoImportPath: "./assets/icons/",
    componentPrefix: "Icon",
    svgoConfig: {
      plugins: [
        { 
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
            }
          }
        }
      ]
    }
  },
})
```

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on http://localhost:3000:

```
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build

```

Locally preview production build:

```
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview

```
Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
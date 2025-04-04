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
        <div class="welcome__map"></div>
        <MapComponent />
        <div class="welcome__content">
            <h1 class="welcome__title font-h1">
              <IconLogo class="welcome__title-icon" filled /> map
            </h1>
            <p class="welcome__text font-text_extra-large">
              Проект Umap представляет собой веб-приложение, использующее API Яндекс.
              <span>
                Карт для отображения интерактивной карты с возможностью создания пользовательских меток (placeMark). 
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
                <IconLogo class="about__title-icon" filled /> map
            </h1>
            <p class="about__text font-text_extra-large" lang="ru">
                Umap сочетает в себе возможности интерактивных карт Яндекса с расширенным функционалом пользовательских меток и безопасной системой управления пользователями.
            </p>
            <h4 class="font-h4">Создание пользовательских меток (placeMark):</h4>
            <p class="about__text font-medium" lang="ru">
                1. Пользователи могут добавлять на карту собственные метки с кастомным дизайном и содержимым.
            </p>
            <p class="about__text font-medium" lang="ru">
                2. Для создания кастомных меток используется параметр iconLayout, позволяющий задать HTML-шаблон для отображения метки.
            </p>
            <h4 class="font-h4">Регистрация и авторизация пользователей:</h4>
            <p class="about__text font-medium" lang="ru">
                1. Система предоставляет функционал регистрации новых пользователей и авторизации существующих.
            </p>
            <p class="about__text font-medium" lang="ru">
                2. Данные пользователей, такие как токены аутентификации, сохраняются в куки-файлах для обеспечения сессий.
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
    
    #map
        border: 10px solid $white
        position: absolute
        height: 100%
        width: 100%

.welcome__map
    z-index: 1
    position: absolute
    height: 100%
    width: 100%
    background: #ffffff80

.welcome__title-icon
    width: 100px
    height: auto
    transform: translateX(10%)

.welcome__content
    border-radius: $radius
    background: $white
    padding: 20px
    width: 70%
    z-index: 2
    display: flex
    flex-direction: column
    align-items: center
    justify-content: flex-end
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

.welcome__btn
    background: $yellow !important

.about 
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-evenly
  gap: 20px

.about__content 
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
    width: 50%
    object-fit: cover

.about__title-icon
    width: 100px
    height: auto
    transform: translateX(10%)

.about__text
    word-wrap: break-word
    hyphens: auto

@include hover
    .welcome__btn:hover
        background: $light-grey !important


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

    .welcome__btn:active
        background: $light-grey !important

    .about 
        flex-direction: column
        gap: 10px

    .about__img
        width: 100%

    .about__title-icon
        width: 60px

    .about__text
        word-wrap: break-word
        hyphens: auto

</style>
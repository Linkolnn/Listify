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
    border-radius: $radius
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
    border-radius: $radius
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
    border-radius: $radius
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
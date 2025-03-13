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
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              <span>
                Totam quos amet facere eos consequatur ipsam saepe itaque distinctio culpa sapiente. Eius ullam nisi dolor quo perferendis cum, dolorem quod porro!
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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda eligendi dolorum dignissimos. Neque natus tempora iure, consequatur nulla ducimus illum adipisci eos, blanditiis libero iusto sunt quibusdam, quas quo praesentium?
            </p>
            <h4 class="font-h4">Lorem ipsum dolor sit, amet consectetur adipisicing elit:</h4>
            <p class="about__text font-medium" lang="ru">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, delectus aperiam magni magnam veniam impedit laborum cum nobis facere fugit sapiente ab illo praesentium doloribus. Porro labore repellat pariatur sapiente.            
            </p>
            <p class="about__text font-medium" lang="ru">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, delectus aperiam magni magnam veniam impedit laborum cum nobis facere fugit sapiente ab illo praesentium doloribus. Porro labore repellat pariatur sapiente.
            </p>
            <h4 class="font-h4">Lorem ipsum dolor sit, amet consectetur adipisicing elit:</h4>
            <p class="about__text font-medium" lang="ru">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, delectus aperiam magni magnam veniam impedit laborum cum nobis facere fugit sapiente ab illo praesentium doloribus. Porro labore repellat pariatur sapiente.            </p>
            <p class="about__text font-medium" lang="ru">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, delectus aperiam magni magnam veniam impedit laborum cum nobis facere fugit sapiente ab illo praesentium doloribus. Porro labore repellat pariatur sapiente.            </p>
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

.welcome__title-icon
    width: 100px
    height: auto

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

    .about__img
        width: 100%

    .about__title-icon
        width: 60px

    .about__text
        word-wrap: break-word
        hyphens: auto

</style>
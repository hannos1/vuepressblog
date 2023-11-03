<template>
  <div class="container">
    <img :src="props.imgPath" v-if="!isShowError" alt="" @error="showError" />
    <div class="errorImgMask" v-else>
      <img :src="errorPath" alt="error" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  imgPath: String,
});
const errorPath = ref("/asset/error.png");
const isShowError = ref(false);

const showError = (e) => {
  isShowError.value = true;
};
</script>

<style lang="stylus" scoped>
.container{
    width:100px;
    height:100px;
}
img{
    width:100px;
    height:100px;
    background-size:cover;
}
</style>

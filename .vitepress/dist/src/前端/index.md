---
hello: world
---

# 目录
<script setup>
// import { ref } from 'vue'
import { useData } from 'vitepress'
const { theme, site } = useData()
const base = removeTrailingSlash(site.value.base)
// const count = ref(0)
function removeTrailingSlash(str) {
    if (str.endsWith('/')) {
        return str.slice(0, -1);
    }
    return str;
}

</script>
<!-- <pre> {{theme.nav}} </pre> -->

<div v-for="item in theme.nav">
  <div v-if="item.text === '前端'">
    <p v-for="i in item.items"> <a :href="`${base}${i.link}`">{{ i.text }}</a> </p>
  </div>
</div>


<style module>
a {
  cursor: pointer;
}
</style>
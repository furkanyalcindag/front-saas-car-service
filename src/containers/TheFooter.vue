<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://www.comitfy.com" target="_blank"></a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} comitfylabs.</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Powered by</span>
      <a href="https://www.comitfy.com" target="_blank">comitfy</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<template>
  <div>
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  background-color: ghostwhite;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

table {
  background-color: white;

  th > * {
    text-align: center;
  }

  td {
    text-align: center;
  }
}
</style>

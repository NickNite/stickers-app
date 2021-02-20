<template>
  <div id="main">
    <div class="header">
      <h1>Brokul-Sticker</h1>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#main {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 800px;
  margin: 1.5% auto;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 1px 15px 6px rgba(34, 60, 80, 0.2);
}
.header {
  display: flex;
  justify-content: left;
  align-items: center;
  color: #d9f2fc;
  border-radius: 5px 5px 0 0;
  background-image: url(./assets/o-nas-header.png);
  height: 100px;
  h1 {
    margin-left: 20px;
  }
}
</style>

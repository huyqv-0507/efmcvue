<template>
  <div class="exception-body notfound">
    <div class="exception-topbar">
      <a id="logolink" @click="goDashboard" class="layout-topbar-logo">
        <img
          :src="
            'assets/layout/images/logo-' +
            (colorScheme === 'dark' ? 'freya-white' : 'freya') +
            '.svg'
          "
          alt="freya-layout"
        />
      </a>
    </div>
    <div class="exception-wrapper">
      <div class="exception-content">
        <img
          src="assets/layout/images/pages/asset-404.svg"
          alt="freya-layout"
        />
        <span>404</span>
        <span class="exception-subtitle">Looks like you are lost.</span>
        <Button
          type="button"
          label="Go back to home"
          @click="goDashboard"
        ></Button>
      </div>
      <div class="exception-footer p-mt-4">
        <h4>freya</h4>
        <h6>Copyright Ⓒ PrimeTek Informatics</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    colorScheme () {
      return this.$appState.colorScheme
    }
  },
  methods: {
    goDashboard () {
      window.location = '/#/'
    }
  }
}
</script>

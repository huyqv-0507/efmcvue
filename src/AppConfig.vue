<template>
    <div id="layout-config">
        <a id="layout-config-button" class="layout-config-button" @click="onConfigButtonClick($event)">
            <i class="pi pi-cog"></i>
        </a>
        <div class="layout-config" :class="{ 'layout-config-active': configActive }" @click="onConfigClick">
            <h5>Loại menu</h5>
            <div class="p-field-radiobutton">
                <RadioButton name="menuMode" value="horizontal" v-model="d_menuMode" id="mode1" @change="changeMenuMode('horizontal')"></RadioButton>
                <label for="mode1">Ngang</label>
            </div>
            <div class="p-field-radiobutton">
                <RadioButton name="menuMode" value="sidebar" v-model="d_menuMode" id="mode2" @change="changeMenuMode('sidebar')"></RadioButton>
                <label for="mode2">Thanh bên</label>
            </div>
            <div class="p-field-radiobutton">
                <RadioButton name="menuMode" value="slim" v-model="d_menuMode" id="mode3" @change="changeMenuMode('slim')"></RadioButton>
                <label for="mode3">Thanh bên gọn</label>
            </div>
            <hr />

            <h5>Chế độ</h5>
            <div class="p-field-radiobutton">
                <RadioButton name="colorScheme" value="light" v-model="d_colorScheme" id="theme1" @change="changeColorScheme('light')"></RadioButton>
                <label for="theme3">Sáng</label>
            </div>
            <div class="p-field-radiobutton">
                <RadioButton name="colorScheme" value="dark" v-model="d_colorScheme" id="theme2" @change="changeColorScheme('dark')"></RadioButton>
                <label for="theme1">Tối</label>
            </div>

            <hr />

            <div v-if="layoutMode === 'horizontal'">
                <h5>Màu chức năng</h5>
                <div class="p-field-radiobutton">
                    <RadioButton name="topbarScheme" value="light" v-model="d_topbarTheme" :disabled="d_colorScheme === 'dark'" @change="changeTopbarTheme('light')"></RadioButton>
                    <label for="theme3">Sáng</label>
                </div>
                <div class="p-field-radiobutton">
                    <RadioButton name="topbarScheme" value="dark" v-model="d_topbarTheme" :disabled="d_colorScheme === 'dark'" @change="changeTopbarTheme('dark')"></RadioButton>
                    <label for="theme1">Tối</label>
                </div>
            </div>

            <div v-if="layoutMode !== 'horizontal'">
                <h5>Màu chức năng</h5>
                <div class="p-field-radiobutton">
                    <RadioButton name="topbarScheme" value="light" v-model="d_topbarTheme" id="topbar1" @change="changeTopbarScheme('light')" :disabled="d_colorScheme === 'dark'"></RadioButton>
                    <label for="topbar1">Sáng</label>
                </div>
                <div class="p-field-radiobutton">
                    <RadioButton name="topbarScheme" value="dark" v-model="d_topbarTheme" id="topbar2" @change="changeTopbarScheme('dark')" :disabled="d_colorScheme === 'dark'"></RadioButton>
                    <label for="topbar2">Tối</label>
                </div>
            </div>

            <hr />

            <div v-if="layoutMode !== 'horizontal'">
                <h5>Menu Mode</h5>
                <div class="p-field-radiobutton">
                    <RadioButton name="colorScheme" value="light" v-model="d_menuTheme" id="menuTheme1" @change="changeMenuScheme('light')" :disabled="d_colorScheme === 'dark'"></RadioButton>
                    <label for="menuTheme1">Light</label>
                </div>
                <div class="p-field-radiobutton">
                    <RadioButton name="colorScheme" value="dark" v-model="d_menuTheme" id="menuTheme2" @change="changeMenuScheme('dark')" :disabled="d_colorScheme === 'dark'"></RadioButton>
                    <label for="menuTheme2">Dark</label>
                </div>
            </div>

            <hr v-if="layoutMode !== 'horizontal'" />

            <h5>Hiệu ứng</h5>
            <InputSwitch :modelValue="rippleActive" @update:modelValue="onRippleChange"  />

            <hr />

            <h5>Input Background</h5>
            <div class="p-field-radiobutton">
                <RadioButton id="input_outlined" name="inputstyle" value="outlined" :modelValue="inputStyle" @update:modelValue="onChange" />
                <label for="input_outlined">Outlined</label>
            </div>
            <div class="p-field-radiobutton">
                <RadioButton id="input_filled" name="inputstyle" value="filled" :modelValue="inputStyle" @update:modelValue="onChange" />
                <label for="input_filled">Filled</label>
            </div>

            <hr />

            <h5>Chủ đề</h5>
            <div class="layout-themes">
                <div v-for="theme in componentThemes" :key="theme.name">
                    <a style="cursor: pointer" @click="changeComponentTheme(theme.name)" :title="theme.name" :style="{ 'background-color': theme.color }"></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AppConfig',
  emits: ['config-button-click', 'config-click', 'change-layout-mode', 'menu-theme', 'update:colorScheme', 'topbar-theme', 'change-component-theme', 'change-color-scheme'],
  props: {
    configActive: {
      type: Boolean,
      default: null
    },
    configClick: {
      type: Boolean,
      default: null
    },
    colorScheme: String,
    topbarTheme: String,
    menuTheme: String,
    layoutMode: String
  },
  data () {
    return {
      componentThemes: [
        { name: 'blue', color: '#2c84d8' },
        { name: 'green', color: '#34B56F' },
        { name: 'orange', color: '#FF810E' },
        { name: 'turquoise', color: '#58AED3' },
        { name: 'avocado', color: '#AEC523' },
        { name: 'purple', color: '#464DF2' },
        { name: 'red', color: '#FF9B7B' },
        { name: 'yellow', color: '#FFB340' }
      ],
      logoColor: 'white',
      d_colorScheme: this.colorScheme,
      d_menuMode: this.layoutMode
    }
  },
  computed: {
    rippleActive () {
      return this.$primevue.config.ripple
    },
    inputStyle () {
      return this.$appState.inputStyle
    },
    d_menuTheme: {
      get () {
        return this.menuTheme
      },
      set (value) {
        this.$emit('menu-theme', value)
      }
    },
    d_topbarTheme: {
      get () {
        return this.topbarTheme
      },
      set (value) {
        this.$emit('topbar-theme', value)
      }
    }
  },
  methods: {
    changeComponentTheme (theme) {
      this.$emit('change-component-theme', theme)
    },
    onConfigButtonClick (event) {
      this.$emit('config-button-click', event)
      event.preventDefault()
    },
    onConfigClick (event) {
      this.$emit('config-click', event)
    },
    changeMenuMode (mode) {
      this.$emit('change-layout-mode', mode)
    },
    changeColorScheme (scheme) {
      this.$emit('change-color-scheme', scheme)
    },
    changeTopbarTheme (scheme) {
      this.$emit('topbar-theme', scheme)
      this.$emit('menu-theme', scheme)
    },
    changeTopbarScheme (scheme) {
      this.$emit('topbar-theme', scheme)
    },
    changeMenuScheme (scheme) {
      this.$emit('menu-theme', scheme)
    },
    onChange (value) {
      this.$appState.inputStyle = value
    },
    onRippleChange (value) {
      this.$primevue.config.ripple = value
    }
  }
}
</script>

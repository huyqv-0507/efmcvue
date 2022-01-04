/* eslint-disable comma-dangle */
<template>
    <div :class="containerClass" :data-theme="colorScheme" @click="onDocumentClick($event)">
        <div class="layout-content-wrapper">
            <AppTopBar :layoutMode="layoutMode" :topbarTheme="topbarTheme" :menuActive="menuActive" :mobileMenuActive="staticMenuMobileActive" :sidebarActive="sidebarActive" :sidebarStatic="sidebarStatic"
                :topbarUserMenuActive="topbarUserMenuActive" :topbarUserMenuClick="topbarUserMenuClick" :searchActive="searchActive" :searchClick="searchClick" :topbarItemClick="topbarItemClick"
                :activeTopbarItem="activeTopbarItem" @menu-click="onMenuClick" @menuitem-click="onMenuItemClick" @root-menuitem-click="onRootMenuItemClick"
                @menu-button-click="onMenuButtonClick" @right-menubutton-click="onRightMenuButtonClick" @toggle-menu="onToggleMenu" @topbar-usermenu-click="onTopbarUserMenuClick"
                @sidebar-mouse-leave="onSidebarMouseLeave" @sidebar-mouse-over="onSidebarMouseOver" @topbar-search-toggle="onTopbarSearchToggle" @topbar-search-click="OnTopbarSearchClick"
                @topbar-search-hide="onTopbarSearchHide"></AppTopBar>

            <div class="layout-main">
                <div class="layout-content">
                    <router-view/>
                </div>
                <AppFooter/>
            </div>
        </div>

        <AppRightPanel :rightMenuClick="rightMenuClick" :rightMenuActive="rightMenuActive" @right-menu-click="onRightMenuClick"></AppRightPanel>

        <AppConfig :layoutMode="layoutMode" :menuTheme="menuTheme" :colorScheme="colorScheme" :topbarTheme="topbarTheme" :configActive="configActive" @change-layout-mode="onChangeLayoutMode"
            @config-click="onConfigClick" @config-button-click="onConfigButtonClick" @change-color-scheme="changeColorScheme" @change-component-theme="changeComponentTheme"
            @topbar-theme="onTopbarThemeChange" @menu-theme="onMenuThemeChange"></AppConfig>

        <div class="layout-mask modal-in"></div>
    </div>
</template>

<script>
import { DomHandler } from 'primevue/utils'
import EventBus from './event-bus'
import AppTopBar from './AppTopbar'
import AppFooter from './AppFooter'
import AppConfig from './AppConfig'
import AppRightPanel from './AppRightPanel'
export default {
  props: {
    topbarTheme: String,
    menuTheme: String
  },
  emits: ['change-color-scheme', 'change-component-theme', 'topbar-theme', 'menu-theme'],
  data () {
    return {
      menuActive: false,
      layoutMode: 'sidebar',
      colorScheme: 'light',
      sidebarActive: false,
      sidebarStatic: false,
      staticMenuDesktopInactive: false,
      staticMenuMobileActive: false,
      menuClick: false,
      searchActive: false,
      searchClick: false,
      topbarItemClick: false,
      activeTopbarItem: null,
      userMenuClick: false,
      topbarUserMenuActive: false,
      topbarUserMenuClick: false,
      rightMenuClick: false,
      rightMenuActive: false,
      configActive: false,
      configClick: false
    }
  },
  computed: {
    containerClass () {
      return [
        'layout-wrapper',
        {
          'layout-sidebar': this.layoutMode === 'sidebar',
          'layout-static': this.layoutMode === 'sidebar' && this.sidebarStatic,
          'layout-horizontal': this.layoutMode === 'horizontal',
          'layout-slim': this.layoutMode === 'slim',
          'layout-rightpanel-active': this.rightMenuActive,
          'layout-mobile-active': this.staticMenuMobileActive,
          'p-input-filled': this.$appState.inputStyle === 'filled',
          'p-ripple-disabled': !this.$primevue.config.ripple
        },
        'layout-menu-' + this.menuTheme + ' layout-topbar-' + this.topbarTheme
      ]
    }
  },
  components: {
    AppTopBar,
    AppFooter,
    AppConfig,
    AppRightPanel
  },
  watch: {
    $route () {
      this.menuActive = false
      this.$toast.removeAllGroups()
    }
  },
  methods: {
    onDocumentClick () {
      if (!this.searchClick && this.searchActive) {
        this.onTopbarSearchHide()
      }

      if (!this.topbarUserMenuClick && this.topbarUserMenuActive) {
        this.topbarUserMenuActive = false
        this.topbarUserMenuClick = false
      }

      if (!this.rightMenuClick) {
        this.rightMenuActive = false
      }

      if (!this.menuClick) {
        if (this.isSlim() || this.isHorizontal()) {
          EventBus.emit('reset-active-index')
          this.menuActive = false
        }

        if (this.staticMenuMobileActive) {
          this.hideOverlayMenu()
        }

        this.unblockBodyScroll()
      }

      if (this.configActive && !this.configClick) {
        this.configActive = false
      }

      this.searchClick = false
      this.configClick = false
      this.userMenuClick = false
      this.rightMenuClick = false
      this.topbarUserMenuClick = false
      this.menuClick = false
    },
    onToggleMenu (event) {
      this.menuClick = true
      this.sidebarStatic = !this.sidebarStatic

      event.preventDefault()
    },
    onMenuClick (event) {
      if (this.isHorizontal() && DomHandler.hasClass(event.target, 'layout-menu-container')) {
        EventBus.emit('reset-active-index')
        this.menuClick = false
        this.menuActive = false
      }
      this.menuClick = true
    },
    onMenuButtonClick (event) {
      this.menuClick = true
      this.topbarUserMenuActive = false
      this.rightMenuActive = false

      if (this.isMobile()) {
        this.staticMenuMobileActive = !this.staticMenuMobileActive
        if (this.staticMenuMobileActive) {
          this.blockBodyScroll()
        } else {
          this.unblockBodyScroll()
        }
      }

      event.preventDefault()
    },
    onMenuItemClick (event) {
      if (!event.item.items) {
        EventBus.emit('reset-active-index')
        this.hideOverlayMenu()
      }
      if (!event.item.items && this.isSlim()) {
        this.menuActive = false
      }
    },
    onRootMenuItemClick () {
      this.menuActive = !this.menuActive
    },
    onRightMenuClick () {
      this.rightMenuClick = true
    },
    onRightMenuButtonClick (event) {
      this.rightMenuClick = true
      this.rightMenuActive = !this.rightMenuActive
      this.hideOverlayMenu()
      event.preventDefault()
    },
    onConfigClick () {
      this.configClick = true
    },
    onConfigButtonClick () {
      this.configActive = !this.configActive
      this.configClick = true
    },
    hideOverlayMenu () {
      this.staticMenuMobileActive = false
      this.unblockBodyScroll()
    },
    onChangeLayoutMode (mode) {
      this.layoutMode = mode
      if (mode === 'sidebar') {
        if (this.sidebarStatic) {
          this.sidebarActive = true
        }
      } else {
        this.sidebarActive = false

        if (this.topbarTheme !== this.menuTheme) {
          this.$emit('menu-theme', this.topbarTheme)
        }
      }
    },
    onTopbarThemeChange (theme) {
      this.$emit('topbar-theme', theme)
    },
    onMenuThemeChange (theme) {
      this.$emit('menu-theme', theme)
    },
    changeComponentTheme (theme) {
      this.$emit('change-component-theme', theme)
    },
    changeColorScheme (scheme) {
      this.colorScheme = scheme
      this.$emit('change-color-scheme', scheme)
      this.$appState.colorScheme = scheme
    },
    onSidebarMouseOver () {
      this.sidebarActive = !this.isMobile()
    },
    onSidebarMouseLeave () {
      this.sidebarActive = false
    },
    onTopbarSearchToggle () {
      this.searchActive = !this.searchActive
      this.searchClick = true
    },
    OnTopbarSearchClick () {
      this.searchClick = true
    },
    onTopbarSearchHide () {
      this.searchActive = false
      this.searchClick = false
    },
    onTopbarUserMenuClick () {
      this.topbarUserMenuActive = !this.topbarUserMenuActive
      this.topbarUserMenuClick = true
    },
    blockBodyScroll () {
      if (document.body.classList) {
        document.body.classList.add('blocked-scroll')
      } else {
        document.body.className += ' blocked-scroll'
      }
    },
    unblockBodyScroll () {
      if (document.body.classList) {
        document.body.classList.remove('blocked-scroll')
      } else {
        document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                    'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
      }
    },
    isSlim () {
      return this.layoutMode === 'slim'
    },
    isHorizontal () {
      return this.layoutMode === 'horizontal'
    },
    isDesktop () {
      return window.innerWidth > 991
    },
    isMobile () {
      return window.innerWidth <= 991
    }
  }
}
</script>

<style lang="scss">
</style>

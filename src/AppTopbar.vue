<template>
  <div class="layout-topbar">
    <ConfirmDialog />
    <div class="layout-topbar-wrapper">
      <div class="layout-topbar-left">
        <a tabindex="0" class="menu-button" @click="onMenuButtonClick">
          <i class="pi pi-bars"></i>
        </a>
        <router-link id="logo-link" class="layout-topbar-logo" to="/">
          <img src="../src/assets/icons/logo.png" alt="efamedic" />
        </router-link>
      </div>

      <AppMenu
        :layoutMode="layoutMode"
        :sidebarActive="sidebarActive"
        :sidebarStatic="sidebarStatic"
        :menuActive="menuActive"
        :mobileMenuActive="mobileMenuActive"
        @sidebar-mouse-leave="onSidebarMouseLeave"
        @sidebar-mouse-over="onSidebarMouseOver"
        @toggle-menu="onToggleMenu"
        @menu-click="onMenuClick"
        @menuitem-click="onMenuItemClick"
        @root-menuitem-click="onRootMenuItemClick"
      />

      <div class="layout-topbar-right">
        <ul class="layout-topbar-actions">
          <li
            ref="search"
            class="topbar-item search-item"
            :class="{ 'active-topmenuitem': searchActive }"
          >
            <a tabindex="0" @click="onTopbarSearchToggle">
              <i class="topbar-icon pi pi-search"></i>
            </a>

            <div class="search-input-wrapper" @click="onTopbarSearchClick">
              <span class="p-input-icon-left">
                <i class="pi pi-search"></i>
                <InputText
                  ref="desktopInput"
                  type="text"
                  placeholder="Search..."
                  @keydown="onInputKeydown"
                />
              </span>
            </div>

            <ul class="fadeInDown">
              <div
                class="search-input-wrapper p-fluid"
                style="width: 100%"
                @click="onTopbarSearchClick"
              >
                <span class="p-input-icon-left">
                  <i class="pi pi-search"></i>
                  <InputText
                    ref="phoneInput"
                    type="text"
                    placeholder="Search..."
                    @keydown="onInputKeydown"
                  />
                </span>
              </div>
            </ul>
          </li>

          <li
            ref="profile"
            class="topbar-item user-profile"
            :class="{ 'active-topmenuitem fadeInDown': topbarUserMenuActive }"
          >
            <a @click="onTopbarUserMenuClick">
              <img src="../src/assets/icons/avt.png" alt="freya-layout" />
            </a>
            <ul class="fadeInDown">
              <li>
                <a href="#">
                  <span>Thông tin</span>
                </a>
              </li>
              <li>
                <a @click="logout()">
                  <span>Đăng xuất</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <a
          href="#"
          tabindex="0"
          class="layout-rightpanel-button"
          @click="onRightMenuButtonClick($event)"
        >
          <i class="pi pi-arrow-left"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import AppMenu from './AppMenu'
import { removeJwtToken } from './utilities/cookie'
import router from './router'
export default {
  name: 'AppTopbar',
  emits: [
    'menu-click',
    'menuitem-click',
    'root-menuitem-click',
    'menu-button-click',
    'toggle-menu',
    'right-menubutton-click',
    'sidebar-mouse-over',
    'sidebar-mouse-leave',
    'topbar-search-toggle',
    'topbar-search-click',
    'topbar-search-hide',
    'topbar-usermenu-click',
    'update:searchClick'
  ],
  props: {
    searchActive: Boolean,
    searchClick: Boolean,
    topbarItemClick: Boolean,
    topbarUserMenuActive: Boolean,
    topbarUserMenuClick: Boolean,
    activeTopbarItem: String,
    sidebarActive: Boolean,
    sidebarStatic: Boolean,
    layoutMode: String,
    topbarTheme: String,
    menuActive: Boolean,
    mobileMenuActive: Boolean
  },
  unmounted () {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  },
  methods: {
    logout () {
      this.$confirm.require({
        message: 'Bạn có muốn đăng xuất?',
        header: 'Xác nhận',
        icon: 'pi pi-sign-out',
        acceptLabel: 'Xác nhận',
        rejectLabel: 'Huỷ',
        accept: () => {
          removeJwtToken()
          router.push('/login')
        },
        reject: () => {
          // callback to execute when user rejects the action
        }
      })
    },
    onMenuClick (event) {
      this.$emit('menu-click', event)
    },
    onMenuItemClick (event) {
      this.$emit('menuitem-click', event)
    },
    onRootMenuItemClick (event) {
      this.$emit('root-menuitem-click', event)
    },
    onMenuButtonClick (event) {
      this.$emit('menu-button-click', event)
    },
    onToggleMenu (event) {
      this.$emit('toggle-menu', event)
    },
    onTopbarSearchToggle (event) {
      this.$emit('topbar-search-toggle', event)
      this.onSearchFocus()
    },
    onTopbarSearchClick (event) {
      this.$emit('topbar-search-click', event)
    },
    onInputKeydown (event) {
      const key = event.which

      // escape, tab and enter
      if (key === 27 || key === 9 || key === 13) {
        this.$emit('topbar-search-hide', event)
      }
    },
    onTopbarUserMenuClick (event) {
      this.$emit('topbar-usermenu-click', event)
    },
    onRightMenuButtonClick (event) {
      this.$emit('right-menubutton-click', event)
    },
    onSidebarMouseOver () {
      this.$emit('sidebar-mouse-over')
    },
    onSidebarMouseLeave () {
      this.$emit('sidebar-mouse-leave')
    },
    onSearchFocus () {
      if (window.innerWidth >= 576) {
        this.$refs.desktopInput.$el.focus()
      } else {
        this.$nextTick(function () {
          this.$refs.phoneInput.$el.focus()
        })
      }
    }
  },
  components: {
    AppMenu
  }
}
</script>

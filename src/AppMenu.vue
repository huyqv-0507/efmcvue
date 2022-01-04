<template>
  <div
    class="menu-wrapper"
    :class="{ 'layout-sidebar-active': sidebarActive }"
    @click="onMenuClick"
    @mouseover="onSidebarMouseOver"
    @mouseleave="onSidebarMouseLeave"
  >
    <div class="sidebar-logo">
      <router-link to="/">
        <img
          src="assets/layout/images/logo-freya-single.svg"
          alt="freya-layout"
        />
      </router-link>
      <a class="sidebar-pin" @click="onToggleMenu($event)">
        <span class="pin"></span>
      </a>
    </div>

    <div class="layout-menu-container">
      <AppSubmenu
        class="layout-menu"
        :items="menu"
        :layoutMode="layoutMode"
        :parentMenuItemActive="true"
        :menuActive="menuActive"
        :mobileMenuActive="mobileMenuActive"
        :root="true"
        @menuitem-click="onMenuItemClick"
        @root-menuitem-click="onRootMenuItemClick"
      />
    </div>
  </div>
</template>

<script>
import AppSubmenu from './AppSubmenu'
export default {
	name: 'AppMenu',
	emits: [
		'menu-click',
		'menuitem-click',
		'root-menuitem-click',
		'toggle-menu',
		'sidebar-mouse-over',
		'sidebar-mouse-leave'
	],
	props: {
		sidebarActive: Boolean,
		sidebarStatic: Boolean,
		layoutMode: String,
		menuActive: Boolean,
		mobileMenuActive: Boolean
	},
	data () {
		return {
			menu: [
				{ label: 'Tổng quan', icon: 'pi pi-desktop', to: '/' },
				{
					label: 'Nhà thuốc',
					icon: 'pi pi-home',
					items: [
						{ label: 'Cơ sở', icon: 'pi pi-sitemap', to: '/pharmacy-store' },
						{ label: 'Danh mục thuốc', icon: 'pi pi-th-large', to: '/industry-medication' },
						{ label: 'Thiết lập giá', icon: 'pi pi-dollar', to: '' },
						{ label: 'Kiểm kho', icon: 'pi pi-tags', to: '' }
					]
				},
				{
					label: 'Bệnh nhân',
					icon: 'pi pi-user',
					items: [
						{ label: 'Lịch sử mua thuốc', icon: 'pi pi-book', to: '' },
						{ label: 'Quản lý nợ', icon: 'pi pi-wallet', to: '/test' }
					]
				},
				{
					label: 'Dược sĩ',
					icon: 'pi pi-users',
					items: [
						{ label: 'Bán hàng', icon: 'pi pi-pencil', to: '/crud' },
						{ label: 'Quản lý', icon: 'pi pi-calendar-plus', to: '/calendar' }
					]
				}
			]
		}
	},
	methods: {
		onSidebarMouseOver () {
			if (this.layoutMode === 'sidebar' && !this.sidebarStatic) {
				this.$emit('sidebar-mouse-over')
			}
		},
		onSidebarMouseLeave () {
			if (this.layoutMode === 'sidebar' && !this.sidebarStatic) {
				setTimeout(() => {
					this.$emit('sidebar-mouse-leave')
				}, 250)
			}
		},
		onToggleMenu (event) {
			this.$emit('toggle-menu', event)
		},
		onMenuClick (event) {
			this.$emit('menu-click', event)
		},
		onMenuItemClick (event) {
			console.log(event)
			this.$emit('menuitem-click', event)
		},
		onRootMenuItemClick (event) {
			this.$emit('root-menuitem-click', event)
		}
	},
	components: { AppSubmenu }
}
</script>

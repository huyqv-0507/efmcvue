<template>
  <ul v-if="items" role="menu">
    <template v-for="(item, i) of items">
      <li
        v-if="visible(item) && !item.separator"
        :key="item.label || i"
        :class="[
          {
            'layout-root-menuitem': root,
            'active-menuitem': activeIndex === i && !item.disabled,
          },
        ]"
        role="menuitem"
      >
        <router-link
          v-if="item.to"
          :to="item.to"
          :style="item.style"
          :class="[item.class, 'p-ripple', { 'p-disabled': item.disabled }]"
          active-class="active-route"
          :target="item.target"
          exact
          @click="onMenuItemClick($event, item, i)"
          @mouseenter="onMenuItemMouseEnter(i)"
          v-ripple
        >
          <i :class="['layout-menuitem-icon', item.icon]"></i>
          <span class="layout-menuitem-text">{{ item.label }}</span>
          <i
            v-if="item.items"
            class="pi pi-fw pi-chevron-down layout-submenu-toggler"
          ></i>
        </router-link>
        <a
          v-if="!item.to"
          :href="item.url || '#'"
          :style="item.style"
          :class="[item.class, 'p-ripple', { 'p-disabled': item.disabled }]"
          :target="item.target"
          @click="onMenuItemClick($event, item, i)"
          @mouseenter="onMenuItemMouseEnter(i)"
          v-ripple
        >
          <i :class="['layout-menuitem-icon', item.icon]"></i>
          <span class="layout-menuitem-text">{{ item.label }}</span>
          <i
            v-if="item.items"
            class="pi pi-fw pi-chevron-down layout-submenu-toggler"
          ></i>
        </a>
        <div class="layout-menu-tooltip">
          <div class="layout-menu-tooltip-arrow"></div>
          <div class="layout-menu-tooltip-text">{{ item.label }}</div>
        </div>
        <transition name="layout-menu">
          <appsubmenu
            v-show="activeIndex === i"
            :items="visible(item) && item.items"
            :menuActive="menuActive"
            :layoutMode="layoutMode"
            :parentMenuItemActive="activeIndex === i"
            @menuitem-click="$emit('menuitem-click', $event)"
          ></appsubmenu>
        </transition>
      </li>
    </template>
  </ul>
</template>

<script>
import EventBus from './event-bus'
export default {
  name: 'appsubmenu',
  emits: ['root-menuitem-click', 'menuitem-click'],
  props: {
    items: Array,
    layoutMode: String,
    menuActive: Boolean,
    mobileMenuActive: Boolean,
    root: {
      type: Boolean,
      default: false
    },
    parentMenuItemActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeIndex: null
    }
  },
  mounted () {
    EventBus.on('reset-active-index', () => {
      if (this.isSlim() || this.isHorizontal()) {
        this.activeIndex = null
      }
    })
  },
  methods: {
    onMenuItemClick (event, item, index) {
      if (item.disabled) {
        event.preventDefault()
        return
      }
      // execute command
      if (item.command) {
        item.command({ originalEvent: event, item: item })
        event.preventDefault()
      }
      if (item.items) {
        event.preventDefault()
      }
      if (this.root) {
        this.$emit('root-menuitem-click', {
          originalEvent: event
        })
      }
      if (item.items) {
        this.activeIndex = index === this.activeIndex ? null : index
      } else {
        this.activeIndex = index

        if (this.layoutMode !== 'sidebar') {
          const ink = this.getInk(event.currentTarget)
          if (ink) {
            this.removeClass(ink, 'p-ink-active')
          }
        }
      }
      this.$emit('menuitem-click', {
        originalEvent: event,
        item: item
      })
    },
    onMenuItemMouseEnter (index) {
      if (
        this.root &&
        this.menuActive &&
        (this.isHorizontal() || this.isSlim()) &&
        !this.isMobile()
      ) {
        this.activeIndex = index
      }
    },
    visible (item) {
      return typeof item.visible === 'function'
        ? item.visible()
        : item.visible !== false
    },
    isMobile () {
      return window.innerWidth <= 991
    },
    isSlim () {
      return this.layoutMode === 'slim'
    },
    isHorizontal () {
      return this.layoutMode === 'horizontal'
    },
    getInk (el) {
      for (let i = 0; i < el.children.length; i++) {
        if (
          typeof el.children[i].className === 'string' &&
          el.children[i].className.indexOf('p-ink') !== -1
        ) {
          return el.children[i]
        }
      }
      return null
    },
    removeClass (element, className) {
      if (element.classList) element.classList.remove(className)
      else {
        element.className = element.className.replace(
          new RegExp(
            '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
            'gi'
          ),
          ' '
        )
      }
    }
  }
}
</script>

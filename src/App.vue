<template>
  <n-layout class="h-screen w-screen">
      <n-layout-header class="p-4">
        Header 
      </n-layout-header>
      <n-layout has-sider class="h-[calc(100vh-108px)]">
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :native-scrollbar="false"
          :inverted="inverted"
        >
          <n-menu
            :inverted="inverted"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />
        </n-layout-sider>
        <n-layout>
          hello world

        </n-layout>
      </n-layout>
      <n-layout-footer class="p-4">
        Footer
      </n-layout-footer>
  </n-layout>
</template>

<script lang="ts" setup>
import type { Component } from 'vue'
import { defineComponent, h, ref } from 'vue'
import { NIcon } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: 'Menu 1',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },

]
</script>
<script lang="ts" setup>
import type { Component } from 'vue'

import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from '@vicons/ionicons5'
import { useIpcRenderer } from '@vueuse/electron'

import { NIcon } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

const ipcRenderer = useIpcRenderer()

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: 'Menu 1',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon),
  },

]

const url = ref('https://media.adamroi.com/login')

async function fetchTitle() {
  try {
    await ipcRenderer.invoke('run-puppeteer', url.value)
  }
  catch (error) {
    console.error('Error fetching title:', error)
  }
}
</script>

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
      >
        <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout class="p-4">
        <n-input-group class="mt-1">
          <n-input v-model:value="url" :style="{ width: '50%' }" />
          <n-button type="primary" ghost @click="fetchTitle">
            open the page
          </n-button>
        </n-input-group>
      </n-layout>
    </n-layout>
    <n-layout-footer class="p-4">
      Footer
    </n-layout-footer>
  </n-layout>
</template>

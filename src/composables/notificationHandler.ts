import { ref, Ref } from 'vue'

type Notification = { id: number; message: string }

function createNotificationHandler() {
  const notifications: Ref<Notification[]> = ref([])
  const notify = (message: string) => {
    const id = Date.now()
    notifications.value.push({ id, message })
    setTimeout(() => {
      notifications.value = notifications.value.filter((n: Notification) => n.id !== id)
    }, 3000)
  }
  return { notifications, notify }
}

export const useNotifySuccess = createNotificationHandler
export const useNotifyError = createNotificationHandler
export const useNotifyInfo = createNotificationHandler
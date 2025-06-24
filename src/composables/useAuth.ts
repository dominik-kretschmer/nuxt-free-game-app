import { ref, computed } from 'vue'

// State that will be shared across components
const token = ref('')
const userId = ref<number | null>(null)
const userEmail = ref('')

// Initialize from localStorage if in browser context
if (process.client) {
  const storedToken = localStorage.getItem('auth_token')
  const storedUserId = localStorage.getItem('user_id')
  const storedEmail = localStorage.getItem('user_email')
  
  if (storedToken && storedUserId && storedEmail) {
    token.value = storedToken
    userId.value = parseInt(storedUserId)
    userEmail.value = storedEmail
  }
}

export function useAuth() {
  const isLoggedIn = computed(() => !!token.value)
  
  /**
   * Set authentication data after successful login/register
   */
  const setAuth = (newToken: string, newUserId: number, email: string) => {
    token.value = newToken
    userId.value = newUserId
    userEmail.value = email
    
    // Store in localStorage for persistence
    if (process.client) {
      localStorage.setItem('auth_token', newToken)
      localStorage.setItem('user_id', newUserId.toString())
      localStorage.setItem('user_email', email)
    }
  }
  
  /**
   * Clear authentication data on logout
   */
  const clearAuth = () => {
    token.value = ''
    userId.value = null
    userEmail.value = ''
    
    // Clear localStorage
    if (process.client) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('user_email')
    }
  }
  
  /**
   * Get the authorization header for API requests
   */
  const getAuthHeader = () => {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  }
  
  /**
   * Make an authenticated API request
   */
  const fetchWithAuth = async (url: string, options: any = {}) => {
    const headers = {
      ...options.headers,
      ...getAuthHeader()
    }
    
    return await $fetch(url, {
      ...options,
      headers
    })
  }
  
  return {
    token,
    userId,
    userEmail,
    isLoggedIn,
    setAuth,
    clearAuth,
    getAuthHeader,
    fetchWithAuth
  }
}
import { createListenerMiddleware } from "@reduxjs/toolkit"
import { userApi } from "../app/services/userApi"

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  //слешает
  matcher: userApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners() // все отменяет

    // если токен получен
    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token) // записываем токен
    }
  },
})

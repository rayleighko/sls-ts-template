import { AxiosError } from "axios"

export const handleServiceError = (error?: unknown | AxiosError) => {
  if (error instanceof AxiosError) {
    console.error("----------------------------------------")
    console.error("headers: ", error.response?.headers)
    console.error("status: ", error.response?.status)
    console.error("data: ", error.response?.data)
    console.error("message: ", error.message)
    console.error("----------------------------------------")
    return error as AxiosError
  }
  return {} as AxiosError
}

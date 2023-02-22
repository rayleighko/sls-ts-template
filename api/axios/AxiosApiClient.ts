import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

const createAxiosClient = (): AxiosInstance =>
  Axios.create({
    responseType: "json" as const,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10 * 1000,
  })

const axiosClient = createAxiosClient()

export const serviceApiRequest = async <T = unknown, D = unknown>(
  config: AxiosRequestConfig<D>,
): Promise<T> => {
  const res = await axiosClient.request<T, AxiosResponse<T, D>, D>(config)

  return res.data
}

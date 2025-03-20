import type { ApiResponse } from "@/api/types/api";
import { ref } from "vue";

export function useFetch<T, P = void>(apiFunction: (params: P) => Promise<ApiResponse<T>>) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<boolean | null>(null);

  const reset = () => {
    data.value = null
    error.value = null
    loading.value = false
  }

  const fetchData = async (params: P) => {
    loading.value = true;
    error.value = null;
    const result = await apiFunction(params);
    if (result.isError) {
      error.value = true
    }
    else {
      data.value = result.data
    }
    loading.value = false
  };

  return { data, loading, error, fetchData, reset };
}

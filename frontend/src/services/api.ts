export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export type Project = {
  id: number;
  progetto: string;
  performance: number;
  img: string;
};

type ApiSuccessResponse<T> = {
  status: 'success';
  data: T;
};

type ApiFailResponse = {
  status: 'fail';
  data: { [param: string]: string };
};

type ApiErrorResponse = {
  status: 'error';
  message: string;
};

type ApiResponse<T> =
  | ApiSuccessResponse<T>
  | ApiFailResponse
  | ApiErrorResponse;

const Api = {
  getProjects: async (): Promise<ApiResponse<Project[]>> => {
    const response = await fetch(
      `${API_BASE_URL}/api/progetti?${new URLSearchParams({
        id_medico: '1',
        tipo_chiamata: 'foo',
      }).toString()}`
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json);
    }

    return json;
  },
};

export default Api;

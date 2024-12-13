import { globalApi } from "../../globalApi";

export const lessonEndpoint = globalApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query<any, void>({
      query: () => '/api/lessons',
      providesTags: ['Lesson'],
    }),

    getLessonsForLessonManagement: builder.query<any, void>({
      query: () => '/api/lessons/lesson-management',
      providesTags: ['Lesson'],
    }),

    createLesson: builder.mutation<any, any>({
      query: (newLesson) => ({
        url: '/api/lessons',
        method: 'POST',
        body: newLesson,
      }),
      invalidatesTags: ['Lesson'],
    }),

    updateLesson: builder.mutation<any, any>({
      query: (updatedLesson) => ({
        url: `api/lessons`,
        method: 'PUT',
        body: updatedLesson,
      }),
      invalidatesTags: ['Lesson'],
    }),

    deleteLesson: builder.mutation<void, string>({
      query: (id) => ({
        url: `api/lessons/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lesson'],
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useGetLessonsForLessonManagementQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonEndpoint;

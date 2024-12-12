import { globalApi } from "../../globalApi";

export const lessonEndpoint = globalApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query<any, void>({
      query: () => '/api/lessons/admin-lessons',
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
        url: `/lessons/${updatedLesson.id}`,
        method: 'PUT',
        body: updatedLesson,
      }),
      invalidatesTags: ['Lesson'],
    }),

    deleteLesson: builder.mutation<void, string>({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lesson'],
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonEndpoint;

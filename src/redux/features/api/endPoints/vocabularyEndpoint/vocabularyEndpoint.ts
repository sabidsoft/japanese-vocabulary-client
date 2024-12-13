import { globalApi } from "../../globalApi";


export const vocabularyEndpoint = globalApi.injectEndpoints({
  endpoints: (builder) => ({
    getVocabularies: builder.query<any, void>({
      query: () => '/api/vocabularies',
      providesTags: ['Vocabulary'],
    }),

    getVocabulariesByLessonNumber: builder.query<any, number>({
      query: (lessonNumber) => `/api/vocabularies/${lessonNumber}`,
      providesTags: (result, error, arg) => [{ type: 'Vocabulary', id: arg }]
    }),

    createVocabulary: builder.mutation<any, any>({
      query: (newVocabulary) => ({
        url: '/api/vocabularies',
        method: 'POST',
        body: newVocabulary,
      }),
      invalidatesTags: ['Vocabulary'],
    }),

    updateVocabulary: builder.mutation<any, any>({
      query: (updatedVocabulary) => ({
        url: `/api/vocabularies`,
        method: 'PUT',
        body: updatedVocabulary,
      }),
      invalidatesTags: ['Vocabulary'],
    }),

    deleteVocabulary: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/vocabularies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Vocabulary'],
    }),
  }),
});

export const {
  useGetVocabulariesQuery,
  useGetVocabulariesByLessonNumberQuery,
  useCreateVocabularyMutation,
  useUpdateVocabularyMutation,
  useDeleteVocabularyMutation,
} = vocabularyEndpoint;

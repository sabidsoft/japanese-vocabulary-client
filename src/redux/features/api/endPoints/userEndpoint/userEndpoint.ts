import { setLoading, userLoggedIn } from "../../../auth/authSlice";
import { globalApi } from "../../globalApi";
import { Login } from "./types";

export const userEndpoint = globalApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<any, Login>({
            query: (data) => ({
                url: '/api/users/login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users'],

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Set loading state to true before making the request
                    dispatch(setLoading(true));

                    const response = await queryFulfilled;

                    // storing on localstorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // updating redux store
                    dispatch(userLoggedIn({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // Set loading state to false after the request is successful
                    dispatch(setLoading(false));
                }
                catch (err) {
                    // Set loading state to false in case of error
                    dispatch(setLoading(false));
                }
            }
        }),

        register: builder.mutation<any, FormData>({
            query: (data) => ({
                url: '/api/users/register',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users'],

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Set loading state to true before making the request
                    dispatch(setLoading(true));

                    const response = await queryFulfilled;

                    // storing on localstorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // updating redux store
                    dispatch(userLoggedIn({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // Set loading state to false after the request is successful
                    dispatch(setLoading(false));
                }
                catch (err) {
                    // Set loading state to false in case of error
                    dispatch(setLoading(false));
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation
} = userEndpoint;

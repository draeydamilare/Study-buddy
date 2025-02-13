import { apiSlice } from "./apiSlice";
import { setCredentials } from "./auth/authSlice";

const authApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
        registerUser: builder.mutation({
            query:(data) => ({
                url:"/auth/register",
                method: 'POST',
                body: {...data}
            })
        }),

        loginUser: builder.mutation({
        query: (data) =>   ({
            url:"/auth/login",
            method: "POST",
            body: {...data}
        }), 
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
            try {
              const { data } = await queryFulfilled;
              // Store tokens in Redux on successful login
              dispatch(setCredentials({ access_token: data.access_token, refresh_token: data.refresh_token }));
            } catch (err) {
              console.error('Login failed:', err);
            }
          }, 
     }),
     
     getUser: builder.query({
        query: () => '/auth/user',
     }),
   }) 
})

export const {useRegisterUserMutation, useLoginUserMutation, useGetUserQuery} = authApiSlice
export default authApiSlice.reducer;
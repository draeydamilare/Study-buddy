import { apiSlice } from "./apiSlice";
import { setCredentials } from "./auth/authSlice";

const testApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
        generatQuestions: builder.mutation({
            query:(data) => ({
                url:"/study/generate-mcq",
                method: 'POST',
                body: {...data}
            })
        }),

        submitQuestions: builder.mutation({
            query:({answers, id}) => ({
                url:`/study/evaluate?testId=${id}`,
                method: 'PATCH',
                body: {answers}
            })
        }),

        getMyTests: builder.query({
            query: () => '/study/test'
        }),

        getSingleTest: builder.query({
            query:(id) => `/study/test/single?testId=${id}`
        })
   }) 
})

export const {useGeneratQuestionsMutation, useSubmitQuestionsMutation, useGetMyTestsQuery, useGetSingleTestQuery} = testApiSlice
export default testApiSlice.reducer;
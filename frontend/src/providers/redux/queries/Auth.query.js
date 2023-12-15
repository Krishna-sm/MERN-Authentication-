// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/v1` }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (obj) =>({
        url: `/auth/register`,
        method:'POST',
        body:obj
      }),
    }),
    LoginUser: builder.mutation({
        query: (obj) =>({
          url: `/auth/login`,
          method:'POST',
          body:obj
        }),
        headers:{
            "Content-Type": "application/json" 
        }
      }),
       UserProfile: builder.query({
        query: (obj) =>({
          url: `/auth/profile`,
          method:'GET',
          headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
        }),
      
       
      }),
      ForgetPassword: builder.mutation({
        query: (obj) =>({
          url: `/auth/forget-password`,
          method:'POST',
          body:obj
        }),
      }),

      UpdatePassword: builder.mutation({
        query: (obj) =>({
          url: `/auth/update-password`,
          method:'PUT',
          body:obj
        }),
      }),
      UpdateProfile: builder.mutation({
        query: (obj) =>({
          url: `/auth/profile`,
          method:'PUT',
          body:obj,
          headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
        }),
      
       
      }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterUserMutation,useLoginUserMutation,useUserProfileQuery ,useForgetPasswordMutation,useUpdatePasswordMutation , useUpdateProfileMutation   } = AuthApi
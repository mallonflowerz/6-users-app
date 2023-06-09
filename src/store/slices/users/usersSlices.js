import { createSlice } from "@reduxjs/toolkit";

export const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false,
}

const initialErrorsPassw = {
    username: '',
    usernameNew: "",
    password: '',
}

const initialErrors = {
    username: '',
    password: '',
    email: '',
}

export const usersSlices = createSlice({
    name: "users",
    initialState: {
        users: [],
        userSelected: initialUserForm,
        visibleForm: false,
        errors: initialErrors,
        errorsPass: initialChangePassw
    },
    reducers: {
        addUsers: (state, action) => {
            state.users = [
                ...state.users,
                {
                    ...action.payload
                }
            ],
            state.userSelected = initialUserForm
            state.visibleForm = false
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateUser: (state, action) => {
            state.users = state.users.map(u => {
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload
                    };
                }
                return u;
            })
            state.userSelected = initialUserForm
            state.visibleForm = false
        },
        changePass: (state, action) => {
            state.users = [
                ...state.users,
                {
                    ...action.payload
                }
            ]
        },
        loadingUsers: (state, action) => {
            state.users = action.payload
        },
        onUserSelectedForm: (state, action) => {
            state.userSelected = action.payload
            state.visibleForm = true
        },
        onOpenForm: (state) => {
            state.visibleForm = true
        },
        onCloseForm: (state) => {
            state.visibleForm = false,
            state.userSelected = initialUserForm
        },
        loadingError: (state, action) => {
            state.errors = action.payload
        },
        loadingErrorPass: (state, action) => {
            state.errorsPass = action.payload
        }
    }
})

export const {
    addUsers,
    removeUser,
    updateUser,
    changePass,
    loadingUsers,
    onUserSelectedForm,
    onOpenForm,
    onCloseForm,
    loadingError,
    loadingErrorPass,
} = usersSlices.actions
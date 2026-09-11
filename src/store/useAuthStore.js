import { create } from "zustand";

// function to the localstorage value of isLoggedIn if exists 
const getStoredLoginState = () => {
    if (typeof window === "undefined") {
        return false;
    }
    
    return localStorage.getItem("isLoggedIn") === "true";
};

// function to the localstorage value of userName if exists 
const getStoredUserName = () => {
    if (typeof window === "undefined") {
        return "User";
    }

    return localStorage.getItem("userName") || "User";
};

const getStoredUserId = () => {
    if (typeof window === "undefined") {
        return null;
    }

    return localStorage.getItem("userId");
};

export const useAuthStore = create((set) => ({
    isLoggedIn: getStoredLoginState(),
    userName: getStoredUserName(),
    userId: getStoredUserId(),

    // function to set the value of the localstorage and zustand store for isLoggedIn
    setIsLoggedIn: (value) => {
        localStorage.setItem("isLoggedIn", String(value));
        set({ isLoggedIn: value });
    },
    
    // function to set the value of the localstorage and zustand store for userName
    setUserName: (name) => {
        localStorage.setItem("userName", name);
        set({ userName: name });
    },

    setUserId: (id) => {
        localStorage.setItem("userId", id);
        set({ userId: id });
    },

    // deleting all the localstorage items on logout
    logout: () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        set({ isLoggedIn: false, userName: "User", userId: null });
    },
}));
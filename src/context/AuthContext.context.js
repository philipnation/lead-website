"use client"

import React, {useState, useEffect, createContext, useContext} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'

const AuthContext = createContext()


export const AuthProvider = ({children})=>{

    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [splashLoading, setSplashLoading] = useState(false)
    const [leads, setLeads] = useState([])
    const [users, setUsers] = useState([])
    const [isUserFetching, setIsUserFetching] = useState(false);
    const [isContactFetching, setIsContactFetching] = useState(false);
    const [contacts, setContacts] = useState([])

    const testing = "Just test my Context API State Management";


    const register = async (firstName, lastName, username, email, password, referral)=>{
        setIsLoading(true)
        try{
            const {data} = await axios.post('/api/auth/register', {firstName, lastName, email, username, password, referral}, {ContentType: "application/json"})            
            setIsLoading(false)
            if(data.msg == "success"){
                toast("Account created successfully!")
                window.location.href = "/login";
            }
        }catch(error){
            const err = error.response?.data
            setIsLoading(false)
            console.log(err.msg)
            toast(err.msg)
        }
    }

    const testingFunction = ()=> console.log("Testing Context API Function...")


    const login = async (email, password)=>{
        setIsLoading(true)
        try{
            const {data} = await axios.post('/api/auth/login', {email, password}, {ContentType: "application/json"})
            setUserInfo(data)
            setIsLoading(false)
            if(data.msg == "success"){
                toast("Authentication Successful")
                window.location.href = "/dashboard";
            }            
        }catch(error){
            const err = error.response?.data
            setIsLoading(false)
            toast(err.msg)
        }
    }

    const fetchUserDetails = async ()=>{
        try {
            const {data} = await axios.get('/api/auth');
            if(data.msg == "success"){
                setUserInfo(data?.data)
            }
        } catch (error) {
            const err = error.response?.data
            setIsLoading(false)
            // toast(err.msg)
        }
    }


    const rewardUserByUserId = async (userId)=>{
        setIsLoading(true)
        try {
            const {data} = await axios.put(`/api/user/reward`, {userId});
            setIsLoading(false)
            if(data.msg == "success"){
                toast("User rewarded successfully")
            }
        } catch (error) {
            const err = error.response?.data
            setIsLoading(false)
            toast(err.msg)
        }
    }


    const updateUserById = async (firstName, lastName, username, email, password, userId)=>{
        setIsLoading(true)
        try {
            const {data} = await axios.put(`/api/user`, {firstName, lastName, username, email, password, userId});
            setIsLoading(false)
            if(data.msg == "success"){
                toast("User Profile  updated Successfully");
            }
        } catch (error) {
            const err = error.response?.data
            setIsLoading(false)
            toast(err.msg)
        }
    }

    async function fetchAllLeads(){
        setIsLoading(true)
        try {
            const {data} = await axios.get(`/api/leads`);
            setLeads(data.response)
            setIsLoading(false)
        } catch (error) {
            const err = error.response?.data;
            setIsLoading(false)
            toast(err?.msg)
        }
    }

    async function fetchAllUsers(){
        setIsUserFetching(true)
        try {
            const {data} = await axios.get(`/api/user`);
            setUsers(data.response)
            setIsUserFetching(false)
        } catch (error) {
            const err = error.response?.data;
            setIsUserFetching(false)
            toast(err?.msg)
        }
    }

    
    async function fetchAllContacts(){
        setIsContactFetching(true)
        try {
            const {data} = await axios.get(`/api/contact`);
            setContacts(data.response)
            setIsContactFetching(false)
        } catch (error) {
            const err = error.response?.data;
            setIsContactFetching(false)
            toast(err?.msg)
        }
    }


    async function deleteUser(userId){
        setIsLoading(true)
        try {
            const {data} = await axios.post(`/api/user`, {userId});
            setIsLoading(false)
            if(data.msg == "success"){
                toast("User deleted Successfully!")
            }
        } catch (error) {
            const err = error.response?.data;
            setIsLoading(false)
            toast(err?.msg)
        }
    }


    const logout = async ()=>{
        try {
            const {data} = await axios.get('/api/auth/logout');
            if(data.msg == "success"){  
                toast("Logout Successfully")              
                window.location.href = "/login";
            }
        } catch (error) {
            const err = error.response?.data
            setIsLoading(false)
            toast(err.msg)
        }          
    }

    const isLoggedIn = async ()=>{
        try{
            setSplashLoading(true)

            let userInfo = await localStorage.getItem('userInfo')
            userInfo = JSON.parse(userInfo)

            if(userInfo){
                setUserInfo(userInfo)
            }
            setSplashLoading(false)
        }catch(error){
            setSplashLoading(false)
            console.log(error)
        }
    }

    useEffect(()=>{
        isLoggedIn()
    },[])

    return (
        <AuthContext.Provider value={{
            login, 
            register, 
            logout, 
            isLoading,
            fetchUserDetails,
            userInfo,
            fetchAllLeads,
            fetchAllContacts,
            contacts,
            isContactFetching,
            fetchAllUsers,
            isUserFetching,
            rewardUserByUserId,
            updateUserById,
            deleteUser,
            users,
            leads
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = ()=> useContext(AuthContext);
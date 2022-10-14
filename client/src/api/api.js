/*
    This is our HTTP API, which is responsible for sending requests to our back-end API.
*/

import axios from 'axios';

const url = process.env.REACT_APP_SERVER_URL;

axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: url
});

// The following are requests that the client will make. Note that all requests
// should have a request method (e.g., GET, POST, PUT, DELETE) as well as a path.
// Some requests may have a payload (i.e., data) and/or an id.
export const createFileSharingSnapshot = (payload) => api.post('/createfilesharingsnapshot', payload);
export const createGroupMembershipSnapshot = () => api.post('/creategroupmembershipsnapshot');
export const createAccessControlRequirement = (payload) => api.post('/createaccesscontrolrequirement', payload);
export const editAccessControlRequirement = (id, payload) => api.put(`/editaccesscontrolrequirement/${id}`, payload);
export const removeAccessControlRequirement = (id) => api.delete(`/removeaccesscontrolrequirement/${id}`);
export const getUserProfile = () => api.get('/getuserprofile');
export const logout = () => api.get('/logout');


const requests = {
    createFileSharingSnapshot,
    createGroupMembershipSnapshot,
    createAccessControlRequirement,
    editAccessControlRequirement,
    removeAccessControlRequirement,
    getUserProfile,
    logout
};

export default requests;
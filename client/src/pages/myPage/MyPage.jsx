import {Grid} from "@mui/material"
import React from "react";
import MiniDrawer from "../../components/SideBar"
import ColumnMenuGrid from "../../components/ListsBar"
import Profile from "../../components/Profile";
import {useRecoilState, useSetRecoilState} from "recoil";
import {AccessControlData} from "../../recoil";
import {AuthContext} from "../../auth/auth";
import {useEffect, useContext, useState, useRef} from "react"



const MyPage = (props)=>{
    const [ACR, setACR]=useRecoilState(AccessControlData);
    useEffect(() => {
        setACR(props.userData.accessControlRequirements);
    },[]);
    console.log(ACR);
    console.log(props.userData.accessControlRequirements);
    console.log(props.userData);
    const ACR_Controller = (data) =>{
        props.ACR_Handler([...ACR,data]);
        setACR(
            [...ACR,data]
        )
    }
    const ACR_DeleteController = (id) =>{
        console.log("ACR Delete");
        console.log(props.userData.accessControlRequirements);
        let variable = [...ACR];
        let ACR_Data = variable.filter((row) => row.id !== id)
        props.ACR_Handler(ACR_Data);
        setACR(ACR_Data)
    }
    const sharingInfo= [
        <Profile userData = {props.userData}/>,
        <ColumnMenuGrid name="Recent Access Control Requirement" dataSet = {ACR} ACR_Handler={ACR_Controller} ACR_DeleteHandler={ACR_DeleteController}/>,
        <ColumnMenuGrid name="File Sharing Snapshot" dataSet = {props.userData.fileSharingSnapshots}/>,
        <ColumnMenuGrid name="Group Sharing Snapshot" dataSet = {props.userData.groupMembershipSnapshots}/>,
        <ColumnMenuGrid name="User's Recent Query" dataSet = {[]}/>
    ];

    return (
        <Grid>
            <MiniDrawer  components={sharingInfo} type = "myPage" userData = {props.userData}/>
        </Grid>
    );
}
export default MyPage
import * as React from 'react';
import {useState, useEffect} from "react";
import { deleteComment } from "../api";
import {useParams} from "react-router-dom";

const DeleteComment = () => {
    useEffect(() => {
        deleteComment()
        .then((res)=> {
            console.log('working')
        })
        .catch((err) => {
            console.log(err)
        })
    })

}
export default DeleteComment

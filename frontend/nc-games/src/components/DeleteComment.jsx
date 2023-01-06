import * as React from 'react';
import {useState, useEffect} from "react";
import { deleteComment } from "../api";
import {useParams} from "react-router-dom";

exports.DeleteComment (() => {
    useEffect(() => {
        deleteComment()
        .then((res)=> {
            console.log('workin')
        })
        .catch((err) => {
            console.log(err)
        })
    })

})

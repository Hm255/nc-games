import axios from "axios";
import React from "react";
const api = axios.create({
  baseURL: "https://backend-host-nc-games.onrender.com/api", //source database url
});

export const getReviews = (sortBy, orderBy, Category) => {
    return api.get(`/reviews`, {
        params:{
            sortedBy: sortBy,
            orderedBy: orderBy,
            category: Category
        },
    })
    .then((res) => {
        console.log(res.request['responseURL'], 'no error')
        return res.data; 
    })
    .catch((err) => {
        console.log(err)
        console.log(err.request['responseURL'], 'ERROR')
        return err;
    })
};

export const getReview = (id) => {
    return api.get(`/reviews/${id}`).then((res) => {
        console.log(res.data)
        if(res.data.review === undefined){
            console.log(res)
            return Promise.reject({status: 404, message: "no review found"})
        }
        return res.data.review;
     })
     .catch((err)=>{
        console.log(err)
        return <h2>Error: {err.request.status} at {(err.request['responseURL'])}</h2>
     })
}

export const getCategories = () => {
    return api.get(`/categories/`).then((res) => {
        return res.data;
     })
     .catch((err)=>{
        console.log(err)
        return <h2>Error: {err.request.status} at {(err.request['responseURL'])}</h2>
     });
}

export const getCategory = (category) => {
    return api.get(`/categories/${category}`).then((res) => {
        return res.data;
     });
}

export const getComment = (id, comment_id) => {
    return api.get(`/reviews/${id}${comment_id}`).then((res) => {
        return res.data.comment;
     });
}

export const getComments = (review_id) => {
    return api.get(`/reviews/${review_id}/comments`).then((res) => {
        console.log(res)
        console.log(res.request['responseURL'], 'no error')
        return res.data
    })
    .catch((err) => {
        console.log(err)
        console.log(err.request['responseURL'], 'ERROR')
    })
}

export const editReview = (inc_votes, id) => {
    return api.patch(`/reviews/${id}`, inc_votes).then((res) => {
        console.log(res.request['responseURL'], 'no error')
        console.log(res)
        return res.data;
    })
    .then((err)=> {
        console.log(err, 'error')
        return err;
    })
}

export const commentVote = (inc_votes, comment_id) => {
    return api.patch(`/comments/${comment_id}`, inc_votes).then((res) => {
        console.log(res.request['responseURL'], 'no error')
        console.log(res)
        return res.data;
    })
    .then((err)=> {
        console.log(err, 'error')
        return err;
    })
}

export const getAllComments = () => {
    return api.get(`/comments`).then((res) => {
        return res.data
    })
}
export const postComment = (id, comment) => {
    return api.post(`/reviews/${id}/comments`, comment)
    .then((res) => {
        console.log(res)
        return [res.data];
     })
     .catch((err)=> {
        console.log(comment)
        console.log(err)
     });
}

export const removeComment = (comment_id) => {
    return api.delete(`/comments/${comment_id}`).then((res) => {
        console.log(res)
})
}

export const getUsers = () => {
    return api.get(`/users`).then((res)=> {
        return res.data;
    })
}
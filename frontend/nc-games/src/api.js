import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-game.cyclic.app/api", //source database url
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
    })
};

export const getReview = (id) => {
    return api.get(`/reviews/${id}`).then((res) => {
        return res.data.review;
     })
     .catch((err)=>{
        console.log(err)
        return <h2>Error: {err} at {(err.request['responseURL'])}</h2>
     })
}

export const getCategories = () => {
    return api.get(`/categories/`).then((res) => {
        return res.data;
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
        console.log(res.request['responseURL'], 'no error')
        return res.data
    })
    .catch((err) => {
        console.log(err)
        console.log(err.request['responseURL'], 'ERROR')
        return {status: 404, message: "no comment found"}
    })
}

export const editReview = (inc_votes, id) => {
    return api.put(`/reviews/${id}`).then((res) => {
        return res.data;
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
        console.log(comment)
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
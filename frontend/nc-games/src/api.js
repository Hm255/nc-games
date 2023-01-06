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
     });
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
    })
}

export const getApi = () => {
    return api.get(`/api`).then((res) => {
        return res.data;
    })
}

export const editReview = (inc_votes, id) => {
    return api.put(`/reviews/${id}`).then((res) => {
        return res.data;
    })
}

export const postComment = (id) => {
    return api.post(`/reviews/${id}/comments`).then((res) => {
        return res.data.comment;
     });
}

export const removeComment = (id, comment_id) => {
    return api.delete(`/reviews/${id}${comment_id}`).then((res) => {
})
}
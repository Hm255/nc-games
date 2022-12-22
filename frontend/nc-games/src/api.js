import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-game.cyclic.app/api", //source database url
});

export const getReviews = (sortBy, orderBy, Category) => {
    return api.get(`/reviews`, {
        params:{
            sortedBy: sortBy,
            orderedBy: orderBy,
            Category: Category,
        },
    })
    .then((res) => {
        console.log(res)
        return res.data; 
    })
    .catch((err) => {
        console.log(err)
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

export const postComment = (id, comment_id) => {
    return api.post(`/reviews/${id}${comment_id}`).then((res) => {
        return res.data.comment;
     });
}

export const removeComment = (id, comment_id) => {
    return api.delete(`/reviews/${id}${comment_id}`).then((res) => {
        return res.data.comment;
})
}
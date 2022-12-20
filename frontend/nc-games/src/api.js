import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-game.cyclic.app/api", //source database url
});

export const getReviews = (sortBy, orderBy, Category) => {
    return api.get(`/reviews`, {
        params:{
            sortBy: sortBy,
            orderBy: orderBy,
            Category: Category,
        },
    })
    .then((res) => {
        console.log(res.data)
        return res.data; 
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
    return api.get(`/api`)
}
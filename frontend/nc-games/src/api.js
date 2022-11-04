import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-project-work.herokuapp.com/api", //source database url
});

export const getReviews = () => {
    return api.get(`/reviews`).then((res) => {
        return res.data;
     });
}

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

export const patchVotes = (id) => {
    return api.patch(`/reviews/${id}`, {inc_votes: 1}).then((res) => {
        return res.data
    })
}
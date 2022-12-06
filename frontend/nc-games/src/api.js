import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-game.cyclic.app/api", //source database url
});

export const getReviews = (sortedBy, orderedBy, category) => {
    return api.get("reviews",{
    Params: {
        sort_by: sortedBy, 
        order_by: orderedBy, 
        category: category,
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
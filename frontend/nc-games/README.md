# Board games review front-end

this read me will walk you through on how to use this program

## Endpoints/routes (default: GIT Phttps://nc-game.cyclic.app/api)

### /Reviewlist: 

Contains all reviews created, this page has query string filters which can filter out unselected categories, order by a numerable metric such as comment/vote count in ascending or descending order. Each review has its review_id at the top.

#### /reviews(Reviewlist)/$review_id:

The review_id which can be selected from the top of the single reviews (the number at the top of the review) will lead someone to that review, this will contain the selected review, its description and its comments.

The comments on the page come from different users and each user can only remove their own comments here with the button marked 'Delete Your Comment'.

### /Categories

This page will return all included categories with their descriptions. Clicking on a category will lead you to /Reviewlist with the filter set to filtering this category.

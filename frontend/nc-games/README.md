# Board games review front-end

this will walk you through on how to use this webiste

## prerequisites

You will need the packages listed below

my current pkg.json dependencies

{
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.2.1",
    "dropdown": "^0.2.0",
    "libpq": "^1.8.12",
    "node": "^19.3.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.2",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  }
}

earliest node version compatibility: v18.12.1
## Endpoints/routes 

## hosted backend: https://nc-game.cyclic.app/api
## Backend github repository: https://github.com/Hm255/Backend-Host

### /Reviewlist: 

Contains all reviews created, this page has query string filters which can filter out unselected categories, order by a numerable metric such as comment/vote count in ascending or descending order. Each review can be read by clicking the book symbol at the top of the screen. 

#### /reviews(Reviewlist)/$review_id:

The review_id which can be selected from the top of the single reviews (the book at the top of the review) will lead someone to that review, this will contain the selected review, its description and its comments.

The comments on the page come from different users and each user can only remove their own comments here with the button marked with a bin.

## Decoration:
CSS for bubbles and darkening shades of blue on page: https://codepen.io/diyorbek0309/pen/mdwbEve
react-icons: 
https://react-icons.github.io/react-icons/icons?name=ai
https://react-icons.github.io/react-icons/icons?name=bs

### there will be error handling added

## possibly handy tips

if you get this when trying to run the application: 
Error: error:0308010C:digital envelope routines::unsupported

this is happening because your terminal's node version is unsupported (can be an issue on earlier and later versions) or the ssl isn't functioning.

run this in the terminal to fix this error(macOS/linux)(Windows Git Bash)-
export NODE_OPTIONS=--openssl-legacy-provider

Windows command prompt-
set NODE_OPTIONS=--openssl-legacy-provider

Windows PowerShell-
$env:NODE_OPTIONS = "--openssl-legacy-provider"

you may also have to alter your code slightly after running the above command prompts for the website to work again

also place redirects in the main route outside public if error handling refuses to work
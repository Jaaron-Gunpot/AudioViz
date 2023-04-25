import { MyBookmark } from "./myBookmark.js";
import { Favorite } from "./favorite.js";
import * as storage from "./storage.js"
import { MyHero } from "./hero.js";
let favorites = []
// favorites.push(new Favorite({
//     text: "RIT",
//     url: "https://www.rit.edu",
//     comments: "A private university located near Rochester, NY."
// }))
//console.log(favorites)
const deleteFavorite = (fid) => {
    const favoriteToDelete = favorites.find((favorite) => { return favorite.fid == fid })
    //console.log(favorites)
    //from https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
    if (favoriteToDelete) {
        //if the fid exists, get rid of it
        favorites.splice(favorites.indexOf(favoriteToDelete), 1)
    }
    //console.log(fid)
    //console.log(favorites)
    storage.clearFavorites()
    storage.setFavorites(favorites)

    //re-render the page
    loadFavoritesFromStorage()
}
const createBookmarkComponent = (text, url, comments) => {
    let newBookmark = document.createElement("my-bookmark")
    newBookmark.dataset.text = text//text
    newBookmark.dataset.url = url//url
    newBookmark.dataset.comments = comments//comments
    newBookmark.dataset.fid = favorites[fidCounter].fid
    //console.log(newBookmark.dataset.fid)
    //deleteFavorite(favorites[fidCounter].fid)
    newBookmark.callback = deleteFavorite
    //console.log(newBookmark)
    let newLi = document.createElement("li")
    newLi.appendChild(newBookmark)
    document.querySelector('#bookmarks').appendChild(newLi)
}
//createBookmarkComponent()
let fidCounter = 0
const loadFavoritesFromStorage = () => {
    document.querySelector("#bookmarks").innerHTML = ""
    fidCounter = 0
    favorites = storage.getFavorites()
    //console.log(storage.getFavorites())
    if (favorites.length >= 1) {
        for (let favorite of favorites) {
            //console.log(favorite)
            createBookmarkComponent(favorite.text, favorite.url, favorite.comments)
            fidCounter++
        }
    }

    document.querySelector("#num-of-favorites").innerHTML = `Number of Favorites:${fidCounter.toString()}`
}
loadFavoritesFromStorage()
const submitClicked = (evt) => {
    //console.log("submitClicked")
    document.querySelector("#error-provider").innerHTML =""
    const errorProvider = () => {
        document.querySelector("#error-provider").innerHTML = "<p class='has-text-danger is-size-3 is-underlined has-text-weight-semibold'>Please fill all form fields</p>"
    }

    let fields = document.querySelectorAll(".input")
    let fieldEmptyCount = 0
    fields.forEach(formField => {
        //console.log(formField.value == "")
        if (formField.value == "") fieldEmptyCount++
    })
    if (fieldEmptyCount >= 1) {
        //console.log("i am leasing")
        errorProvider()
    } else {
        let title = document.querySelector("#favorite-text").value.trim()
        let url = document.querySelector("#favorite-url").value.trim()
        let comments = document.querySelector("#favorite-comments").value.trim()
        try {
            let UI = new URL(url)
            //console.log(`url=${url},UI=${UI}`)
        } catch (exception) {
            //console.log(exception)
            document.querySelector("#error-provider").innerHTML = "<p class='has-text-danger is-size-3 is-underlined has-text-weight-semibold'>Please enter a valid URL</p>"
            return
        }
        //console.log(`title=${title}, url=${url}, comments=${comments}`)
        //if title,url,and comments all exist, do this
        if (title != "" && url != "" && comments != "") {
            //console.log("yay")
            let newFavorite = new Favorite({
                text: title,
                url: url,
                comments: comments
            })
            //console.log(newFavorite)
            favorites.push(newFavorite)
            storage.clearFavorites()
            storage.clearLocalStorage()
            storage.setFavorites(favorites)
            loadFavoritesFromStorage()
        }

        for (let field of fields) {
            //console.log(field)
            field.value = ""
        }
    }

    evt.preventDefault()
    return false
}
const clearFormFields = (evt) => {
    //console.log("cancelClicked")
    let fields = document.querySelectorAll(".input")
    for (let field of fields) {
        //console.log(field)
        field.value = ""
    }
    //console.log(fields)

    evt.preventDefault()
    return false
}

const init = () =>{
    //appends header
    let oldHtml = document.querySelector("body").innerHTML
    let header = document.createElement("my-hero")
    let body = document.querySelector("body")
    body.innerHTML=""
    body.appendChild(header)
    body.innerHTML += oldHtml
    
    //adds event listeners
    document.querySelector("#favorite-submit-button").onclick = submitClicked
    document.querySelector("#favorite-cancel-button").onclick = clearFormFields
}
init()










// const bookmarks = [
//     {
//         text: "Bing",
//         url: "https://www.bing.com",
//         comments: "Bing is a web search engine owned and operated by Microsoft."
//     },
//     {
//         text: "Google",
//         url: "https://www.google.com",
//         comments: "Google Search is a search engine provided and operated by Google."
//     },
//     {
//         text: "DuckDuckGo",
//         url: "https://duckduckgo.com/",
//         comments: "DuckDuckGo (DDG) is an internet search engine that emphasizes protecting searchers' privacy."
//     }
// ];
// window.onload = () => {
//     for (let bookmark of bookmarks) {
//         // Create a MyBookmark and add it to the list
//         let website = document.createElement("my-bookmark");

//         // ANOTHER way to set custom attributes, the .dataset property
//         // note that these 2 lines of code will also trigger attributeChangedCallback()
//         website.dataset.text = bookmark.text;
//         website.dataset.url = bookmark.url;
//         website.dataset.comments = bookmark.comments;


//         let newLI = document.createElement("li");
//         newLI.appendChild(website);
//         document.querySelector("#bookmarks").appendChild(newLI);
//     }
// };

const model = require("../database/model.js");


async function get(request, response) {
   const posts = await model.getPosts()
   if(posts.length === 0) {
       console.log("post me")
    response.send("<p>Be the first one to post!</p>")
   } else {
        let postsHTML = ""; 
        const sid = request.signedCookies.sid;
        const userData = await model.getSession(sid);

        posts.map((post) => {
            console.log(post)
            let deleteButton = "";
            // if the posts equals the array of objects with data most needed.
            if(post.user_id === userData.user.id) {
                console.log("I")
            deleteButton = /*html*/ ` 
                <form action="/delete-post" method="POST">
                    <button class="delete-button" name="post_id" value="${post.id}" aria-label="Delete ${post.post}">
                    &times;
                    </button>
                </form>`;
            }

            let postHTML = `
            <div>
            <p>User: ${post.email}</p>
            <p>recipe: ${post.recipe}</p>
            <p>jokes: ${post.joke}</p>
            <img>food photo: ${post.photo}</img>
            ${deleteButton}
            `.concat(postsHTML);
            });
            response.send(postsHTML);
         }
        }

 module.exports = {get}; 

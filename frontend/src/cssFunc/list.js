function toListView(){
    const feed = document.getElementById("poke-feed");

    if(feed.className === "grid") {
        feed.classList.remove("grid");
        feed.classList.add("feed-list");
    
        for(let i = 0; i < feed.children.length; i++) {
            const card = feed.children[i];
            const img = card.children[0].children[0].children[0]
            const imgContainer = card.children[0];
            const desc = card.children[1];
            const likeCOntainer = desc.children[1];

            likeCOntainer.classList.remove("like");
            likeCOntainer.classList.add("list-like");

            imgContainer.classList.remove("img");
            imgContainer.classList.add("list-img-container");

            desc.classList.remove("info");
            desc.classList.add("list-info");

            card.classList.remove("card");
            card.classList.add("list");

            img.classList.remove("img-content");
            img.classList.add("list-img");
        }
    }
}


export default (toListView);
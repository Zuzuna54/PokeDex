function toGridView(){
    const feed = document.getElementById("poke-feed");

    if(feed.className === "feed-list") {
        feed.classList.remove("feed-list");
        feed.classList.add("grid");

        for(let i = 0; i < feed.children.length; i++) {
            const card = feed.children[i];
            const img = card.children[0].children[0].children[0]
            const imgContainer = card.children[0];
            const desc = card.children[1];
            const likeCOntainer = desc.children[1];

            likeCOntainer.classList.remove("list-like");
            likeCOntainer.classList.add("like");

            imgContainer.classList.remove("list-img-container");
            imgContainer.classList.add("img");

            desc.classList.remove("list-info");
            desc.classList.add("info");

            card.classList.remove("list");
            card.classList.add("card");

            img.classList.remove("list-img");
            img.classList.add("img-content");
        }

    }
}

export default (toGridView);
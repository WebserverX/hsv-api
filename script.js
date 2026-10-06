const p = new URLSearchParams(window.location.search);
const api = {
    data1: null,
    data2: null,

    getData: async (file) => {
        const r = await fetch(file);
        const data = await r.json();
        return data;
    },
    init: async () => {
        api.data1 = await api.getData("./data/data.json");
        api.data2 = await api.getData("./data/data2.json");
    },
    selectVerse: (book, chapter, verse) => {
        const text = api.data1[book][`${chapter}`][`${verse}`];
        const data = {
            "book": book,
            "chapter": chapter,
            "verse": verse,
            "text": text,
        };
        return data;
    },
    selectRandomVerse: () => {
        return api.data2[Math.floor(Math.random() * api.data2.length)];
    },
    selectBook: (book) => {
        return api.data1[book];
    },
    selectChapter: (book, chapter) => {
        return api.data1[book][`${chapter}`];
    },
    selectFullData: () => {
        return api.data1;
    },
    writeToPage: (data) => {
        document.body.textContent = JSON.stringify(data);
    },
};

function showCall() {
    const call = document.querySelector("div#call");
    call.style.display = "block";
    setTimeout(() => { call.style.display = "none" }, 1000);
}

async function indexMain() {
    document.querySelectorAll("button.link-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
            await navigator.clipboard.writeText(btn.innerText);
            showCall();
        });
    });
    await api.init();
}

async function apiMain() {
    let data = null;
    if (p.has("order")) {
        const order = p.get("order");
        if (order === "random") {
            data = api.selectRandomVerse();
        } else if (order === "book" && p.has('book')) {
            data = api.selectBook(p.get('book'));
        } else if (order === "chapter" && p.has('book') && p.has('chapter')) {
            data = api.selectChapter(p.get('book'), p.get('chapter'));
        } else if (order === "verse" && p.has('book') && p.has('chapter') && p.has('verse')) {
            data = api.selectVerse(p.get('book'), p.get('chapter'), p.get('verse'));
        } else if (order === "full") {
            data = api.selectFullData();
        } else {
            document.body.textContent = "Something is wrong with your URL!";
        }
    }
    if (data !== null) {
        api.writeToPage(data);
    }
}

async function main() {
    await indexMain();
    await apiMain();
}

main();
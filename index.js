
async function fetchData(){
    const res = await fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`, { method: "GET" });
    const data = await res.json();
    return data;
}
fetchData().then(data => {
    document.body.style.backgroundImage = `url('${data.urls.full}')`;
    document.getElementById("author").innerText = `By: ${data.user.name}`
})
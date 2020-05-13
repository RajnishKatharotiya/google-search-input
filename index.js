
let cache = [];
const cancel = [];

function searchOnGoogle(query) {
    
    const GoogleAPIKey = "YOUR_GOOGLE_API_KEY"
    const SearchEngine = "YOUR_SEARCH_ENGINE_KEY"

    const RequestURL = `https://www.googleapis.com/customsearch/v1?key=${GoogleAPIKey}&cx=${SearchEngine}`

    // Check if current url is in cache and execute abort controller via respective cancel tolken 
    // Or else pushed into cache array for next requestes
        if (cache.indexOf(RequestURL) !== -1) {
            const controller = cancel.filter(i => i.url === RequestURL);
            controller.map(item => item.c());
        } else {
            cache.push(RequestURL);
        }

        const ResultList = $("#result-list");
        ResultList.empty();

        // Make a request for a user with a given Query 
        // Create and added cancel token to abort request anytime.
        const cancelToken = new axios.CancelToken(((c) => {
            cancel.push({ url: RequestURL, c });
        }));   
        axios.get(`${RequestURL}&q=${query}`, { cancelToken })
        .then(({ data = {} }) => {
            if(data.items){
                data.items.map(({ title }) => ResultList.append(`<li>${title}</li>`))
            }
        })
}



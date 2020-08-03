const url = "http://localhost:8080";

const init = {
    method: 'POST',
    mode: 'no-cors',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
};

export async function fetchTool(route, form) {
    let body = ""
    for (let i in form) {
        if (body !== "") {
            body += '&'
        }
        body += `${i}=${form[i]}`;
    }
    if (body !== "") init['body'] = body;
    console.log(init)
    const res = await fetch(url + route, init);

    console.log(res.success)

    return await res.text();
}
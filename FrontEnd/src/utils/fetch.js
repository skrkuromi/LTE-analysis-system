// const url = "http://localhost:8080";
const url = "";

const init = {
    method: 'POST',
    // mode: 'no-cors',
    mode: 'cors',
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
    const res = await fetch(url + route, init);

    if (res.status === 200) {
        return await res.json();
    } else {
        return { status: 500 };
    }
}
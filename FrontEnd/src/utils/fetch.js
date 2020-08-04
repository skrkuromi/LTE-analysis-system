// const url = "http://localhost:8080";
const url = "";

const constantInit = {
    // mode: 'no-cors',
    mode: 'cors',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
};

export async function fetchTool(type, route, form) {
    const init = JSON.parse(JSON.stringify(constantInit));

    init['method'] = type;
    let body = ""
    for (let i in form) {
        if (body !== "") {
            body += '&'
        }
        body += `${i}=${form[i]}`;
    }
    if (body !== "") {
        if (type === "GET") {
            route += '?' + body
        } else {
            init['body'] = body;
        }
    }

    const res = await fetch(url + route, init);

    if (res.status === 200) {
        return await res.json();
    } else {
        return { status: 500 };
    }
}
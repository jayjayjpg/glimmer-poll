import jQuery from 'jquery';

export async function fetchData(url: string) {
 const result = await httpGet(url);
 return result;
}

export async function putData(url: string, reqBody: object) {
  const result = await httpPost(url, reqBody);
  return result;
}


function httpGet(url) {
  return fetch(url)
    .then(request => request.json());
}

function httpPost(url, reqBody) {
  return fetch(url, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  })
    .then((res) => console.log(res));
}

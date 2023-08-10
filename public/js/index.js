let obfJSON = '';

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "same-origin", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "same-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const getOBF = async () => {
  const bracket = document.querySelector("#bracket").value;
  document.querySelector("#message").innerHTML = "waiting..."
  const data = await postData('/obf', {bracket});
  document.querySelector("#message").innerHTML = "";
  obfJSON = JSON.stringify(data, null, 2).trim()
  document.querySelector("#codeblock").innerHTML = obfJSON;
}

const copy = () => {
  navigator.clipboard.writeText(obfJSON);
}

const downloadObjectAsJson = async (exportName) => {
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(obfJSON);
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
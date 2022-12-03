addEventListener('fetch', _ => _.respondWith(handleRequest(_.request)));

async function handleRequest(request) {

  try {

    let path = new URL(request.url);
    let route = path.pathname.split("/")[1];

    route = (route == "") ? "/" : route;

    let replace = path.pathname.replace("/" + route, "");
    path = new URL(`${path.protocol}//${path.host}${replace}${path.search}`);

    let root;

    switch (route) {

      case "/":

        // get download link
        const root = await GetLatestRelease(request.headers);

        // stream download
        return path.searchParams.get("lowiro_cdn") === null
            ? fetch(root.value.url, { headers: request.headers })
            : new Response("", { status: 302, headers: { "Location" : root.value.url }
        });

      case "version":
        root = await GetLatestRelease(request.headers);

        switch (path.searchParams.get("type")) {
          case "svg":
            return new Response(MakeSVG(`v${root.value.version}`),
              { headers: { "content-type": "image/svg+xml" } });
          case "616sb":
            return new Response(MakeSVG616SB(`v${root.value.version}`),
              { headers: { "content-type": "image/svg+xml" } });
          case "arccn":
            return new Response(MakeSVGArcaeaCN(`V${root.value.version}`),
              { headers: { "content-type": "image/svg+xml" } });
        }

        return new Response(`v${root.value.version}`);

      default:
        return new Response("", { status: 404 });
    }

  } catch (e) {
    console.log(e, e.stack);
    return new Response("oops.. service now unavailable, please try again later. ヽ(*￣▽￣*)ノ", { status: 503 });
  }
}

function MakeSVG(version) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="53" height="20" style="vertical-align: middle;padding-left: 0.3em;"><text x="0" y="15" fill="black">${version}</text></svg>`;
}

function MakeSVG616SB(version) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="28" style="vertical-align: middle; padding-left: 0.3em; font-weight: 600; font-size: 1.35rem; font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;"><text x="0" y="28" fill="#2c3e50">${version}</text></svg>`;
}

function MakeSVGArcaeaCN(version) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="370" height="80" style="font-size:70px !important;font-weight: 700;text-shadow: black 0.1em 0.1em 0.2em;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF88">${version}</text></svg>`;
}

async function GetLatestRelease(headers) {
  // return {"success":true,"value":{"url":"https://static-lb.lowiro.com/serve/arcaea_3.5.0c.apk?token=kSWwRAgmnDFgYXLvnJwXoroCqREFh7O3d5gwrVKjY44SoA6Yn9iwTSqpPjNmDpAIM","version":"3.5.0c"}};
  return fetch("https://webapi.lowiro.com/webapi/serve/static/bin/arcaea/apk", { headers: headers })
    .then((raw) => raw.json());
}

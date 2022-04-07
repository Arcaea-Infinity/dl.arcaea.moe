## Usage

### 1. Create a Workers:

Enter Cloudflare dashboard and go to `Workers` tab. Click `Create a Service` button.

![Create a Service](image/Create a Service.png)

Select `HTTP handler` and click `Create service` button.

![HTTP handler](image/HTTP handler.png)

And your service will be created. You will get a service URL such as `aaaaabbbbb.ccccc.workers.dev`.

### 2. Set up this Worker:

Go to `Resources` tab and click `Quick edit` button.

![Quick edit](image/Quick edit.png)

Copy the code in [index.js](index.js), and paste it into the code field. Then click `Save and Deploy` button.

![paste code](image/paste.png)

Now your Worker is ready to use.

### 3. Test your Worker:

Open your browser and go to `https://aaaaabbbbb.ccccc.workers.dev/`, your browser will download the latest version of Arcaea.

### 4. Set your domain's DNS record:

Open you DNS dashboard and add a new `CNAME` record.

![CNAME](image/CNAME.png)

Note these values:

| Type    | Name               | Target                                           | Proxy status                   |
|---------|--------------------|--------------------------------------------------|--------------------------------|
| `CNAME` | `dl` (as you like) | `aaaaabbbbb.ccccc.workers.dev` (your Worker URL) | `Proxied` (Must be `Proxied `) |

And click `Save` button.

### 5. Set your domain as a route:

And go to `Workers` tab and click `Add route` button.

![Add route](image/Add route.png)

Enter these values:

 - `Route`: `Your domain` + `/*` (such as `dl.example.com/*`)
 - `Service`: `aaaaabbbbb` (your Worker name)

Click `Save` button.

### 6. Test your route:

Now open your browser and go to `https://dl.example.com/`, your browser will download the latest version of Arcaea.

---

title: REST API with cURL published: true createDate: 2022-01-05 tags:

- Web-Dev

---

- [Official Docs](https://curl.se/)
- In [Postman](https://www.postman.com/) we can click on **Code Snippet** to show the cURL command (and other command
  too).

## General

Note that, `-X = --request`

```bash
curl -X [method] [options] [URL]
```

- The most important options/flags

```bash frame="none"
-B: Use ASCII for text and transfer.
-C: Resume an interrupted transfer.
-d: Data for the HTTP POST or PUT commands.
-E: Use a client certificate file and optional password.
-F: Update a HTTP form request from a file.
-H: Pass a custom header to the server.
-K: Use a file for the configuration.
-m: Set a maximum time for the transfer.
-N: Disable buffering.
-o: Write the output to a file.
-s: Run in silent mode.
-u: Add a user name and password for the server.
-v: Verbose mode, for more details.
-X: Specifies the HTTP command to use.
-4: Use Ipv4 addresses.
-6: Use Ipv6 addresses.
-#: Display a progress bar. This is useful for large transfers.
```

## cURL in PHP

> [!info] We need to install extensions `php-curl` to use it. Checkthe
> [Official Documentation](https://www.php.net/manual/en/book.curl.php) to learn more

### Send Request

- Init cURL

```php
// create & initialize a curl session
$curl = curl_init();

/**
* Some code
**/

// close curl resource to free up system resources
// (deletes the variable made by curl_init)
curl_close($curl);
```

- **GET** method

```php
curl_setopt($curl, CURLOPT_URL, 'https://api.github.com/events');
# request header
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
  'User-Agent: cURL'
 ));
$raw = curl_exec($curl);
```

- **POST** method

```php
curl_setopt($curl, CURLOPT_URL, 'https://httpbin.org/post');
curl_setopt($curl, CURLOPT_POST, 1);
# request header
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
 ));
curl_setopt($curl, CURLOPT_POSTFIELDS, '{"key": "value"}');
$raw = curl_exec($curl);
```

### Response

- Body response

```php
// Raw text
...
$raw = curl_exec($curl);

# JSON
json_decode($raw, true);
```

- Status code ???

```php
$statusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE); // $statusCode = 200
```

## Some examples

### GET

```bash
curl -X GET '<http://abc:3000/xyz/enpoint?paramOne=1&paramTwo=2>' \
 --header 'clientEmail: abc@xyz.com' \
 --header 'privateKey: XXXX'
 }'
```

### POST

The JSON data must be in the form of `'{with the "double quotes" inside}'`. This `"{single 'quote' inside}"` will not
work!

```bash
curl -X POST '<http://abc:3000/xyz/enpoint?paramOne=1&paramTwo=2>' \
 --header 'clientEmail: abc@xyz.com' \
 --header 'privateKey: LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2Z0lCQU' \
 --header 'Content-Type: application/json' \
 --data-raw '{
  "dataMain": {
   "keyOne": "valueOne",
   "keyTwo": 2
  }
 }'
```

or with `JSON` file

```bash
curl -X POST \
  --header "Content-Type: application/json" \
  --data @.folder/file.json \
  <http://localhost:8080/ui/webapp/conf>
```

or **form data**

We have a form that can upload file

```html
<form method="POST" enctype="multipart/form-data" action="upload.cgi">
  <input type="file" name="upload" />
  <input type="submit" name="press" value="OK" />
</form>
```

```bash
curl --form upload=@/home/user/Pictures/wallpaper.jpg --form press=OK [URL]
```

# 100 Thai Flag Game API

## Get player token
Suffix URL: **/api/player/token**  
Method: **POST**  

**Body**

| Parameter Name | Example |
|:--|:--:|
| player_name | nut |

**Returned JSON**
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGFrcG9uIiwidGltZV9zdGFtcCI6IjOlJ34jqc_gc9DlELhHph6EO-3IbpciDNkA6KM"
}
```

## Store Player score
Suffix URL: **/api/player/score**  
Method: **POST**  

**Body**

| Parameter Name | Example |
|:--|:--:|
| token | eyJhbGciOiJIUzI1NiIsInRM |
| score | 9999 |

**Returned JSON**
```
{
  ranking: 1
}
```

## Get Top 10 Players Score  
Suffix URL: **/api/player/score**  
Method: **GET**  

**Returned JSON**
```
{
  "score_list": [
    {
      "createdAt": "2017-01-25T11:24:28.823Z",
      "id": "755a2676-6627-4d96-bf5d-131a75c06626",
      "name": "Pakpon",
      "score": 11
    },
    {
      "createdAt": "2017-01-25T11:24:25.428Z",
      "id": "556d115a-e26b-456b-9372-e3cf3c787d41",
      "name": "Pakpon",
      "score": 10
    },
    {
      "createdAt": "2017-01-25T11:24:22.510Z",
      "id": "e28ff6e2-e70c-44e6-81ef-2d9a9f52652d",
      "name": "Pakpon",
      "score": 9
    },
    {
      "createdAt": "2017-01-25T11:24:19.964Z",
      "id": "06bce360-306a-454f-8691-7794dd972fdb",
      "name": "Pakpon",
      "score": 8
    },
    {
      "createdAt": "2017-01-25T11:24:16.635Z",
      "id": "73b15272-6cac-4177-9298-1083d54013c3",
      "name": "Pakpon",
      "score": 7
    },
    {
      "createdAt": "2017-01-25T11:24:15.380Z",
      "id": "b702a1bd-0fe7-432c-b654-bfb32459b3d5",
      "name": "Pakpon",
      "score": 6
    },
    {
      "createdAt": "2017-01-25T11:24:14.282Z",
      "id": "5e562630-17df-41ad-a439-067e8e17b4a2",
      "name": "Pakpon",
      "score": 5
    },
    {
      "createdAt": "2017-01-25T11:24:12.987Z",
      "id": "cee12396-1cdf-4cd5-9317-39a207c6c145",
      "name": "Pakpon",
      "score": 4
    },
    {
      "createdAt": "2017-01-25T11:23:33.205Z",
      "id": "1092cec9-e53d-4733-8457-50e7b7406eaa",
      "name": "Pakpon",
      "score": 3
    },
    {
      "createdAt": "2017-01-25T11:23:31.979Z",
      "id": "7d83f35b-2432-4654-8489-647073dc87f3",
      "name": "Pakpon",
      "score": 2
    }
  ]
}
```

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

## Get Top 10 Players Score  
Suffix URL: **/api/player/score**  
Method: **GET**  

**Returned JSON**
```
{
  "score_list": [
    {
      "createdAt": "2017-01-25T10:06:14.288Z",
      "id": "ec3a0064-845d-42dc-b695-e376f4f6d3c6",
      "name": "Pakpon",
      "score": "8967"
    },
    {
      "createdAt": "2017-01-25T10:05:24.965Z",
      "id": "a57fde50-1e36-402a-8bf4-823be954b177",
      "name": "Pakpon",
      "score": "55"
    },
    {
      "createdAt": "2017-01-25T10:06:18.778Z",
      "id": "3f00d648-5c43-499e-98b5-a20010430f97",
      "name": "Pakpon",
      "score": "4332"
    },
    {
      "createdAt": "2017-01-25T10:06:05.025Z",
      "id": "bc62cb53-aebb-4728-9715-fee03e5c1c6f",
      "name": "Pakpon",
      "score": "4321"
    },
    {
      "createdAt": "2017-01-25T10:06:17.038Z",
      "id": "78ac2c15-37b7-48b3-ad47-94537cc85e4a",
      "name": "Pakpon",
      "score": "43"
    },
    {
      "createdAt": "2017-01-25T10:05:54.602Z",
      "id": "812a3611-fa53-4d49-b946-b9a9b0e9ff15",
      "name": "Pakpon",
      "score": "4"
    },
    {
      "createdAt": "2017-01-25T10:06:07.159Z",
      "id": "ceabe3aa-89c6-422c-96b3-56848d11aa2a",
      "name": "Pakpon",
      "score": "234"
    },
    {
      "createdAt": "2017-01-25T10:06:08.714Z",
      "id": "6ba34714-39ef-483f-aa25-861556761b55",
      "name": "Pakpon",
      "score": "23"
    }
  ]
}
```

# Create location
@desc POST single location

@route /api/locations

@access Protected -- API key, require user login

Example request: POST /api/locations?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{ 
  "location_name": "Lot A",
  "coordinates": "49°15&#39;16.2&quot;N 122°59&#39;53.7&quot;W",
  "description": ""
}
```

Descripion will default to an empty string if it is not provided in the request body

# SUCCESS RESPONSE BODY
```
{ 
  "_id": "607e3ab0a0d3df815abfcfb1",
  "location_name": "Lot A",
  "coordinates": "49°15&#39;16.2&quot;N 122°59&#39;53.7&quot;W",
  "description": ""
}
```
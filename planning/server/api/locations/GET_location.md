# Get location
@desc GET single location

@route /api/locations/:id

@access Protected -- API key

Example request: GET /api/locations/607e3ab0a0d3df815abfcfb1?key=<API_KEY>

# EXAMPLE RESPONSE BODY
```
{ 
  "_id": "607e3ab0a0d3df815abfcfb1",
  "location_name": "Lot A",
  "coordinates": "49°15&#39;16.2&quot;N 122°59&#39;53.7&quot;W",
  "description": ""
}
```
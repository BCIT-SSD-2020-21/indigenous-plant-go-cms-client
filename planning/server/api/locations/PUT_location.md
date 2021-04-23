# Update location
@desc PUT single location (Update)
@route /api/locations/:id
@access Protected -- API key, require user login

Example request: PUT /api/locations/607e399e59c8feg7e2af65r7?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{ 
  "location_name": "Lot A",
  "coordinates": "49°15&#39;16.2&quot;N 122°59&#39;53.7&quot;W",
  "description": ""
}
```

# SUCCESS RESPONSE BODY
```
"Location updated"
```
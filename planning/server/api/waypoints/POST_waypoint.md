# Create waypoint
@desc POST single waypoint

@route /api/waypoints

@access Protected -- API key, require user login

Example request: POST /api/waypoints?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{
  "waypoint_name": "test",
  "description": "test",
  "images": ["607fa01931325a2e700a4307"],
  "audio_files": ["607fa01931325a2e700a4307"],
  "videos": ["607fa01931325a2e700a4307"],
  "tags": ["607fa01931325a2e700a4307", "607fa01931325a2e700a4307"],
  "categories": ["607fa01931325a2e700a4307"],
  "location": "607fa01931325a2e700a4307",
  "plants": ["607fa01931325a2e700a4307"],
  "custom_fields": [
    {
      "custom_field_id": "607e399e59c86677e2af65r7",
      "field_title": "Medical",
      "content": "Use in medical"
    }
  ]
}
```

Waypoint_name, description, and location are required fields

If an array field is not provided it will default to empty array

On create, a new revision will be set base on the user creating the waypoint

# SUCCESS RESPONSE BODY
```
"Waypoint added"
```
# Industry Project: BCIT Indigenous Plant Go

Members: Patrick Fortaleza, J-D Bona, Wayne Lee, Aj Purugganan

<br>

## APPLICATION TYPE: Content Managing System

<br>

## FEATURE LIST

---

### Core Application Features

1. User Authentication
2. User can post, update, delete plant data including videos and audio clips
3. User can post, update, delete other data
4. API that exposes plant data

### Nice-to-have Features

1. QR code integration
2. App responsiveness for mobile
3. Tag, filter and search plants
4. Drag and drop feature for CMS

### Functional Requirements

1. User will be able to do CRUD operations for updating the database
2. System will require a database that stores information and media content

### Non-functional Requirements

1. An API will be used to communicate data from the server to the front-end.
2. The application will use ReactJS to send POST/GET/UPDATE/DELETE Requests

<br>

### Roles and Permission

1. Content Manager.<br>
   a. Log-in to web-based CMS <br>
   b. Modify size and image alignment <br>
   c. Edit text, font, size <br>
   d. Upload/edit/delete plant, waypoint, and learn more data
   e. Upload/edit/delete media [images, audio, video]
   f. Upload/edit/delete categories, tags
   g. Upload/edit/delete locations
   h. Update own user information <br>
   <br>
2. Administrator:<br>
   a. everything a Content Manager can do
   b. Register new Content Manager accounts
   c. Edit any user information.

## SUPPORTING DOCUMENTS

---

### ER Diagram

![image](/planning/database/ERD/ERDv2.png)

### Wireframes

#### Home

![image](/planning/client/wireframes/DASHBOARD - Home.png)

#### Plant Content Type

![image](/planning/client/wireframes/PLANTS - All Plants.png)
![image](/planning/client/wireframes/PLANTS - Categories.png)
![image](/planning/client/wireframes/PLANTS - Add New Plant.png)
![image](/planning/client/wireframes/PLANTS - Edit Plant.png)
![image](/planning/client/wireframes/PLANTS - Add-Edit Plant (Add Custom Field Modal).png)
![image](/planning/client/wireframes/PLANTS - Add-Edit Plant (Create Tag-Category Modal).png)
![image](/planning/client/wireframes/PLANTS - Add-Edit Plant (Edit Custom Field Modal).png)
![image](/planning/client/wireframes/PLANTS - Add-Edit Plant (Upload Media Modal).png)

#### Users

![image](/planning/client/wireframes/USERS - All Users.png)
![image](/planning/client/wireframes/USERS - Add User.png)
![image](/planning/client/wireframes/USERS - Update User.png)

#### Profile

![image](/planning/client/wireframes/MY User.png)

#### Tags

![image](/planning/client/wireframes/TAGS.png)

#### Locations

![image](/planning/client/wireframes/LOCATIONS.png)

#### Media Uploads

![image](/planning/client/wireframes/MEDIA - Images.png)
![image](/planning/client/wireframes/MEDIA - Audio.png)

#### Expanded Sidebar

![image](/planning/client/wireframes/DASHBOARD - Expanded Sidebar.png)

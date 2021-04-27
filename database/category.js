

await categories.insertMany([
  {
    "category_name" : "waypoint sw1",
  },
  {
    "category_name" : "waypoint sw2",
  },
  {
    "category_name": "Caryophyllaceae"
  },
  {
    "category_name": "Asteraceae"
  },
  {
    "category_name" : "english walk"
  },
  {
    "category_name" : "scenic"
  }
])


const plant_category1 = await plant_categories.findOne({"category_name": "Caryophyllaceae"})
const plant_category2 = await plant_categories.findOne({"category_name": "Asteraceae"})
const tour_category1 = await tour_categories.findOne({"category_name" : "english walk"})
const tour_category2 = await tour_categories.findOne({"category_name" : "scenic"})
const waypoint_category1 = await waypoint_categories.findOne({"category_name" : "waypoint sw1"})
const waypoint_category2 = await waypoint_categories.findOne({"category_name" : "waypoint sw2"})

// 6. Waypoint  Categories
await waypoint_categories.insertMany([
  {
    "categories" : [waypoint_category1._id, waypoint_category2._id] 
  }
])

// 7. Insert Plant Categories
await plant_categories.insertMany([
  {
    "categories" : [plant_category1._id, plant_category2._id] 
  },
])

// 8. Insert Tour Categories
await tour_categories.insertMany([
  {
    "categories" : [tour_category1._id, tour_category2._id] 
  }
])


///==============

// 6. Insert Waypoint Categories
await waypoint_categories.insertMany([
  {
    "category_name" : "waypoint sw1",
  },
  {
    "category_name" : "waypoint sw2",
  }

])

// 7. Insert Plant Categories
await plant_categories.insertMany([
  {
    "category_name": "Caryophyllaceae"
  },
  {
    "category_name": "Asteraceae"
  }
])

// 8. Insert Tour Categories
await tour_categories.insertMany([
  {
    "category_name" : "english walk"
  },
  {
    "category_name" : "scenic"
  }
])

// 9. Insert Categories
const plant_category1 = await plant_categories.findOne({"category_name": "Caryophyllaceae"})
const plant_category2 = await plant_categories.findOne({"category_name": "Asteraceae"})
const tour_category1 = await tour_categories.findOne({"category_name" : "english walk"})
const tour_category2 = await tour_categories.findOne({"category_name" : "scenic"})
const waypoint_category1 = await waypoint_categories.findOne({"category_name" : "waypoint sw1"})
const waypoint_category2 = await waypoint_categories.findOne({"category_name" : "waypoint sw2"})

await categories.insertMany([
  {
    "category_name": "Plants",
    "plant_categories" : [plant_category1._id, plant_category2._id]
  },
  {
    "category_name": "Tours",
    "tour_categories" : [tour_category1._id, tour_category2._id]
  },
  {
    "category_name": "Waypoints",
    "waypoint_categories" : [waypoint_category1._id, waypoint_category2._id]
  }
])

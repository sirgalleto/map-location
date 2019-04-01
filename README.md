# skycatch-challenge
Skycatch technical challenge

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
VUE_APP_MAPBOX_ACCESS_TOKEN={mapboxToken} npm run dev
```

### Starts a "production" run
```
VUE_APP_MAPBOX_ACCESS_TOKEN={mapboxToken} npm run start
```

### Run tests
```
npm run test
```

### Lints
```
npm run lint
```

## Problem  

We want to show the user a live map of locations that are fetched from a data store. Upon accessing the page the user should see a map around the given locations and it should get updates live if the data is modified elsewhere. Each location at a given latitude and longitude should show the name of the location and a status indicating whether it’s open or not. 
The frontend should have at least basic editing capabilities for locations, and any changes on the backend datastore should be reflected without refreshing.

## Constraints 

* The tecnology stack should follow the following recomendations: 
  * Backend: - Node 8 - Hapi v17, Express or Koa - RDBMS (e.g. MySQL, SQLite, etc.). 
  * Frontend: - React, Vue or Angular (not AngularJS).
* The configuration should tend to cero, so the application could be executed in a couple of commands.

## Tech stack choice 
* Frontend:
  * VueJS
  * Vuex
  * MapBox
* Backend
  * Express
  * Sequelize
  * SQLite
  * SocketIO

## Assumptions 
* A Mapbox _access token_ is going to be provided.
* The solution is not required to run out of the current browser versions.

## Solution proposal 

The problem can be divided in two components: 

* A *challenge API* component that interacts with a datastore where the map locations are located, and expose a RESTFUL endpoint where any client can perform CRUD actions to the location entity, as well as a web socket channel that sends an event when an update happens.

* A *webclient* that presents to the user a map to interact with the locations exposed in the API, with the ability to create, update and delete the locations retrieved. And, receive the real-time updates via web socket connection. 

### challenge API

#### Overview 

The challenge API_ is a service that interacts with a single table SQLite database, exposes a RESTFUL single endpoint api, and a socket with a `location` channel.

Adittionally the API implementations includes a workflow to create database migrations where the schema is syncronized with the database. 

#### Location Entity

| Property 	|  Type  	|        Description       	| Required 	|     Example     	|
|:--------:	|:------:	|:------------------------:	|:--------:	|:---------------:	|
| id       	| Int    	| Location Identifier      	| true     	| 101             	|
| name     	| String 	| Location name            	| true     	| Skycatch office 	|
| lat      	| Double 	| ISO 6709:2008 Latitude   	| true     	| 20.665826       	|
| long     	| Double 	| ISO 6709:2008 Longitude  	| true     	| -103.372706     	|
| isOpen   	| Bool   	| Locations is open or not 	| true     	| false           	|


#### Location Endpoints

* Get Location

Request
```
{
    url: "/location/",
    type : "GET",
}
```

Result 
```
 {
  code: 200,
  body: [<Location>]
}
```
* Get Location by Id

Request
```
{
    url: "/location/:id",
    type : "GET",
}
```

Result
```
{
  code: 200,
  body: <Location>
}
```

* Create Location

Request
```
{
    url: "/location/",
    type : "POST",
    headers: {
      'Content-Type': 'application/json'
    }
    body: {
      name: '<String>',
      lat: '<Double>',
      long: '<Double>',
      isOpen: '<Boolean>'
    }
}
```

Response
```
{
  code: 200,
  body; <Location>
}
```

* Update Location

Request
```
{
    url: "/location/:id",
    type : "PUT",
    headers: {
      'Content-Type': 'application/json'
    }
    body: {
      name: '<String>',
      lat: '<Double>',
      long: '<Double>',
      isOpen: '<Boolean>'
    }
}
```

Response
```
{
  code: 200,
  body; <Location>
}
```

* Delete Location

Request
```
{
    url: "/location/:id",
    type : "DELETE",
}
```

Response
```
{
  code: 200,
  body: null
}
```

* API Error Codes
  * 404: Resource Not Found.
  * 500: Internal Server Error.
  * 400: Bad Request.

#### Location channel events

* Location added 

```
{
  eventType: 'CREATE',
  locationId: '<Int>'
}
```

* Location updated 

```
{
  eventType: 'UPDATE',
  locationId: '<Int>'
}
```

* Location deleted

```
{
  eventType: 'DELETE',
  locationId: '<Int>'
}
```

#### Observations 

### Challenge Webclient 

#### Overview 

The challenge webclient provides a UI where the user can see a map with the locations stored in the _challenge API_, perform actions to those locations, and create new locations.

### 
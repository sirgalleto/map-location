# skycatch-challenge
Skycatch technical challenge

## How to run

`$ npm run start`

## Problem  

We want to show the user a live map of locations that are fetched from a data store. Upon accessing the page the user should see a map around the given locations and it should get updates live if the data is modified elsewhere. Each location at a given latitude and longitude should show the name of the location and a status indicating whether it’s open or not. 
The frontend should have at least basic editing capabilities for locations, and any changes on the backend datastore should be reflected without refreshing.

## Solution proposal 

The problem can be divided in two components: 

* An API component that interacts with a Database where the map locations are saved and expose a RESTFUL endpoint where any client can perform CRUD actions to the location entity, as well as a web socket endpoint that sends an event when an update happens.

* A frontend client that presents to the user a map to interact with the locations exposed in the API, with the ability to create, update and delete the locations retrieved. And, receive the real-time updates via web socket connection. 

### 1) API

#### Technology Stack

- Node 8 
- Express 
- SocketIO

#### Location Entity 

| Property 	|  Type  	|        Description       	|     Example     	|
|:--------:	|:------:	|:------------------------:	|:---------------:	|
| id       	| Int    	| Location Identifier      	| 101             	|
| name     	| String 	| Location name            	| Skycatch office 	|
| lat      	| Double 	| Iso 6709:2008 Latitude   	| 20.665826       	|
| long     	| Double 	| ISO 6709:2008 Longitude  	| -103.372706     	|
| isOpen   	| Bool   	| Locations is open or not 	| false           	|


#### Location Request



```

```
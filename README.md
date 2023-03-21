# KIRIBOARD - A dashboard project powered by Spring Boot + ReactJS
*Author: Nicolas Bahl, Mufan Jiang*

## Requirement
- node.js
- jdk-11

## Deployment

**IMPORTANT:** configure your Database in `./dashboard/back/src/main/resources/application.properties`, MariaDB is recommanded since a configuration example is included already.

```bash
cd ./dashboard
gradle bootRun
```

## Service integrated
### OpenWeather
Widget supported: 
**Current Weather**
`GET /widget/currentWeather?city=[city]`
Displays current weather in the selected city.

### Strasbourg.eu
Widgets supproted:

**Town Hall Waiting Time**

`GET /widget/waitingTime?name=[name]`

Displays the status and waiting time of selected town hall in Strasbourg.

**Pool Status**

`GET /widget/poolStatus?name=[name]`

Displays the status and occupation of selected public pool in Strasbourg.

### News API
Widget supported:

**News Feed**

`GET /widget/newsFeed?country=[country]&category=[category]`

Displays the headlines of the selected category in the selected region.

### Chuck Norris
Widget supported:

**Chuck Norris Joke**

`GET /widget/chuckNorris?category=[category]`

Displays a random Chuck Norris joke on selected subject.

### Agify
Widget supported:

**Random Age**

`GET /widget/random_age?name=[name]`

displays a faire guess of age corresponding to your name.

#### To simplify the register process, we now support Google login.

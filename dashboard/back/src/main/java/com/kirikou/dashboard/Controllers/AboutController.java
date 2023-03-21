package com.kirikou.dashboard.Controllers;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.kirikou.dashboard.Models.Widget.CurrentWeatherWidget;
import com.kirikou.dashboard.Models.Widget.WaitingTimeWidget;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;

@RestController()
@CrossOrigin(origins ="http://localhost:3000")
@RequestMapping()
public class AboutController {


    @GetMapping(value = "/about.json")
    @ResponseBody
    public ObjectNode getCurrentWeather(HttpServletRequest request) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode rootNode = mapper.createObjectNode();

        ObjectNode clientNode = mapper.createObjectNode();
        clientNode.put("host", request.getRemoteAddr());
        rootNode.set("client", clientNode);

        ObjectNode serverNode = mapper.createObjectNode();
        serverNode.put("current_time", (int)(System.currentTimeMillis() / 1000));

        ArrayNode serviceNode = mapper.createArrayNode();


        ObjectNode weatherNode = mapper.createObjectNode();
        weatherNode.put("name", "weather");
        ArrayNode weatherWidgetsNode = mapper.createArrayNode();

        ObjectNode currentTempNode = mapper.createObjectNode();
        currentTempNode.put("name", "currentWeather");
        currentTempNode.put("description", "Display the current weather for a city.");
        ArrayNode currentTempParams = mapper.createArrayNode();
        ObjectNode currentTempParam1 = mapper.createObjectNode();
        currentTempParam1.put("name", "city");
        currentTempParam1.put("type", "string");
        currentTempParams.add(currentTempParam1);
        currentTempNode.set("params", currentTempParams);

        weatherWidgetsNode.add(currentTempNode);
        weatherNode.set("widgets", weatherWidgetsNode);


        ObjectNode newsNode = mapper.createObjectNode();
        newsNode.put("name", "news");
        ArrayNode newsWidgetsNode = mapper.createArrayNode();

        ObjectNode newsFeedNode = mapper.createObjectNode();
        newsFeedNode.put("name", "newsFeed");
        newsFeedNode.put("description", "Display headlines of selected category in selected country.");
        ArrayNode newsFeedParams = mapper.createArrayNode();
        ObjectNode newsFeedParam1 = mapper.createObjectNode();
        newsFeedParam1.put("name", "country");
        newsFeedParam1.put("type", "string");
        ObjectNode newsFeedParam2 = mapper.createObjectNode();
        newsFeedParam2.put("name", "category");
        newsFeedParam2.put("type", "string");
        newsFeedParams.add(newsFeedParam1);
        newsFeedParams.add(newsFeedParam2);
        newsFeedNode.set("params", newsFeedParams);

        newsWidgetsNode.add(newsFeedNode);
        newsNode.set("widgets", newsWidgetsNode);


        ObjectNode strasbourgNode = mapper.createObjectNode();
        strasbourgNode.put("name", "strasbourg.eu");
        ArrayNode strasbourgWidgetsNode = mapper.createArrayNode();

        ObjectNode mairieNode = mapper.createObjectNode();
        mairieNode.put("name", "waitingTime");
        mairieNode.put("description", "Display status and estimated waiting time at selected town hall.");
        ArrayNode mairieParams = mapper.createArrayNode();
        ObjectNode mairieParam1 = mapper.createObjectNode();
        mairieParam1.put("name", "name");
        mairieParam1.put("type", "string");
        mairieParams.add(mairieParam1);
        mairieNode.set("params", mairieParams);

        ObjectNode poolNode = mapper.createObjectNode();
        poolNode.put("name", "poolStatus");
        poolNode.put("description", "Display status and occupation at selected public pool.");
        ArrayNode poolParams = mapper.createArrayNode();
        ObjectNode poolParam1 = mapper.createObjectNode();
        poolParam1.put("name", "name");
        poolParam1.put("type", "string");
        poolParams.add(poolParam1);
        poolNode.set("params", poolParams);

        strasbourgWidgetsNode.add(mairieNode);
        strasbourgWidgetsNode.add(poolNode);
        strasbourgNode.set("widgets", strasbourgWidgetsNode);

        ObjectNode chuckNode = mapper.createObjectNode();
        chuckNode.put("name", "chuckNorris");
        ArrayNode chuckWidgetsNode = mapper.createArrayNode();

        ObjectNode jokeNode = mapper.createObjectNode();
        jokeNode.put("name", "chuckNorrisJoke");
        jokeNode.put("description", "Display a random Chuck Norris joke on selected theme.");
        ArrayNode jokeParams = mapper.createArrayNode();
        ObjectNode jokeParam1 = mapper.createObjectNode();
        jokeParam1.put("name", "category");
        jokeParam1.put("type", "string");
        jokeParams.add(jokeParam1);
        jokeNode.set("params", jokeParams);

        chuckWidgetsNode.add(jokeNode);
        chuckNode.set("widgets", chuckWidgetsNode);


        ObjectNode agifyNode = mapper.createObjectNode();
        agifyNode.put("name", "agify");
        ArrayNode agifyWidgetsNode = mapper.createArrayNode();

        ObjectNode randomAgeNode = mapper.createObjectNode();
        randomAgeNode.put("name", "randomAge");
        randomAgeNode.put("description", "Display a faire guess of age corresponding to your name.");
        ArrayNode randomAgeParams = mapper.createArrayNode();
        ObjectNode randomAgeParam1 = mapper.createObjectNode();
        randomAgeParam1.put("name", "name");
        randomAgeParam1.put("type", "string");
        randomAgeParams.add(randomAgeParam1);
        randomAgeNode.set("params", randomAgeParams);

        agifyWidgetsNode.add(randomAgeNode);
        agifyNode.set("widgets", agifyWidgetsNode);


        serviceNode.add(weatherNode);
        serviceNode.add(newsNode);
        serviceNode.add(strasbourgNode);
        serviceNode.add(chuckNode);
        serviceNode.add(agifyNode);
        serverNode.set("services", serviceNode);

        rootNode.set("server", serverNode);
        return rootNode;
    }
}

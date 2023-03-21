package com.kirikou.dashboard.Controllers;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import com.kirikou.dashboard.Models.Widget.*;

@RestController()
@CrossOrigin(origins ="http://localhost:3000")
@RequestMapping("/widget")
public class WidgetController {


    @GetMapping(value = "/currentWeather")
    @ResponseBody
    public String getCurrentWeather(@RequestParam String city) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        try {
            return mapper.writeValueAsString(new CurrentWeatherWidget(city));
        } catch (JsonProcessingException e) {
            return e.getMessage();
        }
    }

    @CrossOrigin

    @GetMapping(value = "/newsFeed")
    @ResponseBody
    public  String getNews(@RequestParam String country, String category){
        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        try {
            return mapper.writeValueAsString(new NewsFeedWidget(country,category));
        } catch (JsonProcessingException e) {
            return e.getMessage();
        }
    }



    @GetMapping(value = "/waitingTime")
    @ResponseBody
    public String getWaitingTime(@RequestParam String name) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        try {
            return mapper.writeValueAsString(new WaitingTimeWidget(name));
        } catch (JsonProcessingException e) {
            return e.getMessage();
        }
    }

    @GetMapping(value = "/chuckNorris")
    @ResponseBody
    public String getChuckNorrisJoke(@RequestParam String category) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        try {
            return mapper.writeValueAsString(new ChuckNorris(category));
        } catch (JsonProcessingException e) {
            return e.getMessage();
        }
    }

    @GetMapping(value = "/random_age")
    @ResponseBody
    public String getRandomAge(@RequestParam String name) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        try {
            return mapper.writeValueAsString(new RandomAge(name));
        } catch (JsonProcessingException e) {
            return e.getMessage();
        }
    }

    @GetMapping(value = "/poolStatus")
    @ResponseBody
    public String getPoolStatus(@RequestParam String name) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        try {
            return mapper.writeValueAsString(new PoolWidget(name));
        } catch (JsonProcessingException e) {
            return e.getMessage();
        }
    }
}

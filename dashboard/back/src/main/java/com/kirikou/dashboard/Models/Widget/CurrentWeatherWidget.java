package com.kirikou.dashboard.Models.Widget;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClient.*;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.time.ZonedDateTime;
import java.util.*;

public class CurrentWeatherWidget extends Widget{

    public CurrentWeatherWidget(String city) throws JsonProcessingException {
        super();
        this.setName("Current Weather");
        this.setService("openweathermap");

        // Build Request
        StringBuilder url = new StringBuilder();
        url.append("https://api.openweathermap.org/data/2.5/weather?");
        url.append("q=");
        url.append(city);
        url.append("&appid=5be9bf87568bdf04d0c6869dfe73233b");

        // Send HTTP request
        JsonNode jsonNode = this.httpClient.get(url.toString());
        // Set Metrics
        List<Metric<?>> metrics = new ArrayList<>();
        metrics.add(new Metric<String>("City", "text", jsonNode.get("name").asText()));
        metrics.add(new Metric<String>("Weather", "text", jsonNode.get("weather").get(0).get("main").asText()));
        metrics.add(new Metric<Integer>("Temperature", "numeric", jsonNode.get("main").get("temp").asInt() - 273));
        metrics.add(new Metric<Integer>("Feels Like", "numeric", jsonNode.get("main").get("feels_like").asInt() - 273));
        metrics.add(new Metric<Integer>("Humidity", "numeric", jsonNode.get("main").get("humidity").asInt()));
        this.setMetrics(metrics);
    }
}

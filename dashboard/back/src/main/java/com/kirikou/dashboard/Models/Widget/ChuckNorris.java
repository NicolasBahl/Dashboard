package com.kirikou.dashboard.Models.Widget;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.ArrayList;
import java.util.List;

public class ChuckNorris extends  Widget {

    public ChuckNorris(String category) throws JsonProcessingException {
        super();
        this.setName("chuckNorris");
        this.setService("chuckNorris");

        // Build Request
        StringBuilder url = new StringBuilder();
        url.append("https://api.chucknorris.io/jokes/random?");
        url.append("category=");
        url.append(category);


        // Send HTTP request
        JsonNode jsonNode = this.httpClient.get(url.toString());
        // Set Metrics
        List<Metric<?>> metrics = new ArrayList<>();
        JsonNode categoryType = jsonNode.get("categories").get(0);
        metrics.add(new Metric<String>(categoryType.asText(), jsonNode.get("value").asText(), jsonNode.get("url").asText()));
        this.setMetrics(metrics);
    }

}
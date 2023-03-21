package com.kirikou.dashboard.Models.Widget;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.ArrayList;
import java.util.List;

public class RandomAge extends  Widget{

    public RandomAge(String name) throws JsonProcessingException {
        super();
        this.setName("randomAge");
        this.setService("randomAge");

        // Build Request
        StringBuilder url = new StringBuilder();
        url.append("https://api.agify.io/?");
        url.append("name=");
        url.append(name);


        // Send HTTP request
        JsonNode jsonNode = this.httpClient.get(url.toString());
        int age = jsonNode.get("age").asInt();
        // Set Metrics
        List<Metric<?>> metrics = new ArrayList<>();
        metrics.add(new Metric<Integer>(jsonNode.get("name").asText(), "int", age));
        this.setMetrics(metrics);
    }
}

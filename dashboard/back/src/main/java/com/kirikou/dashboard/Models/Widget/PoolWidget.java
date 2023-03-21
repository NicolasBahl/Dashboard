package com.kirikou.dashboard.Models.Widget;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.ArrayList;
import java.util.List;

public class PoolWidget extends Widget{
    public PoolWidget(String name) throws JsonProcessingException {
        super();
        this.setName("Public Pool Status");
        this.setService("strasbourg.eu");

        // Build Request
        StringBuilder url = new StringBuilder("http://data.strasbourg.eu/api/records/1.0/search/");
        url.append("?");
        url.append("dataset=frequentation-en-temps-reel-des-piscines&");
        url.append("q=");
        url.append(name);
        // Send HTTP request
        JsonNode jsonNode = this.httpClient.get(url.toString()).get("records").get(0).get("fields");
        System.out.println(jsonNode.toString());
        // Set Metrics
        List<Metric<?>> metrics = new ArrayList<>();
        metrics.add(new Metric<String>("Name", "text", jsonNode.get("name").asText()));
        metrics.add(new Metric<String>("Status", "text", jsonNode.get("isopen").asInt() == 1 ? "OPEN" : "CLOSED"));
        metrics.add(new Metric<Integer>("Occupation", "numeric", jsonNode.get("isopen").asInt() == 1 ? jsonNode.get("occupation").asInt() : -1));
        metrics.add(new Metric<String>("Color", "color", jsonNode.get("realtimestatus").asText()));
        this.setMetrics(metrics);
    }
}

package com.kirikou.dashboard.Models.Widget;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.ArrayList;
import java.util.List;

public class NewsFeedWidget extends  Widget {


    public NewsFeedWidget(String countryCode, String category) throws JsonProcessingException {
        super();
        this.setName("News Feed");
        this.setService("news");

        // Build Request
        StringBuilder url = new StringBuilder();
        url.append("https://newsapi.org/v2/top-headlines?");
        url.append("country=");
        url.append(countryCode);
        url.append("&apiKey=91546987498f4315a8e5f9e66215db43&");
        url.append("category=");
        url.append(category);

        // Send HTTP request
        JsonNode jsonNode = this.httpClient.get(url.toString());
        // Set Metrics
        List<Metric<?>> metrics = new ArrayList<>();
        JsonNode articles = jsonNode.get("articles");
        articles.forEach((value) ->metrics.add(new Metric<String>(value.get("title").asText(), value.get("url").asText(), value.get("author").asText())));
        String[] out = new String[articles.size()];
        setMetrics(metrics);

    }
}

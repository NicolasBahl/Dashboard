package com.kirikou.dashboard.Models.Widget;


import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.List;

public abstract class Widget implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;

    private String service;
    private List<Metric<?>> metrics;
    @JsonIgnore
    protected HttpClient httpClient;
    protected Widget() {
        this.httpClient = new HttpClient();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }



    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public List<Metric<?>> getMetrics() {
        return metrics;
    }

    public void setMetrics(List<Metric<?>> metrics) {
        this.metrics = metrics;
    }
}

package com.kirikou.dashboard.Models;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class WidgetPreset implements Serializable {

    private static final long serialVersionUID = 1L;


    private String name;

    private  int timer;
    private Map<String, ?> params;

    public WidgetPreset(String name,int timers, Map<String, ?> params) {
        this.name = name;
        this.params = params;
        this.timer = timers;
    }

    public int getTimers() {
        return timer;
    }

    public void setTimers(int timers) {
        this.timer = timers;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Map<String, ?> getParams() {
        return params;
    }

    public void setParams(Map<String, ?> params) {
        this.params = params;
    }
}

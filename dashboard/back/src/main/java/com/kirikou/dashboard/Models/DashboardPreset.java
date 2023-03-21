package com.kirikou.dashboard.Models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class DashboardPreset implements Serializable {
    private static final long serialVersionUID = 1L;
    /*
    private String name;
    private String desc;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

     */

    private List<WidgetPreset> widgets;

    public DashboardPreset() {
        this.widgets = new ArrayList<>();
    }

    public DashboardPreset(List<WidgetPreset> widgets) {
        this.widgets = widgets;
    }

    public List<WidgetPreset> getWidgets() {
        return widgets;
    }

    public void setWidgets(List<WidgetPreset> widgets) {
        this.widgets = widgets;
    }

}

package com.kirikou.dashboard.Models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class UpdateWidgetForm implements Serializable {
    private static final long serialVersionUID = 1L;
    private WidgetPreset oldWidget;
    private WidgetPreset newWidget;


    @JsonProperty("old")
    public WidgetPreset getOldWidget() {
        return oldWidget;
    }

    public void setOldWidget(WidgetPreset oldWidget) {
        this.oldWidget = oldWidget;
    }

    @JsonProperty("new")
    public WidgetPreset getNewWidget() {
        return newWidget;
    }

    public void setNewWidget(WidgetPreset newWidget) {
        this.newWidget = newWidget;
    }
}

package com.kirikou.dashboard.Models.Widget;

public class Metric<T> {
    private String name;
    private String type;
    private T value;

    public Metric(String name, String type, T value) {
        this.name = name;
        this.type = type;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }

    public void display() {
        System.out.println("name = " + this.name + ", type = " + this.type + ", value = " + this.value);
    }
}

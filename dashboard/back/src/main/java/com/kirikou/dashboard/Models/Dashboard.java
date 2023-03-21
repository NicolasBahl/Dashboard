package com.kirikou.dashboard.Models;
import javax.persistence.*;



@Entity
@Table(name = "Dashboards")
public class Dashboard {

    @GeneratedValue
    private int id  ;

    private String  creator ;



    public Dashboard(String creator) {
        this.creator = creator;
    }



    public Dashboard() {

    }

    @Column
    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }



    @Id
    @Column
    public int getId () {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}

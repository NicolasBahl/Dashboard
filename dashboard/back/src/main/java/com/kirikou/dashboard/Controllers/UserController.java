package com.kirikou.dashboard.Controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.api.client.json.Json;
import com.kirikou.dashboard.Models.DashboardPreset;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kirikou.dashboard.Models.UpdateWidgetForm;
import com.kirikou.dashboard.Models.User;

import com.kirikou.dashboard.Models.Widget.Widget;
import com.kirikou.dashboard.Models.WidgetPreset;
import io.jsonwebtoken.Jwts;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Arrays;
import java.util.List;

@RestController()
@RequestMapping()
public class UserController extends AuthentificationController {


    @Autowired
    private com.kirikou.dashboard.Models.UserRepository userRepository;


    @PostMapping(value = "user/add_widget/{id}")
    public ResponseEntity<?> addWidget(@PathVariable String id, @RequestBody WidgetPreset widget, @RequestHeader("Authorization") String tokenHeader) throws JsonProcessingException {
        String token = this.getResponse();
        widget.setTimers(120000);
        boolean same = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject().equals(this.getUserEmail());
        if (token == null || !same || !tokenHeader.equals(token)) {
            return new ResponseEntity<>("401 : You are not authorized", HttpStatus.UNAUTHORIZED);
        } else {
            ObjectMapper om = new ObjectMapper();
            User currentClient = (User) findBy(id, tokenHeader).getBody();
            JsonNode widgetList = om.readTree(currentClient.getWidgets());
            ((ArrayNode) widgetList.get("widgets")).add(om.valueToTree(widget));
            //String dashboardString = om.writeValueAsString(widget);
            currentClient.setWidgets(om.writeValueAsString(widgetList));
            return new ResponseEntity<>(userRepository.save(currentClient), HttpStatus.OK);
        }
    }

    @GetMapping(value = "user/dashboard")
    public String getWidgetsFromUSer() {
        return "hello";
    }

    @GetMapping(value = "user/{id}")
    public ResponseEntity<?> findBy(@PathVariable String id, @RequestHeader("Authorization") String tokenHeader) {

        String token = this.getResponse();
        boolean same = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject().equals(this.getUserEmail());
        if (token != null && same && this.getUserRole().equals("user") | this.getUserRole().equals("admin") && tokenHeader.equals(token)) {
            return new ResponseEntity<>(userRepository.findByEmail(id), HttpStatus.OK);
        }
        return new ResponseEntity<>("401 : You are not authorized", HttpStatus.UNAUTHORIZED);

    }


    @GetMapping(value = "/users")
    public ResponseEntity<?> getUsers(@RequestHeader("Authorization") String tokenHeader) {
        String token = this.getResponse();
        boolean same = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject().equals(this.getUserEmail());
        if (token != null && same && this.getUserRole().equals("admin") && tokenHeader.equals(token)) {
            return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
        }
        return new ResponseEntity<>("401 : You are not authorized", HttpStatus.UNAUTHORIZED);
    }


    @PostMapping(value = "/user")
    public ResponseEntity<?> create(@RequestBody User user, @RequestHeader("Authorization") String tokenHeader) {
        user.setRole("user");
        String token = this.getResponse();
        boolean same = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject().equals(this.getUserEmail());
        if (token != null && same && tokenHeader.equals(token)) {
            user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
            return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
        }
        return new ResponseEntity<>("401 : You are not authorized", HttpStatus.UNAUTHORIZED);
    }


    @PostMapping(value = "/register")
    public User register(@RequestBody User user) {
        user.setRole("user");
        user.setWidgets("{\"widgets\": []}");
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        return userRepository.save(user);
    }


    @DeleteMapping(value = "user/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable String id, @RequestHeader("Authorization") String tokenHeader) {
        String token = this.getResponse();
        boolean same = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject().equals(this.getUserEmail());
        if (token != null && same && tokenHeader.equals(token)) {
            User user = (User) userRepository.findByEmail(id);
            if (user != null) {
                userRepository.delete(user);
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("404 : User not found", HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>("401 : You are not authorized", HttpStatus.UNAUTHORIZED);
    }


    @DeleteMapping(value = "/users")
    public ResponseEntity<?> deleteAllUsers(@RequestHeader("Authorization") String tokenHeader) {

        String token = this.getResponse();
        boolean same = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject().equals(this.getUserEmail());
        if (token != null && same && this.getUserRole().equals("admin") && tokenHeader.equals(token)) {
            User user = userRepository.findByEmail(this.getUserEmail());
            userRepository.deleteAll();
            create(user, tokenHeader);
            return new ResponseEntity<>(user, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>("404 : Error", HttpStatus.BAD_REQUEST);

    }








    @PutMapping(value = "user/{id}")
    public ResponseEntity<?>  updateUser(@PathVariable String  id, @RequestBody User user, @RequestHeader("Authorization") String tokenHeader) {

        String token = this.getResponse();
        boolean same = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject().equals(this.getUserEmail());
        if(token == null || !same || !tokenHeader.equals(token)){
            return new ResponseEntity<>("401 : You are not authorized", HttpStatus.UNAUTHORIZED);
        }
        else{
            User currentClient = (User) findBy(id,tokenHeader).getBody();
            currentClient.setEmail(id);
            currentClient.setFirstname(user.getFirstname());
            currentClient.setRole("user");
            currentClient.setLastname(user.getLastname());
            currentClient.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
            return new ResponseEntity<>(userRepository.save(currentClient), HttpStatus.OK);

        }
    }




    @GetMapping(value = "user/{id}/getWidgets")
    public ResponseEntity<?> getWidgets(@PathVariable String id, @RequestHeader("Authorization") String tokenHeader) throws JsonProcessingException {

        String token = this.getResponse();
        boolean same = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject().equals(this.getUserEmail());
        if(token != null && same && this.getUserRole().equals("admin") && tokenHeader.equals(token)){
            ObjectMapper om = new ObjectMapper();
            String json = userRepository.findByEmail(id).getWidgets();
            //System.out.println(id + ": " + json);
            return new ResponseEntity<>(om.readTree(json), HttpStatus.OK);
        }
        return new ResponseEntity<>("401 : You are not authorized", HttpStatus.UNAUTHORIZED);
    }




    @PutMapping(value = "user/{id}/updateWidgets")
    public ResponseEntity<?>  updateDashboard(@PathVariable String  id, @RequestBody DashboardPreset dashboard, @RequestHeader("Authorization") String tokenHeader) throws JsonProcessingException {
        String token = this.getResponse();
        boolean same = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject().equals(this.getUserEmail());
        if(token == null || !same || !tokenHeader.equals(token)){
            return new ResponseEntity<>("401 : You are not authorized", HttpStatus.UNAUTHORIZED);
        }
        else{
            ObjectMapper om = new ObjectMapper();
            User currentClient = (User) findBy(id,tokenHeader).getBody();
            String dashboardString = om.writeValueAsString(dashboard);
            currentClient.setWidgets(dashboardString);
            return new ResponseEntity<>(userRepository.save(currentClient), HttpStatus.OK);
        }
    }





    @GetMapping(value = "user/{id}/{widgetName}")
    public ResponseEntity<?> getSpecificWidget(@PathVariable String id, @PathVariable String widgetName, @RequestHeader("Authorization") String tokenHeader) throws JsonProcessingException {

        String token = this.getResponse();
        boolean same = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject().equals(this.getUserEmail());
        if(token != null && same && this.getUserRole().equals("admin") || this.getUserRole().equals("user") && tokenHeader.equals(token)){
            ObjectMapper om = new ObjectMapper();
            String json = userRepository.findByEmail(id).getWidgets();
            JsonNode dashboard = om.readTree(json);
            ArrayList<JsonNode> res = new ArrayList<>();
            Iterator<JsonNode> it = dashboard.get("widgets").elements();
            while (it.hasNext()) {
                JsonNode temp = it.next();
                if (temp.get("name").asText().equals(widgetName)) {
                    res.add(temp);
                }
            }
            //System.out.println(id + ": " + json);
            if (res.isEmpty())
                return new ResponseEntity<>("Widget not found", HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }
        return new ResponseEntity<>("401 : You are not authorized", HttpStatus.UNAUTHORIZED);
    }



    @DeleteMapping(value = "user/{id}/deleteWidget")
    public ResponseEntity<?> deleteWidget(@PathVariable String id, @RequestBody WidgetPreset widget, @RequestHeader("Authorization") String tokenHeader) throws JsonProcessingException {
        String token = this.getResponse();
        boolean same = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject().equals(this.getUserEmail());
        if(token != null && same && tokenHeader.equals(token)){
            User user = (User) userRepository.findByEmail(id);
            ObjectMapper om = new ObjectMapper();
            JsonNode widgetList = om.readTree(user.getWidgets());
            for (int i = 0; i < (widgetList.get("widgets").size()); i++) {
                if (widgetList.get("widgets").get(i).toString().equals(om.writeValueAsString(widget))) {
                    ((ArrayNode) widgetList.get("widgets")).remove(i);
                }
            }
            user.setWidgets(om.writeValueAsString(widgetList));
            return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);

        }
        return new ResponseEntity<>("401 : You are not authorized", HttpStatus.UNAUTHORIZED);
    }

    @PutMapping(value = "user/{id}/updateWidget")
    public ResponseEntity<?>  updateWidget(@PathVariable String  id, @RequestBody UpdateWidgetForm form, @RequestHeader("Authorization") String tokenHeader) throws JsonProcessingException {
        String token = this.getResponse();
        boolean same = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject().equals(this.getUserEmail());
        if(token == null || !same || !tokenHeader.equals(token)){
            return new ResponseEntity<>("401 : You are not authorized", HttpStatus.UNAUTHORIZED);
        }
        else{
            ObjectMapper om = new ObjectMapper();
            User currentClient = (User) findBy(id,tokenHeader).getBody();
            JsonNode widgetList = om.readTree(currentClient.getWidgets());
            System.out.println("old: " + om.writeValueAsString(form.getOldWidget()));
            System.out.println("new: " + om.writeValueAsString(form.getNewWidget()));
            for (int i = 0; i < (widgetList.get("widgets").size()); i++) {
                if (widgetList.get("widgets").get(i).toString().equals(om.writeValueAsString(form.getOldWidget()))) {
                    ((ArrayNode) widgetList.get("widgets")).remove(i);
                    ((ArrayNode) widgetList.get("widgets")).insert(i, om.valueToTree(form.getNewWidget()));
                }
            }
            String dashboardString = om.writeValueAsString(widgetList);
            currentClient.setWidgets(dashboardString);
            return new ResponseEntity<>(userRepository.save(currentClient), HttpStatus.OK);
        }
    }

    @PostMapping(value = "user/google_account")
    public  ResponseEntity<?> createGoogleUser( @RequestBody User user, @RequestHeader("Authorization") String token) {
        User findUser = userRepository.findByEmail(user.getEmail());
        if (findUser == null ) {
            user.setPassword(token);
            user.setWidgets("{\"widgets\": []}");
            User newUser = this.register(user);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } if (!findUser.equals(null) && findUser.getEmail().contains("@gmail")) {
            return new ResponseEntity<>(findUser,HttpStatus.OK);
        } else {
            return new ResponseEntity<>("ERROR", HttpStatus.BAD_REQUEST);
        }
    }
}


package com.kirikou.dashboard.Controllers;


import com.kirikou.dashboard.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/authentification")
@CrossOrigin()
public class AuthentificationController {

    public  Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);


    public String response;
    public String userEmail;

    public  String userRole;



    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    @Autowired
    private com.kirikou.dashboard.Models.UserRepository userRepository;

    @RequestMapping(value="/authentification",  method=RequestMethod.POST)
    public @ResponseBody ResponseEntity<List<String>>  Login(@RequestBody User user){

        User existingUser = userRepository.findByEmail(user.getEmail());
        String role = existingUser.getRole();

        if (existingUser != null && BCrypt.checkpw(user.getPassword(), existingUser.getPassword())) {

            String token = Jwts.builder().setId(UUID.randomUUID().toString()).setSubject(user.getEmail()).signWith(key).compact();
            setResponse(token);
            setUserEmail(user.getEmail());

            setUserRole(role);
            return new ResponseEntity<>(Arrays.asList(String.format(token),String.format(user.getEmail())), HttpStatus.OK);
        }
        return new ResponseEntity<>(Arrays.asList(String.format("Email Wrong"),String.format("Password Wrong")), HttpStatus.BAD_REQUEST);
    }
}
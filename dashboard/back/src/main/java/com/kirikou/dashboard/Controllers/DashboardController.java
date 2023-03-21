package com.kirikou.dashboard.Controllers;
import com.kirikou.dashboard.Models.Dashboard;
import com.kirikou.dashboard.Models.User;
import com.kirikou.dashboard.Models.UserRepository;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboards")
public class DashboardController extends AuthentificationController  {

    @Autowired
    private com.kirikou.dashboard.Models.DashboardRepository dashboardRepository;
    private com.kirikou.dashboard.Models.UserRepository userRepository;


    @GetMapping(value = "/dashboards")
    public ResponseEntity<?> getAll() {
            return new ResponseEntity<>(dashboardRepository.findAll(), HttpStatus.OK);

    }


    @GetMapping(value = "/dashboard")
    public ResponseEntity<?> getOne(int id) {
        return new ResponseEntity<>(dashboardRepository.findById(id), HttpStatus.OK);
    }


    @DeleteMapping(value = "dashboard/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable int id) {
                dashboardRepository.deleteById(id);
                return new ResponseEntity<>("Deleted with success", HttpStatus.OK);

    }



    @PostMapping(value = "/dashboard")
    public Dashboard create(@RequestBody Dashboard entity) {
        return dashboardRepository.save((entity));

    }
}

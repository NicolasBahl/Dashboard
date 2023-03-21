package com.kirikou.dashboard.Models;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<com.kirikou.dashboard.Models.User, Integer>{
    User findByEmail(String email);

}

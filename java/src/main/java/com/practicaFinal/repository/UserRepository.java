package com.practicaFinal.repository;

import com.practicaFinal.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,Integer> {
    User findByEmailAndName(String email, String name);
}

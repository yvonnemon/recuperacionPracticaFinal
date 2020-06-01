package com.practicaFinal.manager;

import com.practicaFinal.model.User;
import com.practicaFinal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserManager {
    @Autowired
    UserRepository userRepository;

    public User findById(Integer id){
        return userRepository.findById(id).orElse(null);
    }
}

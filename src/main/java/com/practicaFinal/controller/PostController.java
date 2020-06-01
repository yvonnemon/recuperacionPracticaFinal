package com.practicaFinal.controller;


import com.practicaFinal.manager.PostManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostController {
    @Autowired
    private PostManager postManager;

    @GetMapping("/hola") //este es el primer test
    public String holi(){
        return "holita"; //en el cliente es await .text(), si es un objeto es .json()
    }



}

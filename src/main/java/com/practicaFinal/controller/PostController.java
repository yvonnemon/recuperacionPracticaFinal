package com.practicaFinal.controller;


import com.fasterxml.jackson.databind.node.TextNode;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.practicaFinal.manager.PostManager;
import com.practicaFinal.manager.UserManager;
import com.practicaFinal.model.Post;
import com.practicaFinal.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
public class PostController {
    @Autowired
    private PostManager postManager;

    @Autowired
    private Gson gson;

    @Autowired
    private UserManager userManager;

    @GetMapping("/hola") //este es el primer test
    public String holi(){
        return "holita"; //en el cliente es await .text(), si es un objeto es .json()
    }


    @GetMapping("/posts")
    public List<Post> listaPosts(){
        List<Post> posts = postManager.findAll();
        return posts;
    }

    @PostMapping("/insert")
    public String insertPost(@RequestBody Post body) throws ParseException {
//        JsonObject jsonObject = gson.fromJson(body, JsonObject.class);
//        System.out.println(jsonObject);
        System.out.println(body.getDatePost());
        Post post = body;



       // String x = jsonObject.get("holi").toString();
       // System.out.println(x+'8');

//        Post post = new Post();
//        post.setContent(jsonObject.get("content").toString().replaceAll("\"",""));
//        post.setTranslatedContent(jsonObject.get("translatedContent").toString().replaceAll("\"",""));
//
//        post.setLanguage(jsonObject.get("language").toString().replaceAll("\"",""));
//        post.setOriginalLanguage(jsonObject.get("originalLanguage").toString().replaceAll("\"",""));
//
//        post.setTitle(jsonObject.get("title").toString().replaceAll("\"",""));
//        post.setTranslatedTitle(jsonObject.get("translatedTitle").toString().replaceAll("\"",""));
//
//        String fechaString = jsonObject.get("date").toString();
//        fechaString = fechaString.replaceAll("\"","");
//        SimpleDateFormat fechita = new SimpleDateFormat("yyyy-MM-dd");
//        Date f = fechita.parse(fechaString);
//        System.out.println(f);
//
//        post.setDatePost(f);
        post.setUser(userManager.findById(1));
//
        postManager.addOrUpdatePost(post);
//        System.out.println("added");
        return "added";
    }

    @DeleteMapping("/delete")
    public String deletePost(){
        Post post = postManager.getPostById(4);

        postManager.delete(post);
        System.out.println("deleted");
        return "deleted";

    }

    @PutMapping("/update")
    public String updatePost(){
        Post post = new Post();
        post.setId(1);
        post.setContent("holo");
        post.setTranslatedContent("holiowiws");

        post.setLanguage("norcoreanoxd");
        post.setOriginalLanguage("surcoreanoxd");

        post.setTitle("titulinsito");
        post.setTranslatedTitle("titulinsote");

        post.setDatePost(LocalDate.now());
        post.setUser(userManager.findById(1));

        postManager.addOrUpdatePost(post);
        System.out.println("updated");
        return "updated";

    }
}

package com.practicaFinal.controller;


import com.practicaFinal.manager.PostManager;
import com.practicaFinal.manager.UserManager;
import com.practicaFinal.model.Post;
import com.practicaFinal.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class PostController {
    @Autowired
    private PostManager postManager;

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
    public String insertPost(){
        Post post = new Post();
        post.setContent("hola");
        post.setTranslatedContent("holiwiws");

        post.setLanguage("norcoreano");
        post.setOriginalLanguage("surcoreano");

        post.setTitle("titulinsito");
        post.setTranslatedTitle("titulinsote");

        post.setDatePost(new Date());
        post.setUser(userManager.findById(1));

        postManager.addOrUpdatePost(post);
        System.out.println("added");
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

        post.setDatePost(new Date());
        post.setUser(userManager.findById(1));

        postManager.addOrUpdatePost(post);
        System.out.println("updated");
        return "updated";

    }
}

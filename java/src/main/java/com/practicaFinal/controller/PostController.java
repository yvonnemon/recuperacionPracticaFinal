package com.practicaFinal.controller;


import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.practicaFinal.manager.PostManager;
import com.practicaFinal.manager.UserManager;
import com.practicaFinal.model.Post;
import com.practicaFinal.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
public class PostController {
    @Autowired
    private PostManager postManager;

    @Autowired
    private Gson gson;

    @Autowired
    private UserManager userManager;

    @GetMapping("/posts")
    public List<Post> listaPosts(){
        List<Post> posts = postManager.findAll();
        Collections.reverse(posts);
        return posts;
    }

    @PostMapping("/insert")
    public String insertPost(@RequestBody Post body) {
        System.out.println("entro al insert");
        if (body.getUser().getId() == null){
            User user = new User();
            user.setEmail(body.getUser().getEmail());
            user.setName("");
            user.setLastname("");
            user.setPassword(body.getUser().getEmail());
            userManager.save(user);

            body.setUser(userManager.findByEmail(body.getUser().getEmail()));

        } else {
            body.setUser(userManager.findById(body.getUser().getId()));
        }



        postManager.save(body);
        return "added";
    }

    @DeleteMapping("/delete")
    public String deletePost(@RequestBody String id){
        JsonObject jsonObject = gson.fromJson(id, JsonObject.class);

        String x = jsonObject.get("id").toString();
        Post post = postManager.getPostById(Integer.parseInt(x));

        postManager.delete(post);

        System.out.println("deleted");
        return "deleted";

    }

    @PutMapping("/update")
    public String updatePost(@RequestBody Post body){

        if (body.getUser().getId() == null){
            User user = new User();
            user.setEmail(body.getUser().getEmail());
            user.setName("");
            user.setLastname("");
            user.setPassword(body.getUser().getEmail());
            userManager.save(user);

            body.setUser(userManager.findByEmail(body.getUser().getEmail()));

        } else {
            body.setUser(userManager.findById(body.getUser().getId()));
        }

        postManager.uppdatePost(body);
        System.out.println("updated");
        return "updated";

    }
}

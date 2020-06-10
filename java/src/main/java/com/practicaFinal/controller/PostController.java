package com.practicaFinal.controller;


import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.practicaFinal.manager.PostManager;
import com.practicaFinal.manager.UserManager;
import com.practicaFinal.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
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
    public String insertPost(@RequestBody Post body) throws ParseException {
//        JsonObject jsonObject = gson.fromJson(body, JsonObject.class);
//        System.out.println(jsonObject);
        System.out.println("entro al insert");
        System.out.println(body.getDatePost());

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
        body.setUser(userManager.findById(1));
//
        postManager.save(body);
//        System.out.println("added");
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
//        Post post = body;
//        post.setId(1);
//        post.setContent("holo");
//        post.setTranslatedContent("holiowiws");
//
//        post.setLanguage("norcoreanoxd");
//        post.setOriginalLanguage("surcoreanoxd");
//
//        post.setTitle("titulinsito");
//        post.setTranslatedTitle("titulinsote");
//
//        post.setDatePost(LocalDate.now());
        body.setUser(userManager.findById(1));

        postManager.uppdatePost(body);
        System.out.println("updated");
        return "updated";

    }
}

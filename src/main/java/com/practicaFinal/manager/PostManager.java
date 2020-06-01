package com.practicaFinal.manager;

import com.practicaFinal.model.Post;
import com.practicaFinal.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostManager {
    @Autowired
    PostRepository postRepository;

    public List<Post> findAll(){
        return (List<Post>) postRepository.findAll();
    }

    public void addOrUpdatePost(Post post){
        postRepository.save(post);
    }

    public void delete(Post post){
        postRepository.delete(post);
    }

}

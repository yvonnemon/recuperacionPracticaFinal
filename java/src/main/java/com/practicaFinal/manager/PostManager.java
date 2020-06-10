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


    public void delete(Post post){
        postRepository.delete(post);
    }
    public Post getPostById(Integer id){
        return postRepository.findById(id).orElse(null);
    }
    public void uppdatePost(Post post){
        Post updatepost = postRepository.findById(post.getId()).orElse(null);
        if(updatepost != null){
            updatepost.setId(post.getId());
            updatepost.setTranslatedContent(post.getTranslatedContent());
            updatepost.setContent(post.getContent());

            updatepost.setOriginalLanguage(post.getOriginalLanguage());
            updatepost.setLanguage(post.getLanguage());

            updatepost.setTitle(post.getTitle());
            updatepost.setTranslatedTitle(post.getTranslatedTitle());

            updatepost.setDatePost(post.getDatePost());
            updatepost.setUser(post.getUser());
        }

         postRepository.save(updatepost);

    }
    public void save(Post post){
        postRepository.save(post);

    }

}

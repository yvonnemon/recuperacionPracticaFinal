package com.practicaFinal.repository;

import com.practicaFinal.model.Post;
import com.practicaFinal.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PostRepository extends CrudRepository<Post,Integer> {
    List<Post> findAllByUser(User user);
}

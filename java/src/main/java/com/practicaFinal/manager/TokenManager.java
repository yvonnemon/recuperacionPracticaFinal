package com.practicaFinal.manager;

import com.google.gson.Gson;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TokenManager {
    @Value("Secretin secretado, este Secreto esta Encriptado")
    private String SECRETO;

    public boolean validateToken(String token){
        System.out.println("token recibido:"+token);
        Claims claims = Jwts.parser().setSigningKey(SECRETO.getBytes())
                .parseClaimsJws(token) //esto es el payload
                .getBody();

        //return new Gson().toJson(claims);
        return claims != null;
    }

}

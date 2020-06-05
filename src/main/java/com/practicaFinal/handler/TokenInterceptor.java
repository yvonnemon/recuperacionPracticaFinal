package com.practicaFinal.handler;

import com.practicaFinal.manager.TokenManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class TokenInterceptor implements HandlerInterceptor {
    @Autowired
    private TokenManager tokenManager;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("estas en el handler");
        String auth = request.getHeader("Authorization");
        if(auth == null){
            return true;
        }
        System.out.println(auth);
        String token = auth.split(" ")[1];

        //String valido = tokenManager.validateToken(token);

       // System.out.println("----"+valido);
        if(tokenManager.validateToken(token)){
            return true;
        }
        return true;
    }
}

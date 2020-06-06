package com.practicaFinal.handler;

import com.practicaFinal.manager.TokenManager;
import com.practicaFinal.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class TokenInterceptor implements HandlerInterceptor {
    // Descomentar si el profe arregla lo del @autowired dentro de un @component
   //@Autowired
   // private TokenManager tokenManager;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        System.out.println("estas en el handler");
        String auth = request.getHeader("Authorization");
        System.out.println(auth);
        if(auth == null){
            return true;
        }
        System.out.println(auth);
        String token = auth.split(" ")[1];

        //String valido = tokenManager.validateToken(token);

       // System.out.println("----"+valido);
        // Esto es un arreglo hasta que el profe te diga como hacerlo.
        TokenManager tokenManager = Utils.getBean(TokenManager.class);

        if(tokenManager.validateToken(token)){
            return true;
        }
        return true;
    }
}

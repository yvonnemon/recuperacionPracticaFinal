package com.practicaFinal.handler;

import com.practicaFinal.manager.TokenManager;
import com.practicaFinal.utils.Utils;
import io.jsonwebtoken.JwtException;
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


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        System.out.println("estas en el handler");
        String auth = request.getHeader("Authorization");
        if(auth == null){
            return true;
        }

        System.out.println(auth);
        System.out.println(auth);
        String token = auth.split(" ")[1];


        TokenManager tokenManager = Utils.getBean(TokenManager.class);

        return tokenManager.validateToken(token);
    }
}

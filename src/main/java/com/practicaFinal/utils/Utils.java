package com.practicaFinal.utils;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.stereotype.Component;

@Component
public class Utils implements BeanFactoryPostProcessor {
    private static ConfigurableListableBeanFactory beanFactory;
// Eliminar si el profe arregla lo del @autowired dentro del @component
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory arg0) throws BeansException {
        // TODO Auto-generated method stub
        beanFactory = arg0;
    }

    public static <T> T getBean(Class<T> clz) throws BeansException {
        T result = (T) beanFactory.getBean(clz);
        return result;
    }
}

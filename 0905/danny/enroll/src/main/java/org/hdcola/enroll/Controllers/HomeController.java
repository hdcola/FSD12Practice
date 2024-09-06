package org.hdcola.enroll.Controllers;

import io.github.wimdeblauwe.htmx.spring.boot.mvc.HtmxResponse;
import io.github.wimdeblauwe.htmx.spring.boot.mvc.HxRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

    @GetMapping("/")
    public ModelAndView home() {
        ModelAndView modelAndView =  new ModelAndView("home");
        modelAndView.addObject("message", "Learn how to develop up-to-date websites and apps and get them out there for everyone to use.");
        return modelAndView;
    }

    @HxRequest
    @GetMapping("/test")
    public HtmxResponse test(Model model) {
        model.addAttribute("message", "Hello, World!");
        return HtmxResponse.builder()
                .view("home :: test")
                .build();
    }

}

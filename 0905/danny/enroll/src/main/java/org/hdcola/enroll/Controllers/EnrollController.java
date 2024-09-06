package org.hdcola.enroll.Controllers;

import org.hdcola.enroll.Repositories.EnrollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/enroll")
public class EnrollController {
    private final EnrollRepository enrollRepository;

    @Autowired
    public EnrollController(EnrollRepository enrollRepository) {
        this.enrollRepository = enrollRepository;
    }

    @RequestMapping("/list")
    public ModelAndView list() {
        ModelAndView modelAndView = new ModelAndView("enroll/list");
        modelAndView.addObject("enrolls", enrollRepository.findAll());
        return modelAndView;
    }
}


package org.hdcola.enroll.Controllers;

import jakarta.websocket.server.PathParam;
import org.hdcola.enroll.Entities.Enroll;
import org.hdcola.enroll.Repositories.EnrollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/enroll")
public class EnrollController {
    private final EnrollRepository enrollRepository;

    @Autowired
    public EnrollController(EnrollRepository enrollRepository) {
        this.enrollRepository = enrollRepository;
    }

    @GetMapping("/new")
    public ModelAndView newEnroll(@RequestParam String course) {
        ModelAndView modelAndView = new ModelAndView("enroll/new");
        Enroll enroll = new Enroll();
        enroll.setCourse(course);
        modelAndView.addObject("enroll", enroll);
        return modelAndView;
    }

    @PostMapping("/new")
    public String create(@ModelAttribute Enroll enroll) {
        enrollRepository.save(enroll);
        return "redirect:/enroll/list";
    }

    @GetMapping("/list")
    public ModelAndView list() {
        ModelAndView modelAndView = new ModelAndView("enroll/list");
        modelAndView.addObject("enrolls", enrollRepository.findAll());
        return modelAndView;
    }

    @GetMapping("/edit")
    public ModelAndView edit(@RequestParam Long id) {
        ModelAndView modelAndView = new ModelAndView("enroll/new");
        modelAndView.addObject("enroll", enrollRepository.findById(id).get());
        return modelAndView;
    }

    @GetMapping("/delete")
    public String delete(@RequestParam Long id) {
        enrollRepository.deleteById(id);
        return "redirect:/enroll/list";
    }
}

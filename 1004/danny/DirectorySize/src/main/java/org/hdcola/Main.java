package org.hdcola;

import javax.swing.*;
import java.awt.*;

public class Main {
    public static void main(String[] args) {
        // Show SelectDirectory form
        JFrame frame = new JFrame("Select Directory");
        frame.setContentPane(new SelectDirectory().panelMain);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setMinimumSize(new Dimension(400, 300));
        frame.pack();
        frame.setVisible(true);
    }
}
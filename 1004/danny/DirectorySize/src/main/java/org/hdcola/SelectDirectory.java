package org.hdcola;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SelectDirectory {
    public JPanel panelMain;
    private JButton selectDirectoryButton;
    private JLabel labelSelect;
    private JLabel labelFileCount;
    private JLabel labelSize;
    private String selectedDirectory;


    public SelectDirectory() {
        selectDirectoryButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                JFileChooser fileChooser = new JFileChooser();
                fileChooser.setCurrentDirectory(new java.io.File("."));

                fileChooser.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
                fileChooser.showOpenDialog(null);
                selectedDirectory = fileChooser.getSelectedFile().getAbsolutePath();
                labelSelect.setText("Selected: " + selectedDirectory);
                DirectorySize directorySize = new DirectorySize(selectedDirectory);
                directorySize.calculate(labelSize, labelFileCount);
            }
        });
    }
}

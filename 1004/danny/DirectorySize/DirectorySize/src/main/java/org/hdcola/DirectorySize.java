package org.hdcola;

import javax.swing.*;
import java.io.File;
import java.util.List;

public class DirectorySize {
    private String directory;
    private long size;
    private long fileCount;

    public DirectorySize(String directory) {
        this.directory = directory;
    }

    public long getSize() {
        return size;
    }

    public long getFileCount() {
        return fileCount;
    }

    public void calculate(JLabel sizeLabel, JLabel fileCountLabel) {
        SwingWorker<Void, Void> worker = new SwingWorker<Void, Void>() {
            @Override
            protected Void doInBackground() throws Exception {
                calculateSize(directory);
                return null;
            }

            private void calculateSize(String directory) {
                java.io.File dir = new java.io.File(directory);
                java.io.File[] files = dir.listFiles();
                if (files != null) {
                    for (File file : files) {
                        if (file.isFile()) {
                            size += file.length();
                            fileCount++;
                        } else if (file.isDirectory()) {
                            calculateSize(file.getAbsolutePath());
                        }
                        publish();
                    }
                }
            }

            @Override
            protected void process(List<Void> chunks) {
                sizeLabel.setText("Size: " + size/1024 + " KB");
                fileCountLabel.setText("File count: " + fileCount);
            }

            @Override
            protected void done() {
                sizeLabel.setText("Size: " + size/1024 + " KB");
                fileCountLabel.setText("File count: " + fileCount);
            }
        };

        worker.execute();
    }
}

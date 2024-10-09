package org.hdcola;

import java.awt.*;
import javax.swing.*;

public class SierpinskiTriangle extends JPanel {

    private int depth = 0;

    public void setDepth(int newDepth) {
        depth = newDepth;
        repaint();  // when depth changes, repaint
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        // draw Sierpinski Triangle
        int[] xPoints = {getWidth() / 2, 50, getWidth() - 50};
        int[] yPoints = {50, getHeight() - 50, getHeight() - 50};
        drawTriangle(g, depth, xPoints, yPoints);
    }

    // recursive method to draw Sierpinski Triangle
    private void drawTriangle(Graphics g, int depth, int[] xPoints, int[] yPoints) {
        if (depth == 0) {
            // base case: draw a triangle
            g.drawPolygon(xPoints, yPoints, 3);
        } else {
            // calculate midpoints of the triangle
            int[] midX = {
                    (xPoints[0] + xPoints[1]) / 2,
                    (xPoints[1] + xPoints[2]) / 2,
                    (xPoints[2] + xPoints[0]) / 2
            };
            int[] midY = {
                    (yPoints[0] + yPoints[1]) / 2,
                    (yPoints[1] + yPoints[2]) / 2,
                    (yPoints[2] + yPoints[0]) / 2
            };

            // recursively draw 3 triangles
            drawTriangle(g, depth - 1, new int[]{xPoints[0], midX[0], midX[2]}, new int[]{yPoints[0], midY[0], midY[2]});
            drawTriangle(g, depth - 1, new int[]{midX[0], xPoints[1], midX[1]}, new int[]{midY[0], yPoints[1], midY[1]});
            drawTriangle(g, depth - 1, new int[]{midX[2], midX[1], xPoints[2]}, new int[]{midY[2], midY[1], yPoints[2]});
        }
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Sierpinski Triangle");
        SierpinskiTriangle panel = new SierpinskiTriangle();
        frame.add(panel);
        frame.setSize(800, 800);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);

        // 逐步增加递归深度
        for (int i = 0; i <= 6; i++) {
            panel.setDepth(i);
            try {
                Thread.sleep(1000);  // increase depth every second
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

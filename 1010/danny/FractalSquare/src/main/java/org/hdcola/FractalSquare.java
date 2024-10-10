package org.hdcola;

import javax.swing.*;
import java.awt.*;

public class FractalSquare extends JPanel {


    public void drawFractalSquare(Graphics g, int x, int y, int size, int depth) {
        // if the square is too small, don't draw it
        if (size < 8) {
            return;
        }

        // set the color of the square based on the depth
        g.setColor(getColorByDepth(depth));
        // draw the current square
        g.drawRect(x, y, size, size);

        // calculate the size of the smaller squares
        int newSize = size / 3;

        // on each side of the square, draw a smaller square
        // up
        drawFractalSquare(g, x + newSize, y - newSize, newSize, depth + 1);
        // right
        drawFractalSquare(g, x + size, y + newSize, newSize, depth + 1);
        // down
        drawFractalSquare(g, x + newSize, y + size, newSize, depth + 1);
        // left
        drawFractalSquare(g, x - newSize, y + newSize, newSize, depth + 1);
    }

    private Color getColorByDepth(int depth) {
        Color[] colors = {Color.RED, Color.GREEN, Color.BLUE, Color.YELLOW, Color.CYAN, Color.MAGENTA};
        return colors[depth % colors.length];
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        // determine the initial size of the fractal square
        int initialSize = Math.min(getWidth(), getHeight()) / 2 ;
        int startX = (getWidth() - initialSize) / 2;
        int startY = (getHeight() - initialSize) / 2;

        // call the recursive method to draw the fractal square
        drawFractalSquare(g, startX, startY, initialSize, 0);
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame();
        FractalSquare panel = new FractalSquare();
        frame.add(panel);
        frame.setSize(800, 800);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}

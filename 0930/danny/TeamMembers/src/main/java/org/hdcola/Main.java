package org.hdcola;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String fileName = "teams.txt";

        HashMap<String, ArrayList<String>> playersByTeams = new HashMap<>();

        try(Scanner scanner = new Scanner(new File(fileName))) {
            while(scanner.hasNextLine()) {
                String line = scanner.nextLine();
                String[] parts = line.split(":");
                String team = parts[0];
                String[] players = parts[1].split(",");
                playersByTeams.put(team, new ArrayList<>(Arrays.asList(players)));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        for(String team : playersByTeams.keySet()) {
            System.out.println(team + ": " + String.join(", ", playersByTeams.get(team)));
        }

    }
}
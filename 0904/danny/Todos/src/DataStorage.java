import java.util.ArrayList;

public interface DataStorage {
    public ArrayList<Todo> loadData();
    public void saveData(ArrayList<Todo> todoList);
}

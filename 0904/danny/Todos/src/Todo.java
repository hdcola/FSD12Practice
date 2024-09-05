import java.util.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Todo {
    String task;
    LocalDate dueDate;
    int hoursOfWork;
    // Part3: TaskStatus status;
    // Part3: enum TaskStatus { Pending, Done };


    public Todo(String task, LocalDate dueDate, int hoursOfWork) throws IllegalArgumentException {
        this.setTask(task);
        this.setDueDate(dueDate);
        this.setHoursOfWork(hoursOfWork);
    }

    public void setTask(String task) throws IllegalArgumentException {
        // 2-50 characters long, must NOT contain a semicolon or | or ` (reverse single quote) characters
        if (task.length() < 2 || task.length() > 50) {
            throw new IllegalArgumentException("Task must be between 2 and 50 characters long");
        }
        if (task.contains(";") || task.contains("|") || task.contains("`")) {
            throw new IllegalArgumentException("Task must NOT contain a semicolon or | or ` (reverse single quote) characters");
        }
        this.task = task;
    }

    public void setDueDate(LocalDate dueDate) throws IllegalArgumentException {
        // Date between year 1900 and 2100
        if (dueDate.getYear() < 1900 || dueDate.getYear() > 2100) {
            throw new IllegalArgumentException("Date must be between year 1900 and 2100");
        }
        this.dueDate = dueDate;
    }

    public void setHoursOfWork(int hoursOfWork) throws IllegalArgumentException {
        // 0 or greater number
        if (hoursOfWork < 0) {
            throw new IllegalArgumentException("Hours of work must be 0 or greater");
        }
        this.hoursOfWork = hoursOfWork;
    }

    public String getTask() {
        return task;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public String getDueDateFormatted() {
        return dueDate.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }

    public int getHoursOfWork() {
        return hoursOfWork;
    }

    // format all fields of this Todo item for display exactly as specified below in the example interactions
    @Override
    public String toString() {
        return task + " , " + getDueDateFormatted() + " , will take " + hoursOfWork + " hour(s) of work";
    }
}

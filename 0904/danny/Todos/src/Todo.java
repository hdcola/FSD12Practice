import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Todo {
    public enum TaskStatus { Pending, Done };

    String task;
    LocalDate dueDate;
    int hoursOfWork;
    TaskStatus status;

    public Todo(String dataLine){
        String[] data = dataLine.split(";");
        setTask(data[0]);
        setDueDate(data[1]);
        setHoursOfWork(Integer.parseInt(data[2]));
        setStatus(data[3]);
    }

    public String toDataString(){
        return task + ";" + getDueDateFormatted() + ";" + hoursOfWork + ";" + status;
    }

    public Todo(String task, LocalDate dueDate, int hoursOfWork, TaskStatus status) throws IllegalArgumentException {
        this.setTask(task);
        this.setDueDate(dueDate);
        this.setHoursOfWork(hoursOfWork);
        this.setStatus(status);
    }

    public Todo(String task, String dueDate, int hoursOfWork, String status) throws IllegalArgumentException {
        this.setTask(task);
        this.setDueDate(dueDate);
        this.setHoursOfWork(hoursOfWork);
        this.setDueDate(status);
    }

    public void setTask(String task) throws IllegalArgumentException {
        // 2-50 characters long, must NOT contain a semicolon or | or ` (reverse single quote) characters
        if (task.length() < 2 || task.length() > 50) {
            throw new IllegalArgumentException("Task must be between 2 and 50 characters long");
        }
        if (task.contains(";") || task.contains("|") || task.contains("`")) {
            throw new IllegalArgumentException("Task must NOT contain a semicolon or | or ` (reverse single quote) characters");
        }
        // use regular expression to check for invalid characters | or `
        if (task.matches(".*[|`].*")) {
            throw new IllegalArgumentException("Task must NOT contain a semicolon or | or ` (reverse single quote) characters");
        }
        this.task = task;
    }

    public void setDueDate(String dueDate) throws IllegalArgumentException {
        try{
        DateTimeFormatter formatter =DateTimeFormatter.ofPattern("yyyy/M/d");
        setDueDate(LocalDate.parse(dueDate, formatter));
        }catch (java.time.format.DateTimeParseException e){
            throw new IllegalArgumentException("Invalid date format. Please use yyyy/mm/dd", e);
        }
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

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public void setStatus(String status) {
        if (status.equals("Pending")) {
            this.status = TaskStatus.Pending;
        } else if (status.equals("Done")) {
            this.status = TaskStatus.Done;
        } else {
            throw new IllegalArgumentException("Invalid status. Please use Pending or Done");
        }
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

    public TaskStatus getStatus() {
        return status;
    }

    // format all fields of this Todo item for display exactly as specified below in the example interactions
    @Override
    public String toString() {
        return task + " , " + getDueDateFormatted() + " , will take " + hoursOfWork + " hour(s) of work, " + status;
    }
}

package model;

import lombok.Data;
import lombok.NonNull;

@Data
public class Point {
    @NonNull 
    private Double x;
    @NonNull 
    private Double y;
    @NonNull 
    private Double r;
    @NonNull 
    private Boolean result;
}

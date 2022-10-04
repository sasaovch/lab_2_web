package DTO;

import java.util.List;

import lombok.Data;
import model.Point;

@Data
public class ResponseDTO {
    private boolean status;
    private String warning;
    private List<Point> points;
}

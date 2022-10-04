package model;

import java.util.ArrayList;
import java.util.List;

public class TablePoint {
    private static TablePoint instance = new TablePoint();
    private List<Point> points = new ArrayList<Point>();
    public static TablePoint getInstance() {
        return instance;
    }
    public TablePoint() {
    }
    public List<Point> getPoints() {
        return points;
    }
    public void setPoints(List<Point> points) {
        this.points = points;
    }
    public void addPoint(Point point) {
        points.add(point);
    }
    public void clearPoints() {
        points.clear();
    }
}

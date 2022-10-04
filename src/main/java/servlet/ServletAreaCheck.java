package servlet;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.annotation.WebServlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.ServletContext;

import model.Point;
import model.TablePoint;

@WebServlet(name = "ServletAreaCheck", value = "/areaCheck")
public class ServletAreaCheck extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext context = getServletContext();
        context.log("AreaCheck DO GET");

        Double x = Double.parseDouble(req.getParameter("x"));
        Double y = Double.parseDouble(req.getParameter("y"));
        Double r = Double.parseDouble(req.getParameter("r"));
        
        if (r < 0) {
            req.setAttribute("warning", "Value of R must be greater than zero");
            req.getRequestDispatcher("views/table.jsp").forward(req, resp);
        }
        
        context.log("Get: " + x + " " + y + " " + r);
        Point point = new Point(x, y, r, checkHit(x, y, r));
        // TablePoint.getInstance().addPoint(point);
        // List<Point> points = TablePoint.getInstance().getPoints();
        // req.setAttribute("points", points);

        HttpSession session = req.getSession();
        
        if (session.getAttribute("points") == null) {
            TablePoint table = new TablePoint();
            table.addPoint(point);
            session.setAttribute("points", table.getPoints());
        }
        
        req.getRequestDispatcher("views/table.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.sendError(HttpServletResponse.SC_BAD_GATEWAY);
    }

    private boolean checkHit(double x, double y, double r) {
        if (x > 0 && y > 0) {
            return false;
        } else if (x <= 0 && y >= 0 && Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) <= r) {
            return true;
        } else if (x <= 0 && y < 0 && x >= -r && y >= -r) {
            return true;
        } else if (x > 0 && y <= 0 && (2 * x - r) <= y) {
            return true;
        }
        return false;
    }
}

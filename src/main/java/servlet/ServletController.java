package servlet;

import java.io.IOException;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import jakarta.servlet.annotation.WebServlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.ServletContext;

@WebServlet(name = "ServletController", value = "/lab2/table")
public class ServletController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext context = getServletContext();
        // TODO: Log in file
        context.log("DO GET");
        HttpSession session = req.getSession();
        
        if (session.getAttribute("theme") == null) {
            session.setAttribute("theme", "light-theme");
        }

        if (req.getParameterMap() == null) {
            req.getRequestDispatcher("views/table.jsp").forward(req, resp);
        } else if (checkNumberParametr(req, "x") && checkNumberParametr(req, "y") && checkNumberParametr(req, "r")) {
            context.getNamedDispatcher("ServletAreaCheck").forward(req, resp);
        } else if (checkNumberParametr(req, "x")) {
            req.setAttribute("warning", "Please, enter correct X");
        } else if (checkNumberParametr(req, "y")) {
            req.setAttribute("warning", "Please, enter correct Y");
        } else if (checkNumberParametr(req, "r")) {
            req.setAttribute("warning", "Please, enter correct R");
        }

        req.getRequestDispatcher("views/table.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.sendError(HttpServletResponse.SC_BAD_GATEWAY);
    }

    // private String readCookie(String key, HttpServletRequest req) {
    //     return Arrays.stream(req.getCookies())
    //       .filter(c -> key.equals((String)c.getName()))
    //       .map(Cookie::getValue)
    //       .findAny().get();
    // }

    private boolean checkNumberParametr(HttpServletRequest req, String name) {
        try {
            if (req.getParameter(name) != null) {
                Double.parseDouble(req.getParameter(name));
                return true;
            } else {
                return false;
            }
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
package lk.esoft.dilshan.model;

import lk.esoft.dilshan.util.CrudUtil;
import lk.esoft.dilshan.util.GenerateNewID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/user")
public class UserServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        String json = "[";
        try {
            ResultSet rst = CrudUtil.execute("SELECT * FROM users");
            while (rst.next()) {
                json += "{\"userID\":\"" + rst.getString(1) +
                        "\",\"ftName\":\"" + rst.getString(2) +
                        "\",\"ltName\":\"" + rst.getString(3) +
                        "\",\"email\":\"" + rst.getString(4) +
                        "\",\"pwd\":\"" + rst.getString(5) + "\"},";
            }
            json += "{\"userID\":\"" + generateUserID() + "\"}]";
            resp.getWriter().write(json);

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    private String generateUserID() {
        try {
            final ResultSet rest = CrudUtil.execute("SELECT userID FROM users ORDER BY userID DESC LIMIT 1");
            if (rest.next()) {
                return GenerateNewID.generateID("E", rest.getString(1));
            }
            return GenerateNewID.generateID("E", null);

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            resp.setContentType("application/json");
            boolean isSave = CrudUtil.execute("INSERT INTO users VALUES (?,?,?,?,?)",
                    generateUserID(),
                    req.getParameter("ftName"),
                    req.getParameter("ltName"),
                    req.getParameter("email").trim(),
                    req.getParameter("pwd").trim()
            );
            if (isSave) {
                resp.getWriter().write("[{\"status\":true}]");
            } else {
                resp.getWriter().write("[{\"status\":false}]");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            resp.setContentType("application/json");
            boolean isUpdate = CrudUtil.execute("UPDATE users SET ftName=?,ltName=?,email=?,pwd=? WHERE userID=?",
                    req.getParameter("ftName"),
                    req.getParameter("ltName"),
                    req.getParameter("email").trim(),
                    req.getParameter("pwd").trim(),
                    req.getParameter("userID")
            );
            if (isUpdate) {
                resp.getWriter().write("[{\"status\":true}]");
            } else {
                resp.getWriter().write("[{\"status\":false}]");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            resp.setContentType("application/json");
            boolean isDelete = CrudUtil.execute("DELETE FROM users WHERE userID=?", req.getParameter("userID"));
            if (isDelete) {
                resp.getWriter().write("[{\"status\":true}]");
            } else {
                resp.getWriter().write("[{\"status\":false}]");
            }
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }
}

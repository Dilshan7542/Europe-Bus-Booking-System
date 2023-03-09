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


@WebServlet(urlPatterns = "/customer")
public class CustomerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        String json = "[";
        try {
            ResultSet rst = CrudUtil.execute("SELECT * FROM customer");
            while (rst.next()) {
                json += "{\"custID\":\"" + rst.getString(1) +
                        "\",\"nic\":\"" + rst.getString(2) +
                        "\",\"name\":\"" + rst.getString(3) +
                        "\",\"surname\":\"" + rst.getString(4) +
                        "\",\"email\":\"" + rst.getString(5) +
                        "\",\"pwd\":\"" + rst.getString(6) +
                        "\",\"gender\":\"" + rst.getString(7) +
                        "\",\"tel\":\"" + rst.getString(8) +
                        "\",\"dob\":\"" + rst.getString(9) + "\"},";
            }
            json += "{\"custID\":\"" + generateCustomerID() + "\"}]";

            resp.getWriter().write(json);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private String generateCustomerID() {
        try {
            final ResultSet rest = CrudUtil.execute("SELECT cusID FROM customer ORDER BY cusID DESC LIMIT 1");
            if (rest.next()) {
                return GenerateNewID.generateID("C", rest.getString(1));
            }
            return GenerateNewID.generateID("C", null);

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            resp.setContentType("application/json");
            boolean isSave = CrudUtil.execute("INSERT INTO customer VALUES (?,?,?,?,?,?,?,?,?)",
                    generateCustomerID(),
                    req.getParameter("nic"),
                    req.getParameter("name"),
                    req.getParameter("surname"),
                    req.getParameter("email"),
                    req.getParameter("pwd"),
                    req.getParameter("gender"),
                    req.getParameter("tel"),
                    req.getParameter("dob")
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
            boolean isUpdate = CrudUtil.execute("UPDATE customer SET nic=?,name=?,surname=?,email=?,pwd=?,gender=?,tel=?,dob=? WHERE cusID=?",
                    req.getParameter("nic"),
                    req.getParameter("name"),
                    req.getParameter("surname"),
                    req.getParameter("email"),
                    req.getParameter("pwd"),
                    req.getParameter("gender"),
                    req.getParameter("tel"),
                    req.getParameter("dob"),
                    req.getParameter("custID")
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
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp){
        try {
            resp.setContentType("application/json");
            boolean isDelete = CrudUtil.execute("DELETE FROM customer WHERE cusID=?", req.getParameter("custID"));
            if (isDelete) {
                resp.getWriter().write("[{\"status\":true}]");
            } else {
                resp.getWriter().write("[{\"status\":false}]");
            }
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }public String searchCustomer(String id){
        String json = "[";
        try {
            ResultSet rst = CrudUtil.execute("SELECT * FROM customer WHERE cusID=?",id);
            if (rst.next()) {
                json += "{\"custID\":\"" + rst.getString(1) +
                        "\",\"nic\":\"" + rst.getString(2) +
                        "\",\"name\":" + rst.getString(3) +
                        "\",\"surname\":" + rst.getString(4) +
                        "\",\"email\":" + rst.getString(5) +
                        "\",\"pwd\":" + rst.getString(6) +
                        "\",\"gender\":" + rst.getString(7) +
                        "\",\"tel\":" + rst.getString(8) +
                        "\",\"date\":" + rst.getString(9) + "},";
            json += "{\"custID\":\"" + generateCustomerID() + "\"}]";
            return json;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
            return null;
    }public String searchCustomerName(String id){
        try {
            ResultSet rst = CrudUtil.execute("SELECT name FROM customer WHERE cusID=?",id);
            if (rst.next()) {
             return rst.getString(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
